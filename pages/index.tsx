import LayerControl from '../components/map/LayerControl'
import LocationControl from '../components/map/LocationControl'
import * as styles from '../components/map/styles'
import StylesControl from '../components/map/StylesControl'
import TerrainControl from '../components/map/TerrainControl'
import MapboxMap from '../components/mapbox'
import Sidebar from '../components/sidebar'
import { Train, TrainResponse } from '../types/amtraker'
import { Feature, FeatureCollection } from 'geojson'
import { MapboxStyleDefinition } from 'mapbox-gl-style-switcher'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { Layer, LngLatBoundsLike, MapLayerMouseEvent, Source } from 'react-map-gl'
import type { NextPage } from 'next'

async function getAmtrak() {
  // Make a GET request to the API and return the location of the trains.
  try {
    const response = await fetch('https://api-v3.amtraker.com/v3/trains')
    const trainNums = (await response.json()) as TrainResponse
    // returns object of trains with the object num as the train number

    // create a geoJSON object
    const geoJSON: FeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }

    // iterate through the train numbers
    for (const key in trainNums) {
      const trains = trainNums[key]

      // iterate through trains
      trains.forEach((train) => {
        const trainObject = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [train.lon, train.lat],
          },
          properties: train,
        } as Feature
        // push train to geoJSON
        geoJSON.features.push(trainObject)
      })
    }

    return geoJSON
  } catch (error) {
    console.error(error)
  }
}

const Home: NextPage = () => {
  const [featureData, setFeatureData] = useState<{
    [key: string]: unknown
  } | null>(null)

  const featureClickHandler = useCallback((e: MapLayerMouseEvent) => {
    if (e.features) {
      const clickedFeatureDef = e.features[0]
      if (!clickedFeatureDef) return
      const clickedFeature = clickedFeatureDef.properties
      const featureDataObject = {
        ...clickedFeature,
        mapboxLayerId: e.features[0].layer.id,
      }
      setFeatureData(featureDataObject)
    }
  }, [])

  const stylesSwitcherStyles: MapboxStyleDefinition[] = [
    {
      title: 'Satellite',
      uri: 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy',
    },
    {
      title: 'Light',
      uri: 'mapbox://styles/dotly/ckoz6vsl50kv117pg6tbt6icm',
    },
    {
      title: 'Data',
      uri: 'mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig',
    },
  ]

  const mapViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }

  const mapMaxBounds = [
    [-178.2, 6.6],
    [-49.0, 83.3],
  ] as LngLatBoundsLike

  const mapInteractiveLayerIds = [
    'amtrak',
    'amtrak-stations',
    'Railroad-Crossings',
    'Railroad-Bridges',
    'CN-Railroad-Crossings',
    'CN-Railroad-Bridges',
  ]

  const [amtrakGeoJSON, setAmtrakGeoJSON] = useState<FeatureCollection | undefined>(undefined)

  const onLoadHandler = useCallback(async (event) => {
    const map = event.target
    map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })

    let toastId = toast.loading('Loading Amtrak data...')

    await getAmtrak()
      .then((geoJSON) => {
        setAmtrakGeoJSON(geoJSON)
      })
      .catch((error) => {
        console.error(error)
      })

    toast.dismiss(toastId)

    setInterval(async () => {
      getAmtrak()
        .then((geoJSON) => {
          setAmtrakGeoJSON(geoJSON)
        })
        .catch((error) => {
          console.error(error)
        })
    }, 60000)
  }, [])

  const trainButtonClickHandler = useCallback((train: Train, railmap) => {
    const { lon, lat } = train
    railmap.flyTo({ center: [lon, lat], zoom: 13, duration: 2000 })
    const featureDataObject = {
      ...train,
      mapboxLayerId: 'amtrak',
    }
    setFeatureData(featureDataObject)
  }, [])

  return (
    <>
      <Sidebar mapboxFeatureData={featureData} onTrainClick={trainButtonClickHandler} />

      <MapboxMap
        initialViewState={mapViewState}
        interactiveLayerIds={mapInteractiveLayerIds}
        mapStyle={stylesSwitcherStyles[0].uri}
        maxBounds={mapMaxBounds}
        onClick={featureClickHandler}
        onLoad={onLoadHandler}
      >
        <StylesControl styles={stylesSwitcherStyles} />
        <LayerControl
          layerIds={[
            'railways-main',
            'railways',
            'railways-historic',
            'railways-construction',
            'railways electrified',
            'Railroad-Crossings',
            'Railroad-Bridges',
            'CN-Railroad-Crossings',
            'CN-Railroad-Bridges',
            'amtrak-routes',
            'amtrak-routes-zoomed',
          ]}
        />
        <LocationControl
          location="/europe"
          svg='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m17.36 2.64l-1.41 1.42A6.978 6.978 0 0 1 18 9a7 7 0 0 1-7 7c-1.85 0-3.63-.74-4.94-2.05l-1.42 1.41A8.945 8.945 0 0 0 10 17.93V20H6v2h10v-2h-4v-2.06c4.55-.51 8-4.36 8-8.94c0-2.38-.95-4.67-2.64-6.36M11 3.5A5.5 5.5 0 0 0 5.5 9a5.5 5.5 0 0 0 5.5 5.5A5.5 5.5 0 0 0 16.5 9A5.5 5.5 0 0 0 11 3.5m0 2c1.94 0 3.5 1.57 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 7.5 9A3.5 3.5 0 0 1 11 5.5Z"/></svg>'
        />
        <TerrainControl />

        <Source
          id="amtrak-stations"
          type="vector"
          url="mapbox://dotly.ckqin32ys05g627p1oze4eob0-576zu"
        >
          <Layer {...styles.amtrakStations} />
        </Source>

        <Source id="amtrak-routes-zoomed" type="vector" url="mapbox://dotly.amtrak-routes-new">
          <Layer {...styles.amtrakRoutesZoomed} />
        </Source>

        <Source id="amtrak-routes" type="vector" url="mapbox://dotly.033h8w8o">
          <Layer {...styles.amtrakRoutes} />
        </Source>

        <Source data={amtrakGeoJSON} id="amtrak" type="geojson">
          <Layer {...styles.amtrak} />
          <Layer {...styles.amtrakNumbers} />
        </Source>

        <Source
          id="mapbox-dem"
          maxzoom={14}
          tileSize={512}
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
        />
      </MapboxMap>
    </>
  )
}

export default Home
