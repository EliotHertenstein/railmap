function generateHeadingDescription(dir: string) {
  return (
    {
      N: 'Northbound',
      S: 'Southbound',
      E: 'Eastbound',
      W: 'Westbound',
      NE: 'North-Eastbound',
      NW: 'North-Westbound',
      SE: 'South-Eastbound',
      SW: 'South-Westbound',
    }[dir] ?? null
  )
}

function generateHeadingBorder(heading: string) {
  if (heading === 'N') {
    return 'border-t-2'
  }
  if (heading === 'S') {
    return 'border-b-2'
  }
  if (heading === 'E') {
    return 'border-r-2'
  }
  if (heading === 'W') {
    return 'border-l-2'
  }
  if (heading === 'NE') {
    return 'border-t-2 border-r-2'
  }
  if (heading === 'NW') {
    return 'border-t-2 border-l-2'
  }
  if (heading === 'SE') {
    return 'border-b-2 border-r-2'
  }
  if (heading === 'SW') {
    return 'border-b-2 border-l-2'
  }
  return ''
}

interface HeadingElementProps {
  readonly heading: string
}

const HeadingElement = (props: HeadingElementProps) => {
  const { heading } = props
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3">
      <h3 className="text-sm font-medium leading-5">Heading</h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>{generateHeadingDescription(heading) ?? 'Unknown'}</li>
      </ul>
      <a
        className={
          'absolute inset-0 rounded-md border-blue-400 ring-2 ring-blue-400' +
          ' ' +
          generateHeadingBorder(heading)
        }
      />
    </li>
  )
}

export default HeadingElement
