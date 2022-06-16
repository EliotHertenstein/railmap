interface TimeZoneElementProps {
  timeZone: string | null
}

const TimeZoneElement = (props: TimeZoneElementProps) => {
  const { timeZone } = props
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3">
      <h3 className="text-sm font-medium leading-5">Time Zone</h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>{timeZone ?? 'Unknown'}</li>
      </ul>
      <a className="absolute inset-0 rounded-md ring-2 ring-blue-400" />
    </li>
  )
}

export default TimeZoneElement