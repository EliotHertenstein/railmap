// OBJECTID

import GenericElement from './elements/GenericElement'
import isEmptyOrSpaces from '../../helpers/isEmptyOrSpaces'
import titleCase from '../../helpers/titleCase'
import { USCrossingData } from '../MapDataTypes'

interface CrossingSidebarContentProps {
  /** Array of style options */
  readonly crossingData: USCrossingData
}

const reasonIdData = {
  '14': 'Change in Data',
  '15': 'New Crossing',
  '16': 'Closed',
  '19': 'Re-Open',
  '20': 'Date Change Only',
  '21': 'Change in Primary Operating RR',
  '22': 'Admin. Correction',
  '23': 'Quiet Zone Update',
  '24': 'No Train Traffic',
  '0': 'Unknown',
} as { [key: string]: string }

const stateCodes = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  '10': 'Delaware',
  '11': 'District of Columbia',
  '12': 'Florida',
  '13': 'Geogia',
  '15': 'Hawaii',
  '16': 'Idaho',
  '17': 'Illinois',
  '18': 'Indiana',
  '19': 'Iowa',
  '20': 'Kansas',
  '21': 'Kentucky',
  '22': 'Louisiana',
  '23': 'Maine',
  '24': 'Maryland',
  '25': 'Massachusetts',
  '26': 'Michigan',
  '27': 'Minnesota',
  '28': 'Mississippi',
  '29': 'Missouri',
  '30': 'Montana',
  '31': 'Nebraska',
  '32': 'Nevada',
  '33': 'New Hampshire',
  '34': 'New Jersey',
  '35': 'New Mexico',
  '36': 'New York',
  '37': 'North Carolina',
  '38': 'North Dakota',
  '39': 'Ohio',
  '40': 'Oklahoma',
  '41': 'Oregon',
  '42': 'Pennsylvania',
  '44': 'Rhode Island',
  '45': 'South Carolina',
  '46': 'South Dakota',
  '47': 'Tennessee',
  '48': 'Texas',
  '49': 'Utah',
  '50': 'Vermont',
  '51': 'Virginia',
  '53': 'Washington',
  '54': 'West Virginia',
  '55': 'Wisconsin',
  '56': 'Wyoming',
} as { [key: string]: string }

const CrossingSidebarContent = (props: CrossingSidebarContentProps) => {
  const { crossingData } = props
  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
      <div className="w-full px-2 py-4 text-center text-2xl">
        {titleCase(crossingData['STREET'] ?? 'Unknown Street')}
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
            <GenericElement content={crossingData['RAILROAD']} title="Railroad" />

            <GenericElement content={crossingData['RRSUBDIV']} title="Subdivision" />

            <GenericElement content={crossingData['RRDIV']} title="Division" />

            <GenericElement content={crossingData['MILEPOST']} title="Milepost" />

            <GenericElement content={crossingData['CROSSING']} title="Crossing ID" />

            <GenericElement
              content={
                crossingData['TYPEXING'] === '2'
                  ? 'Public'
                  : crossingData['TYPEXING'] === '3'
                  ? 'Private'
                  : 'Other'
              }
              title="Crossing Type"
            />

            <GenericElement
              content={
                crossingData['WHISTBAN'] === '0'
                  ? 'No'
                  : crossingData['WHISTBAN'] === '1'
                  ? '24 hr'
                  : crossingData['WHISTBAN'] === '2'
                  ? 'Partial'
                  : crossingData['WHISTBAN'] === '3'
                  ? 'Chicago Excused'
                  : 'Unknown Zone Type'
              }
              title="Quiet Zone"
            />

            <GenericElement content={crossingData['HIGHWAY']} title="Highway" />

            <GenericElement content={crossingData['CountyCode']} title="County Code" />

            <GenericElement
              content={stateCodes[crossingData['StateCode']!] ?? 'Unknown State'}
              title="State"
            />
            {!isEmptyOrSpaces(crossingData['POLCONT']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Emergency Telephone</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>
                    <a className="text-blue-400" href={'tel:' + crossingData['POLCONT']}>
                      {crossingData['POLCONT']}
                    </a>
                  </li>
                </ul>
                <a
                  className="absolute inset-0 rounded-md ring-2 ring-red-400"
                  href={'tel:' + crossingData['POLCONT']}
                />
              </li>
            ) : null}
            {!isEmptyOrSpaces(crossingData['RRCONT']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">Railroad Contact</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>
                    <a className="text-blue-400" href={'tel:' + crossingData['RRCONT']}>
                      {crossingData['RRCONT']}
                    </a>
                  </li>
                </ul>
                <a
                  className="absolute inset-0 rounded-md ring-2 ring-red-400"
                  href={'tel:' + crossingData['RRCONT']}
                />
              </li>
            ) : null}

            <GenericElement content={crossingData['EFFDATE']} title="Effective Date" />

            <GenericElement content={crossingData['EDATE']} title="Last Edited" />

            <GenericElement
              content={reasonIdData[crossingData['REASON'] ?? 0]}
              title="Reason for Edit"
            />
            {!isEmptyOrSpaces(crossingData['ACC_LINK']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">ACC Link</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>
                    <a className="text-blue-400" href={crossingData['ACC_LINK']}>
                      Click Here
                    </a>
                  </li>
                </ul>
                <a
                  className="absolute inset-0 rounded-md ring-2 ring-red-400"
                  href={crossingData['ACC_LINK']}
                />
              </li>
            ) : null}
            {!isEmptyOrSpaces(crossingData['INV_LINK']) ? (
              <li className="hover:bg-coolGray-100 relative rounded-md p-3">
                <h3 className="text-sm font-medium leading-5">INV Link</h3>

                <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
                  <li>
                    <a className="text-blue-400" href={crossingData['INV_LINK']}>
                      Click Here
                    </a>
                  </li>
                </ul>
                <a
                  className="absolute inset-0 rounded-md ring-2 ring-red-400"
                  href={crossingData['INV_LINK']}
                />
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CrossingSidebarContent
