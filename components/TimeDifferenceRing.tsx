import { classNames } from '../helpers/tailwind/classNames'
import moment from 'dayjs'

interface TimeDifferenceRingProps {
  readonly start: string | null | undefined
  readonly end: string | null | undefined
}
const TimeDifferenceRing = (props: TimeDifferenceRingProps) => {
  const { start, end } = props
  if (!(start && end)) {
    return <a className="absolute inset-0 rounded-md ring-2 ring-red-500" />
  }

  const diff = 0 - moment(end).diff(moment(start), 'minutes')

  const diffColor = (diff: number) => {
    if (diff < 5) {
      return 'ring-green-500'
    }
    if (diff < 10) {
      return 'ring-yellow-500'
    }
    if (diff < 30) {
      return 'ring-orange-500'
    }
    return 'ring-red-500'
  }

  return <a className={classNames('absolute inset-0 rounded-md ring-2', diffColor(diff))} />
}

export default TimeDifferenceRing
