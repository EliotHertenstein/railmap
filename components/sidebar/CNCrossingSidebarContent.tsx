import GenericElement from './elements/GenericElement'
import { CNCrossingData } from '../MapDataTypes'

interface CNCrossingSidebarContentProps {
  /** Array of style options */
  readonly crossingData: CNCrossingData
}

function isEmptyOrSpaces(str: string | number | undefined) {
  return typeof str == 'number' || str === undefined || str.match(/^ *$/) !== null
}

const CNCrossingSidebarContent = (props: CNCrossingSidebarContentProps) => {
  const { crossingData } = props
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {crossingData['Location'] ?? 'Unknown Location'}
      </div>
      {/* <div className="text-md w-full px-2 pb-2 text-center">
        {crossingData.stations[0].stationName} -&gt;{' '}
        {
          crossingData.stations[crossingData.stations.length - 1]
            .stationName
        }
      </div> */}
      <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
        <div className="bg-white p-3">
          <ul className="w-full children:mb-4">
            <GenericElement content={crossingData['Railway']} title="Railroad" />

            <GenericElement content={crossingData['Subdivision']} title="Subdivision" />

            <GenericElement content={crossingData['Mile']} title="Milepost" />

            <GenericElement content={crossingData['Spur Name']} title="Spur Name" />

            <GenericElement content={crossingData['Spur Mile']} title="Spur Mile" />

            <GenericElement content={crossingData['TC Number']} title="TC Number" />

            <GenericElement content={crossingData['Tracks']} title="Tracks" />

            <GenericElement
              content={crossingData['Total Trains Daily']}
              title="Total Trains Daily"
            />

            <GenericElement content={crossingData['Vehicles Daily']} title="Vehicles Daily" />

            <GenericElement
              content={crossingData['Train Max Speed (mph)']}
              title="Train Max Speed"
            />

            <GenericElement content={crossingData['Road Speed (km/h)']} title="Road Speed" />

            <GenericElement content={crossingData['Lanes']} title="Road Lanes" />

            <GenericElement content={crossingData['Access']} title="Access" />

            <GenericElement content={crossingData['Protection']} title="Protection" />

            <GenericElement content={crossingData['Province']} title="Province" />

            <GenericElement content={crossingData['Region']} title="Region" />

            <GenericElement
              content={crossingData['Urban Y/N'] == 'Y' ? 'Yes' : 'No'}
              title="Urban"
            />

            <GenericElement content={crossingData['Regulator']} title="Regulator" />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CNCrossingSidebarContent
