import isEmptyOrSpaces from '../../../helpers/isEmptyOrSpaces'

interface GenericElementProps {
  readonly title: string
  readonly content?: string | number
  readonly ringColor?: string
}

const GenericElement = (props: GenericElementProps) => {
  const { title, content, ringColor } = props
  if (isEmptyOrSpaces(content) || !title) {
    return null
  }
  return (
    <li className="hover:bg-coolGray-100 relative rounded-md p-3">
      <h3 className="text-sm font-medium leading-5">{title}</h3>

      <ul className="text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4">
        <li>{content}</li>
      </ul>
      <a className={'absolute inset-0 rounded-md ring-2' + ' ring-' + ringColor} />
    </li>
  )
}

GenericElement.defaultProps = {
  content: undefined,
  ringColor: 'red-400',
}

export default GenericElement
