/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/globals.scss'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ChainId, ThirdwebSDKProvider } from '@thirdweb-dev/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { RainbowKitSiweNextAuthProviderCustom } from 'provider'
import { FC } from 'react'
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { ALCHEMY_ID } from '@/configs/env'
import { META_DEFAULTS } from '@/configs/misc'
import { AppPropsWithLayout } from '@/types'

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'NFT LaunchPad',
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const ThirdwebProvider = ({ wagmiClient, children }: any) => {
  const { data: signer } = useSigner()
  console.log("signer: ", signer)
  return (
    <ThirdwebSDKProvider
      desiredChainId={ChainId.Mumbai}
      signer={signer as any}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient as any}
    >
      {children}
    </ThirdwebSDKProvider>
  )
}

const App: FC<AppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <title>{`${META_DEFAULTS.title} | ${META_DEFAULTS.description}`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>

      <WagmiConfig client={wagmiClient}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProviderCustom>
            <RainbowKitProvider chains={chains}>
              <ThirdwebProvider wagmiClient={wagmiClient}>
                {getLayout(<Component {...pageProps} />)}
              </ThirdwebProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProviderCustom>
        </SessionProvider>
      </WagmiConfig>
    </>
  )
}

export default App
