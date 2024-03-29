import { ControlPosition, MapboxMap, useControl } from 'react-map-gl'

interface TerrainControlProps {
  readonly position?: ControlPosition
}

class TerrainControl {
  _map: unknown
  _container: HTMLDivElement | undefined
  className: string | undefined

  onAdd(map: MapboxMap) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl mapbox-Terrain-control'
    const mapboxCtrlGroup = document.createElement('div')
    mapboxCtrlGroup.className = 'mapboxgl-ctrl-group'
    const mapboxCtrlButton = document.createElement('button')
    const mapboxCtrlButtonIcon = document.createElement('span')
    mapboxCtrlButtonIcon.innerHTML =
      '<svg viewBox="-44 -44 600 600" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M503.2 393.8L280.1 44.25c-10.42-16.33-37.73-16.33-48.15 0L8.807 393.8a55.906 55.906 0 0 0-1.666 57.45C17.07 468.1 35.92 480 56.31 480h399.4c20.39 0 39.24-11.03 49.18-28.77c10.01-18.03 9.41-40.03-1.69-57.43zM256 111.8L327.8 224H256l-48 64l-30.8-52.7L256 111.8z"/></svg>'
    mapboxCtrlButton.appendChild(mapboxCtrlButtonIcon)
    mapboxCtrlGroup.appendChild(mapboxCtrlButton)
    this._container.appendChild(mapboxCtrlGroup)

    mapboxCtrlButton.addEventListener('click', () => {
      // toggle layer visibility
      if (map.getTerrain()) {
        map.setTerrain()
      } else {
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
      }
    })

    return this._container
  }

  onRemove() {
    this._container?.parentNode?.removeChild(this._container)
    this._map = undefined
  }
}

// set onClick using props.onClick

/* eslint-disable complexity,max-statements */
const MapboxTerrainControl = (props: TerrainControlProps) => {
  const { position, ...otherProps } = props
  useControl(
    () => {
      const ctrl = new TerrainControl()
      return ctrl
    },
    {
      position: position,
    },
  )

  return null
}

MapboxTerrainControl.defaultProps = {
  position: 'top-right',
}

export default MapboxTerrainControl
