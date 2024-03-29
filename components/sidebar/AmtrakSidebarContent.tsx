import StationElement from './elements/amtrak/StationElement'
import { Station, Train } from '../../types/amtraker'
import clsx from 'clsx'
import moment from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Navigation2, PauseCircle, PlayCircle, StopCircle } from 'react-feather'

moment.extend(duration)

interface TrainSidebarContentProps {
  /** Array of style options */
  readonly trainData: Train
}

const headingToDegrees = (heading: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW') => {
  switch (heading) {
    case 'N':
      return 0
    case 'NE':
      return 45
    case 'E':
      return 90
    case 'SE':
      return 135
    case 'S':
      return 180
    case 'SW':
      return 225
    case 'W':
      return 270
    case 'NW':
      return 315
  }
}

export const cmntGenerator = (
  sch: string,
  act: string,
): {
  status: 'early' | 'late' | 'onTime'
  diff: number
  text: string
  color: string
} => {
  // display the minutes early or minutes late based on the difference between the scheduled and actual time. If the differnce is below 3 minutes, display "On Time". Only display hours if the difference is more than 60 minutes.

  const diff = moment.duration(moment(act).diff(moment(sch)))

  if (diff.asMinutes() === 0) {
    return {
      status: 'onTime',
      diff: diff.asMinutes(),
      text: 'On Time',
      color: 'text-green-500',
    }
  } else if (diff.asMinutes() < 0) {
    if (diff.asMinutes() <= -60) {
      return {
        status: 'early',
        diff: diff.asMinutes(),
        text: `${Math.abs(diff.hours())}h ${Math.abs(diff.minutes())}m early`,
        color: 'text-green-500',
      }
    }

    return {
      status: 'early',
      diff: diff.asMinutes(),
      text: `${Math.abs(diff.minutes())}m early`,
      color: 'text-green-500',
    }
  } else {
    if (diff.asMinutes() >= 60) {
      return {
        status: 'late',
        diff: diff.asMinutes(),
        text: `${diff.hours()}h ${diff.minutes()}m late`,
        color: 'text-red-500',
      }
    }

    return {
      status: 'late',
      diff: diff.asMinutes(),
      text: `${diff.minutes()}m late`,
      color: 'text-red-500',
    }
  }
}

export const diffGenerator = (time: string) => {
  const diff = moment.duration(moment(time).diff(moment()))

  if (diff.asMinutes() < 0) {
    if (diff.asMinutes() < -60) {
      return `${Math.abs(diff.hours())}h ${Math.abs(diff.minutes())}m ago`
    }

    return `${Math.abs(diff.minutes())}m ago`
  } else {
    if (diff.asMinutes() > 60) {
      return `in ${diff.hours()}h ${diff.minutes()}m`
    }

    return `in ${diff.minutes()}m`
  }
}

const AmtrakSidebarContent = (props: TrainSidebarContentProps) => {
  const { trainData } = props
  console.log(typeof trainData.stations, trainData.stations)
  const { stations, heading } = trainData

  const nextStation = stations.find((station) => station.status === 'Enroute') || stations[0]

  const nextStationCMNT = cmntGenerator(nextStation.schArr, nextStation.arr)

  return (
    <div className="flex h-full w-full flex-shrink-0 flex-col space-y-2 overflow-y-auto scroll-smooth rounded-t-md bg-white md:rounded-md">
      <div className="flex w-full flex-row justify-start space-x-2 p-2">
        <div className="flex aspect-square items-center justify-center">
          <Navigation2
            fill="#ffff"
            size={30}
            style={{
              transform: `rotate(${headingToDegrees(heading)}deg)`,
            }}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-full text-left text-xs  capitalize text-neutral-400">
            {moment(trainData.stations[0].schDep).format('ddd, D MMM')}
          </div>
          <div className="w-full text-left text-sm ">
            {trainData.trainNum} {trainData.routeName}
          </div>
        </div>
      </div>
      <a
        className={clsx(
          'sticky top-0 flex w-full flex-row justify-between border-y px-2 py-3 text-sm',
          nextStationCMNT.color === 'text-green-500'
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600',
        )}
        href={`#${nextStation.code}`}
      >
        <span className="font-semibold">
          {nextStation.name} {diffGenerator(nextStation.arr)}
        </span>
        <span className="">{nextStationCMNT.text}</span>
      </a>
      <div className="flex flex-row space-x-2 px-2">
        <div className="mt-[7px] flex flex-col items-center">
          {stations.map((station, index) => {
            const cmnt =
              station.status === 'Departed' || station.status === 'Station'
                ? cmntGenerator(station.schDep, station.dep)
                : cmntGenerator(station.schArr, station.arr)

            return (
              <>
                {index == 0 ? (
                  <PlayCircle
                    className={clsx(
                      'statuscircle',
                      (cmnt.status === 'early' || cmnt.status === 'onTime') && 'statusCircleOnTime',
                      cmnt.status === 'late' && 'statusCircleDelayed',
                    )}
                    fill="#fff"
                    size={18}
                  />
                ) : index !== stations.length - 1 ? (
                  <PauseCircle
                    className={clsx(
                      'statuscircle',
                      (cmnt.status === 'early' || cmnt.status === 'onTime') && 'statusCircleOnTime',
                      cmnt.status === 'late' && 'statusCircleDelayed',
                    )}
                    size={18}
                  />
                ) : (
                  <StopCircle
                    className={clsx(
                      'statuscircle',
                      (cmnt.status === 'early' || cmnt.status === 'onTime') && 'statusCircleOnTime',
                      cmnt.status === 'late' && 'statusCircleDelayed',
                    )}
                    size={18}
                  />
                )}
                {index !== stations.length - 1 && (
                  <div className="h-[93px] w-[1px] bg-neutral-200" />
                )}
              </>
            )
          })}
        </div>
        <div className="flex flex-1 flex-col space-y-4">
          {stations.map((station, index) => (
            <StationElement
              key={station.code}
              nextStation={stations[index + 1]}
              station={station}
            />
          ))}
        </div>
      </div>
      <div className="p-2 text-xs text-neutral-400">
        Last Updated {moment(trainData.lastValTS).format('h:mm A')}
      </div>
    </div>
  )
}

export default AmtrakSidebarContent
