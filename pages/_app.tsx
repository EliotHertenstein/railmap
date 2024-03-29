import '../styles/globals.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl-style-switcher/styles.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { MapProvider } from 'react-map-gl'
import type { AppProps } from 'next/app'

const inter = Inter({ subsets: ['latin'] })

var MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={inter.className}>
      {/* TODO: Fix this. */}
      <Head>
        <title>The Rail Map</title>
        <meta content="The Rail Map" name="title" />
        <meta content="width=device-width" name="viewport" />
        {/* Analytics */}
        <script
          data-domain="therailmap.com"
          defer
          src="https://analytics.eliothertenstein.com/js/plausible.js"
        />
      </Head>
      <Toaster />
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </main>
  )
}

export default MyApp
