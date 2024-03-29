import { ControlPosition, MapboxMap, useControl } from 'react-map-gl'

interface LayerControlProps {
  readonly position?: ControlPosition
  readonly layerIds: Array<string>
}

class LayerControl {
  layerIds: Array<string>
  _map: unknown
  _container: HTMLDivElement | undefined
  className: string | undefined
  constructor(options: LayerControlProps) {
    this.layerIds = options.layerIds
  }

  onAdd(map: MapboxMap) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl mapbox-Layer-control'
    const mapboxCtrlGroup = document.createElement('div')
    mapboxCtrlGroup.className = 'mapboxgl-ctrl-group'
    const mapboxCtrlButton = document.createElement('button')
    const mapboxCtrlButtonIcon = document.createElement('span')
    mapboxCtrlButtonIcon.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-3.58-4-8-4M7.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 14A1.5 1.5 0 0 1 9 15.5A1.5 1.5 0 0 1 7.5 17m3.5-7H6V6h5v4m2 0V6h5v4h-5m3.5 7a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5Z"/></svg>'
    mapboxCtrlButton.appendChild(mapboxCtrlButtonIcon)
    mapboxCtrlGroup.appendChild(mapboxCtrlButton)
    this._container.appendChild(mapboxCtrlGroup)

    mapboxCtrlButton.addEventListener('click', () => {
      // toggle layer visibility

      this.layerIds.forEach((layerId: string) => {
        const visibility = map.getLayoutProperty(layerId, 'visibility')

        // Toggle layer visibility by changing the layout object's visibility property.
        try {
          if (visibility === 'visible' || visibility === undefined) {
            map.setLayoutProperty(layerId, 'visibility', 'none')
            this.className = ''
          } else if (visibility === 'none') {
            this.className = 'active'
            map.setLayoutProperty(layerId, 'visibility', 'visible')
          }
        } catch (error) {
          console.log(error)
        }
      })
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
const MapboxLayerControl = (props: LayerControlProps) => {
  const { position, ...otherProps } = props
  useControl(
    () => {
      const ctrl = new LayerControl({
        ...otherProps,
      })
      return ctrl
    },
    {
      position: position,
    },
  )

  return null
}

MapboxLayerControl.defaultProps = {
  position: 'top-right',
}

export default MapboxLayerControl
