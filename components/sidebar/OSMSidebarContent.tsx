import GenericElement from './elements/GenericElement'

interface OSMSidebarContentProps {
  /** Array of style options */
  readonly osmData: { name?: string; operator?: string; usage?: string; electrified?: string }
  readonly ringColor: string
}

const OSMSidebarContent = (props: OSMSidebarContentProps) => {
  const { osmData, ringColor } = props

  if (osmData['name'] || osmData['operator'] || osmData['usage'] || osmData['electrified']) {
    return (
      <div className="flex h-full w-full flex-shrink-0 flex-col items-center rounded-t-md bg-white md:rounded-md">
        <div className="w-full px-2 py-4 text-center text-2xl">
          {osmData['name'] ?? 'Unknown Name'}
        </div>
        <div className="flex w-full max-w-md flex-[1] flex-col overflow-y-scroll px-2">
          <div className="bg-white p-3">
            <ul className="w-full children:mb-4">
              <GenericElement content={osmData['operator']} title="Operator" />
              <GenericElement content={osmData['usage']} ringColor={ringColor} title="Usage" />
              <GenericElement
                content={osmData['electrified']}
                ringColor={ringColor}
                title="Electrified"
              />
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center rounded-md bg-white text-center">
        <span>No additional information is available for this object</span>
      </div>
    )
  }
}

export default OSMSidebarContent
