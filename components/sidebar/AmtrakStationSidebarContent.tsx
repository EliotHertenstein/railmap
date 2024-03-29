import TrainElement from './elements/amtrak/TrainElement'
import { TrainResponse, Station, StationMeta, Train } from '../../types/amtraker'
import { useCallback, useEffect, useState } from 'react'
import { MapRef } from 'react-map-gl'

interface StationDetails {
  id?: number
  city2?: string
  objectid?: number
  state?: string
  stfips?: number
  stncode?: string
  stnname?: string
  urban?: string
  mapboxLayerId?: 'amtrak'
}

interface StationTrain {
  train: Train
  station: Station
}

interface AmtrakStationSidebarContentProps {
  /** Array of style options */
  readonly stationData: StationDetails
  readonly onTrainClick: (train: Train, railmap: MapRef) => void
}

const AmtrakStationSidebarContent = (props: AmtrakStationSidebarContentProps) => {
  const { stationData, onTrainClick } = props

  const [station, setStation] = useState<StationMeta | null>(null)
  const [stationTrains, setStationTrains] = useState([] as StationTrain[])

  // set the station trains to an API call
  const getStationTrains = useCallback(async () => {
    const response = await fetch(`https://api-v3.amtraker.com/v3/trains`)
    const trainNums: TrainResponse = await response.json()

    const trains: StationTrain[] = []
    for (const trainNum in trainNums) {
      trainNums[trainNum].forEach((train: Train) => {
        train.stations.forEach((station: Station) => {
          if (
            station.code === stationData['stncode'] &&
            station.status.toLowerCase() === 'enroute'
          ) {
            trains.push({
              train: train,
              station: station,
            })
          }
        })
      })
    }

    trains.sort((a, b) => {
      return new Date(a.station.arr).getTime() - new Date(b.station.arr).getTime()
    })
    setStationTrains(trains)
  }, [stationData])

  const getStation = useCallback(async () => {
    const response = await fetch(
      `https://api-v3.amtraker.com/v3/stations/${stationData['stncode']}`,
    )
    const responseJSON = await response.json()
    const station = responseJSON[Object.keys(responseJSON)[0]] as StationMeta
    setStation(station)
  }, [stationData])

  useEffect(() => {
    getStationTrains()
    getStation()
  }, [getStationTrains, getStation])

  return station ? (
    <div className="flex h-full w-full flex-shrink-0 flex-col space-y-2 overflow-y-auto scroll-smooth rounded-t-md bg-white  md:rounded-md">
      <div className="sticky top-0 flex w-full flex-row justify-start space-x-2 border-b bg-white p-2">
        <div className="flex flex-col space-y-1">
          <div className="w-full text-left text-xs  capitalize text-neutral-400">
            {station.name ?? 'Unknown Station'}
          </div>
          <div className="w-full text-left text-2xl font-bold">{station.code ?? '???'}</div>
        </div>
      </div>
      {stationTrains.map((train) => (
        <TrainElement
          key={train.train.objectID}
          onTrainClick={onTrainClick}
          station={train.station}
          train={train.train}
        />
      ))}
    </div>
  ) : null
}

export default AmtrakStationSidebarContent
