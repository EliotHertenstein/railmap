/* eslint-disable react/require-default-props */
import GeocoderControl from './map/GeocoderControl'
import { CSSProperties, ReactNode, useCallback, useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import Map, { FullscreenControl, GeolocateControl, NavigationControl } from 'react-map-gl'

// This is a terrible solution to this problem, but I just can't figure out how to get the type definitions for the Map component

interface MapTypes {
  readonly mapboxAccessToken?: string
  readonly initialViewState?: Partial<import('react-map-gl/dist/esm/index').ViewState> & {
    bounds?: import('mapbox-gl').LngLatBoundsLike
    fitBoundsOptioss?: import('mapbox-gl').FitBoundsOptions
  }
  readonly gl?: WebGLRenderingContext
  readonly antialias?: boolean
  readonly attributionControl?: boolean
  readonly bearingSnap?: number
  readonly clickTolerance?: number
  readonly collectResourceTiming?: boolean
  readonly cooperativeGestures?: boolean
  readonly crossSourceCollisions?: boolean
  readonly customAttribution?: string | string[]
  readonly fadeDuration?: number
  readonly failIfMajorPerformanceCaveat?: boolean
  readonly hash?: string | boolean
  readonly interactive?: boolean
  readonly locale?: {
    [key: string]: string
  }
  readonly localFontFamily?: string
  readonly localIdeographFontFamily?: string
  readonly logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  readonly maxTileCacheSize?: number
  readonly optimizeForTerrain?: boolean
  readonly pitchWithRotate?: boolean
  readonly preserveDrawingBuffer?: boolean
  readonly refreshExpiredTiles?: boolean
  readonly testMode?: boolean
  readonly trackResize?: boolean
  readonly transformRequest?: import('mapbox-gl').TransformRequestFunction
  readonly boxZoom?: boolean
  readonly doubleClickZoom?: boolean
  readonly dragPan?: boolean | import('mapbox-gl').DragPanOptions
  readonly dragRotate?: boolean
  readonly keyboard?: boolean
  readonly scrollZoom?: boolean | import('mapbox-gl').InteractiveOptions
  readonly touchPitch?: boolean
  readonly touchZoomRotate?: boolean | import('mapbox-gl').InteractiveOptions
  readonly maxBounds?: import('mapbox-gl').LngLatBoundsLike
  readonly maxPitch?: number
  readonly maxZoom?: number
  readonly minPitch?: number
  readonly minZoom?: number
  readonly viewState?: import('react-map-gl/dist/esm/index').ViewState & {
    width: number
    height: number
  }
  readonly mapStyle?: string | import('mapbox-gl').Style
  readonly styleDiffing?: boolean
  readonly fog?: import('mapbox-gl').Fog
  readonly light?: import('mapbox-gl').Light
  readonly terrain?: import('mapbox-gl').TerrainSpecification
  readonly interactiveLayerIds?: string[]
  readonly renderWorldCopies?: boolean
  readonly cursor?: string
  readonly onMouseDown?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onMouseUp?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onMouseOver?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onMouseMove?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onClick?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onDblClick?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onMouseEnter?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onMouseLeave?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onMouseOut?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onContextMenu?: (e: import('mapbox-gl').MapLayerMouseEvent) => void
  readonly onTouchStart?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  readonly onTouchEnd?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  readonly onTouchMove?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  readonly onTouchCancel?: (e: import('mapbox-gl').MapLayerTouchEvent) => void
  readonly onMoveStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onMove?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onMoveEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onDragStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onDrag?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onDragEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onZoomStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onZoom?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onZoomEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onRotateStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onRotate?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onRotateEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onPitchStart?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onPitch?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onPitchEnd?: (e: import('react-map-gl/dist/esm/index').ViewStateChangeEvent) => void
  readonly onWheel?: (e: import('mapbox-gl').MapWheelEvent) => void
  readonly onBoxZoomStart?: (e: import('mapbox-gl').MapBoxZoomEvent) => void
  readonly onBoxZoomEnd?: (e: import('mapbox-gl').MapBoxZoomEvent) => void
  readonly onBoxZoomCancel?: (e: import('mapbox-gl').MapBoxZoomEvent) => void
  readonly onResize?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  readonly onLoad?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  readonly onRender?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  readonly onIdle?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  readonly onError?: (e: import('mapbox-gl').ErrorEvent) => void
  readonly onRemove?: (e: import('mapbox-gl').MapboxEvent<undefined>) => void
  readonly onData?: (
    e: import('mapbox-gl').MapSourceDataEvent | import('mapbox-gl').MapStyleDataEvent,
  ) => void
  readonly onStyleData?: (e: import('mapbox-gl').MapStyleDataEvent) => void
  readonly onSourceData?: (e: import('mapbox-gl').MapSourceDataEvent) => void
}

interface OtherMapTypes {
  readonly mapLib?: any
  readonly reuseMaps?: boolean
  /** Map container id */
  readonly id?: string
  /** Map container CSS style */
  readonly style?: CSSProperties
  readonly children?: ReactNode
}

interface CustomMapProps extends MapTypes, OtherMapTypes {
  cursor?: never
  id?: never
  mapboxAccessToken?: never
  style?: never
  onMouseEnter?: never
  onMouseLeave?: never
}

// End bad code (maybe)

const MapboxGlMap = (props: CustomMapProps) => {
  const { children, ...otherProps } = props

  const [cursorState, setCursorState] = useState('unset')

  const onMouseEnter = useCallback(() => {
    setCursorState('pointer')
  }, [])
  const onMouseLeave = useCallback(() => {
    setCursorState('unset')
  }, [])

  return (
    <Map
      cursor={cursorState}
      id="railmap"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      {...otherProps}
    >
      <GeocoderControl
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string}
        collapsed
      />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true, timeout: 6000 }}
        showUserHeading
        trackUserLocation
      />
      <NavigationControl />
      <FullscreenControl containerId="body" />

      {children}
    </Map>
  )
}

export default MapboxGlMap
