import GenericElement from './elements/GenericElement'
import { USBridgeData } from '../MapDataTypes'

interface BridgeSidebarContentProps {
  /** Array of style options */
  readonly bridgeData: USBridgeData
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + (string.slice(1) ?? '').toLowerCase()
}

function titleCase(input: string | number) {
  if (typeof input === 'string') {
    return (
      input
        // split at non-alphanumeric characters
        .split(/[^\w]/)
        .map((word) => (word.length > 2 ? capitalize(word) : word))
        .join(' ')
    )
  } else {
    return input
  }
}

interface PropertyDict {
  [key: string]: string
}

const PropertyDict: PropertyDict = {
  RAILWAY_NM: 'Railroad Name',
  FEATURE_TY: 'Feature Type',
  CITY: 'City',
  COUNTY: 'County',
  STATE: 'State',
  ZIP: 'Zip Code',
  FCODE: 'Feature Code',
  FDATE: 'Date of Creation',
  GEODATE: 'Date of Last Update',
  NAICSDESCR: 'NAICS Code',
}

const BridgeSidebarContent = (props: BridgeSidebarContentProps) => {
  const { bridgeData } = props
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {titleCase(bridgeData['NAME'] ?? 'Unknown Street')}
      </div>

      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="w-full children:mb-4">
            {Object.keys(bridgeData).map((key) => {
              return (
                <GenericElement
                  content={bridgeData[key as keyof USBridgeData]}
                  key={key}
                  ringColor="blue-400"
                  title={PropertyDict[key]}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BridgeSidebarContent
