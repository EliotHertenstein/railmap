import {
  CNCrossingData,
  FiveOneOneVehicleActivity,
  USBridgeData,
  USCrossingData,
} from './MapDataTypes'
import AmtrakSidebarContent from './sidebar/AmtrakSidebarContent'
import AmtrakStationSidebarContent from './sidebar/AmtrakStationSidebarContent'
import BridgeSidebarContent from './sidebar/BridgeSidebarContent'
import CNCrossingSidebarContent from './sidebar/CNCrossingSidebarContent'
import CrossingSidebarContent from './sidebar/CrossingSidebarContent'
import OSMSidebarContent from './sidebar/OSMSidebarContent'
import { Train } from '../types/amtraker'
import classNames from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'

interface SidebarProps {
  readonly mapboxFeatureData: { [key: string]: unknown } | null
  readonly onTrainClick?: (train: Train, railmap: MapRef) => void
}

const useMediaQuery = (query: any) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    addEventListener('resize', listener)
    // media.addListener(listener)
    return () => removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

const Sidebar = (props: SidebarProps) => {
  const { mapboxFeatureData, onTrainClick } = props

  const isMedium = useMediaQuery('(min-width: 768px)')

  const fixEntry = (v: unknown): unknown => {
    if (typeof v === 'string') {
      try {
        return JSON.parse(v)
      } catch (e) {
        return v
      }
    } else {
      return v
    }
  }

  const featureData = mapboxFeatureData
    ? Object.fromEntries(Object.entries(mapboxFeatureData).map(([k, v]) => [k, fixEntry(v)]))
    : null

  // sidebar swiping

  const [position, setPosition] = useState<'small' | 'medium' | 'large'>('medium')

  const controls = useAnimation()

  // on change of featureData show sidebar
  useEffect(() => {
    if (mapboxFeatureData) {
      setPosition('medium')
      controls.start('medium')
    }
  }, [mapboxFeatureData, controls])

  // initial position small

  useEffect(() => {
    if (isMedium) {
      setPosition('medium')
      controls.start('medium')
    } else {
      setPosition('small')
      controls.start('small')
    }
  }, [isMedium, controls])

  function onDragEnd(_: any, info: any) {
    console.log(info.offset.y)
    // set the position based on the drag direction and the current position

    if (info.offset.y > 0) {
      // drag down
      if (position === 'large') {
        setPosition('medium')
        controls.start('medium')
      } else if (position === 'medium') {
        setPosition('small')
        controls.start('small')
      } else {
        setPosition('small')
        controls.start('small')
      }
    }

    if (info.offset.y < 0) {
      // drag up
      if (position === 'small') {
        setPosition('medium')
        controls.start('medium')
      } else if (position === 'medium') {
        setPosition('large')
        controls.start('large')
      } else {
        setPosition('large')
        controls.start('large')
      }
    }
  }

  return (
    <motion.div
      animate={controls}
      className={classNames(
        'fixed left-0 top-0 z-10 h-full w-full md:bottom-0 md:top-auto md:m-4 md:h-1/2 md:w-72',
      )}
      drag={isMedium ? false : 'y'}
      dragConstraints={{ top: 0, right: 0 }}
      dragElastic={{
        top: 0,
        right: 0,
        bottom: 0.2,
        left: 0.2,
      }}
      initial="hidden"
      onDragEnd={onDragEnd}
      transition={{
        type: 'spring',
        damping: 40,
        stiffness: 400,
      }}
      variants={
        (!isMedium && {
          large: { y: 0, x: 0 },
          medium: { y: '50%', x: 0 },
          small: { y: '80%', x: 0 },
        }) || {
          large: { y: 0, x: 0 },
          medium: { y: 0, x: 0 },
          small: { y: 0, x: 0 },
        }
      }
    >
      {featureData ? (
        featureData.mapboxLayerId === 'amtrak' ? (
          <AmtrakSidebarContent trainData={featureData as unknown as Train} />
        ) : featureData.mapboxLayerId === 'amtrak-stations' && onTrainClick ? (
          <AmtrakStationSidebarContent onTrainClick={onTrainClick} stationData={featureData} />
        ) : featureData.mapboxLayerId === 'Railroad-Crossings' ? (
          <CrossingSidebarContent crossingData={featureData as unknown as USCrossingData} />
        ) : featureData.mapboxLayerId === 'Railroad-Bridges' ? (
          <BridgeSidebarContent bridgeData={featureData as unknown as USBridgeData} />
        ) : featureData.mapboxLayerId === 'CN-Railroad-Crossings' ? (
          <CNCrossingSidebarContent crossingData={featureData as unknown as CNCrossingData} />
        ) : featureData.mapboxLayerId === 'CN-Railroad-Bridges' ||
          featureData.mapboxLayerId === 'EU-Railroad-Bridges' ? (
          <OSMSidebarContent osmData={featureData} ringColor="ring-blue-400" />
        ) : featureData.mapboxLayerId === 'EU-Railroad-Crossings' ? (
          <OSMSidebarContent osmData={featureData} ringColor="ring-red-400" />
        ) : (
          <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-t-md bg-white text-center md:rounded-md">
            <span>No additional information is available for this object</span>
          </div>
        )
      ) : (
        <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-t-md bg-white md:rounded-md">
          <span>No Content Selected</span>
        </div>
      )}
    </motion.div>
  )
}

Sidebar.defaultProps = {
  onTrainClick: () => {},
}

export default Sidebar
