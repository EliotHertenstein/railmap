import { CNCrossingData, USBridgeData, USCrossingData } from './MapDataTypes'
import AmtrakSidebarContent from './sidebar/AmtrakSidebarContent'
import AmtrakStationSidebarContent from './sidebar/AmtrakStationSidebarContent'
import BridgeSidebarContent from './sidebar/BridgeSidebarContent'
import CNCrossingSidebarContent from './sidebar/CNCrossingSidebarContent'
import CrossingSidebarContent from './sidebar/CrossingSidebarContent'
import OSMSidebarContent from './sidebar/OSMSidebarContent'
import { Train } from '../types/amtraker'
import classNames from 'clsx'
import { useEffect, useState } from 'react'
import { MapRef } from 'react-map-gl'
import { Drawer } from 'vaul'

interface SidebarProps {
  readonly mapboxFeatureData: { [key: string]: unknown } | null
  readonly onTrainClick?: (train: Train, railmap: MapRef) => void
}

const Sidebar = (props: SidebarProps) => {
  const { mapboxFeatureData, onTrainClick } = props

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

  // on change of featureData show sidebar
  useEffect(() => {
    if (mapboxFeatureData) {
      setOpen(true)
      setTimeout(() => (document.body.style.pointerEvents = ''), 0)
    }
  }, [mapboxFeatureData])

  const [snap, setSnap] = useState<number | string | null>('148px')
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className={classNames(
          'fixed left-0 top-0 z-10 hidden md:bottom-0 md:top-auto md:m-4 md:block md:h-1/2 md:w-72',
        )}
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
      </div>

      <Drawer.Root
        activeSnapPoint={snap}
        onOpenChange={setOpen}
        open={open}
        setActiveSnapPoint={setSnap}
        snapPoints={['148px', '355px', 1]}
      >
        <Drawer.Portal>
          <Drawer.Content
            className={classNames(
              'fixed bottom-0 left-0 right-0 top-0 z-20 mx-[-1px] h-full max-h-[97%] md:hidden',
            )}
            onPointerDownOutside={(e) => e.preventDefault()}
          >
            {featureData ? (
              featureData.mapboxLayerId === 'amtrak' ? (
                <AmtrakSidebarContent trainData={featureData as unknown as Train} />
              ) : featureData.mapboxLayerId === 'amtrak-stations' && onTrainClick ? (
                <AmtrakStationSidebarContent
                  onTrainClick={onTrainClick}
                  stationData={featureData}
                />
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
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

Sidebar.defaultProps = {
  onTrainClick: () => {},
}

export default Sidebar
