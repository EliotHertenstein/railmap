import { Station } from '../../../../types/amtraker'
import { cmntGenerator, diffGenerator } from '../../AmtrakSidebarContent'
import clsx from 'clsx'
import dayjs from 'dayjs'

interface StationElementProps {
  readonly station: Station
  readonly nextStation: Station | null
}

const durGenerator = (start: string, end: string) => {
  // output 3h 1m or 1m, etc.

  const diff = dayjs.duration(dayjs(end).diff(dayjs(start)))

  if (diff.asMinutes() < 60) {
    return `${diff.minutes()}m`
  }

  return `${diff.hours()}h ${diff.minutes()}m`
}

const StationElement = (props: StationElementProps) => {
  const { station, nextStation } = props

  const cmnt =
    station.status === 'Departed' || station.status === 'Station'
      ? cmntGenerator(station.schDep, station.dep)
      : cmntGenerator(station.schArr, station.arr)

  const departed = station.status === 'Departed'

  return (
    <>
      <div
        className={clsx('flex w-full flex-row space-x-2', station.status === 'Departed' && '')}
        id={station.code}
      >
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row justify-between text-2xl">
            <h1 className="font-extrabold">{station.code}</h1>
            <span
              className={clsx('font-semibold', !(station.dep && station.arr) && 'text-neutral-400')}
            >
              {station.dep && station.arr
                ? {
                    Departed: dayjs(station.dep).format('h:mm A'),
                    Station: dayjs(station.dep).format('h:mm A'),
                    Enroute: dayjs(station.arr).format('h:mm A'),
                    Unknown: '-',
                  }[station.status]
                : {
                    Departed: dayjs(station.schDep).format('h:mm A'),
                    Station: dayjs(station.schDep).format('h:mm A'),
                    Enroute: dayjs(station.schArr).format('h:mm A'),
                    Unknown: '',
                  }[station.status]}
            </span>
          </div>
          <div className="flex flex-row space-x-2 text-xs text-neutral-400">
            <span className="mr-auto overflow-hidden text-ellipsis whitespace-nowrap">
              {station.name}
            </span>
            {cmnt.diff !== 0 && (
              <span className="flex-none line-through">
                {station.dep && station.arr
                  ? {
                      Departed: dayjs(station.schDep).format('h:mm A'),
                      Station: dayjs(station.schDep).format('h:mm A'),
                      Enroute: dayjs(station.schArr).format('h:mm A'),
                      Unknown: '',
                    }[station.status]
                  : ''}
              </span>
            )}
            {station.dep && station.arr ? (
              <span className={clsx(cmnt.color, 'flex-none')}>{cmnt.text}</span>
            ) : (
              '...'
            )}
          </div>
          <div className="flex flex-row space-x-2 text-xs">
            <span className="mr-auto">
              {station.arr && station.dep ? station.status : 'Scheduled'}
            </span>
            <span>
              {station.dep && station.arr
                ? {
                    Departed: diffGenerator(station.dep),
                    Station: diffGenerator(station.dep),
                    Enroute: diffGenerator(station.arr),
                    Unknown: diffGenerator(station.dep),
                  }[station.status]
                : {
                    Departed: diffGenerator(station.schDep),
                    Station: diffGenerator(station.schDep),
                    Enroute: diffGenerator(station.schArr),
                    Unknown: diffGenerator(station.schDep),
                  }[station.status]}
            </span>
          </div>
        </div>
      </div>
      {nextStation ? (
        <div className="flex w-full flex-row items-center space-x-2 font-light">
          <div className="h-[1px] flex-1 bg-neutral-200" />
          <span className="text-[10px] text-neutral-600">
            {station.dep && nextStation.arr
              ? `Total ${durGenerator(station.dep, nextStation.arr)}`
              : `Scheduled ${durGenerator(station.schDep, nextStation.schArr)}`}
          </span>
          <div className="h-[1px] flex-1 bg-neutral-200" />
        </div>
      ) : null}
    </>
  )
}

export default StationElement
