import { ConnectKitProvider } from 'connectkit'
import NextHead from 'next/head'
import { WagmiConfig } from 'wagmi'
import { client } from '../src/wagmi'
import Page from './index'
import '../src/style.css'

import Script from 'next/script'

function App() {
  

   
  
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <NextHead>
          <title>TDM Web3 Demo</title>
          <link rel="shortcut icon" href="favicon.png" />
        </NextHead>

        <Script
              id="googlemaps"
              type="text/javascript"
              strategy="beforeInteractive"
              src={'https://maps.googleapis.com/maps/api/js?key=AIzaSyAPDMmDM2Sw1i3MHrHNTWxCKC979lPxG90&amp;libraries=places&amp;callback=initMap'}

        />


        <Page></Page>

      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
