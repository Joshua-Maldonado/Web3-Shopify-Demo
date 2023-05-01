import { ConnectKitProvider } from 'connectkit'
import NextHead from 'next/head'

import { WagmiConfig } from 'wagmi'
import { client } from '../src/wagmi'
import Page from './index'




function App() {
  

   
  
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <NextHead>
          <title>TOKEN GATE</title>
        </NextHead>

        


        <Page></Page>

      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
