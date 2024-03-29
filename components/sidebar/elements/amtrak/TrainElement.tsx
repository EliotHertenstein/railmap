import { Station, Train } from '../../../../types/amtraker'
import TimeDifferenceRing from '../../../TimeDifferenceRing'
import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MapRef, useMap } from 'react-map-gl'

moment.extend(relativeTime)

interface TrainElementProps {
  train: Train
  station: Station
  onTrainClick: (train: Train, railmap: MapRef) => void
}

const TrainElement = (props: TrainElementProps) => {
  const { train, station, onTrainClick } = props

  return (
    <div className="flex w-full flex-row space-x-4 p-2">
      <div className="flex flex-none flex-col items-center justify-center pl-4 pr-2 text-4xl">
        <span className="text-4xl">2</span>
        <span className="text-xs text-neutral-400">hours</span>
      </div>
      <div className="flex flex-1 flex-col space-y-1">
        <span className="text-xs text-neutral-400">Train {train.trainNum}</span>
        <span className="text-sm">
          {train.origName} to {train.destName}
        </span>
        <span className="text-xs">
          {new Date(station.arr).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          to{' '}
          {new Date(station.dep).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}

export default TrainElement
