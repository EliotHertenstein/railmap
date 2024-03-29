import { MapboxStyleDefinition, MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher'
import { ControlPosition, useControl } from 'react-map-gl'

interface StylesControlProps {
  readonly styles: MapboxStyleDefinition[]
  readonly position?: ControlPosition
}

/* eslint-disable complexity,max-statements */
const MapboxStyleControl = (props: StylesControlProps) => {
  const { styles, position } = props

  useControl(
    () => {
      const ctrl = new MapboxStyleSwitcherControl(styles)
      return ctrl
    },
    {
      position: position,
    },
  )

  return null
}

MapboxStyleControl.defaultProps = {
  position: 'top-right',
}

export default MapboxStyleControl
