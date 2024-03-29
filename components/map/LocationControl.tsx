/* eslint-disable react/no-this-in-sfc */
import { useRouter } from 'next/router'
import { ControlPosition, MapboxMap, useControl } from 'react-map-gl'

interface LocationControlProps {
  readonly position?: ControlPosition
  readonly svg: string
  readonly location: string
  // locationIds: Array<string>
}
// set onClick using props.onClick

/* eslint-disable complexity,max-statements */
const LocationControl = (props: LocationControlProps) => {
  const { svg, location, position } = props

  const router = useRouter()

  class LocationControl {
    locationIds: unknown
    _map: unknown
    _container: HTMLDivElement | undefined
    className: string | undefined
    // constructor(options?: LocationControlProps) {
    //   this.locationIds = options?.locationIds
    // }

    onAdd(map: MapboxMap) {
      this._map = map
      this._container = document.createElement('div')
      this._container.className = 'mapboxgl-ctrl mapbox-Location-control'
      const mapboxCtrlGroup = document.createElement('div')
      mapboxCtrlGroup.className = 'mapboxgl-ctrl-group'
      const mapboxCtrlButton = document.createElement('button')
      const mapboxCtrlButtonIcon = document.createElement('span')
      mapboxCtrlButtonIcon.innerHTML = svg
      mapboxCtrlButton.appendChild(mapboxCtrlButtonIcon)
      mapboxCtrlGroup.appendChild(mapboxCtrlButton)
      this._container.appendChild(mapboxCtrlGroup)

      mapboxCtrlButton.addEventListener('click', () => {
        router.push(location)
      })

      return this._container
    }

    onRemove() {
      this._container?.parentNode?.removeChild(this._container)
      this._map = undefined
    }
  }

  useControl(
    () => {
      const ctrl = new LocationControl()
      return ctrl
    },
    {
      position: position,
    },
  )

  return null
}

LocationControl.defaultProps = {
  position: 'top-right',
}

export default LocationControl
