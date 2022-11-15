import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider
} from '@rainbow-me/rainbowkit'
import { GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth'
import { useRouter } from 'next/router'
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react'
import { createElement, ReactNode, useMemo } from 'react'
import { SiweMessage } from 'siwe'

import { PATHS } from '@/configs/misc'

export const RainbowKitSiweNextAuthProviderCustom = ({
  children,
  enabled,
  getSiweMessageOptions
}: {
  enabled?: boolean
  getSiweMessageOptions?: GetSiweMessageOptions
  children: ReactNode
}) => {
  const router = useRouter()
  const { status } = useSession()
  const adapter = useMemo(
    () =>
      createAuthenticationAdapter<SiweMessage>({
        createMessage: ({ address, chainId, nonce }) => {
          const defaultConfigurableOptions = {
            domain: window.location.host,
            statement: 'Sign in with Wallet to NFT LaunchPad',
            uri: window.location.origin,
            version: '1'
          }
          const unconfigurableOptions = {
            address,
            chainId,
            nonce
          }
          return new SiweMessage({
            ...defaultConfigurableOptions,
            ...(getSiweMessageOptions == null
              ? undefined
              : getSiweMessageOptions()),
            ...unconfigurableOptions
          })
        },
        getMessageBody: ({ message }) => message.prepareMessage(),
        getNonce: async () => {
          const nonce = await getCsrfToken()
          if (!nonce) throw new Error()
          return nonce
        },
        signOut: async () => {
          await signOut()
        },
        verify: async ({ message, signature }) => {
          let _a
          const response = await signIn('credentials', {
            message: JSON.stringify(message),
            redirect: false,
            signature,
            callbackUrl: PATHS.BASE
          })

          response?.ok && response?.url && router.push(response?.url)

          return (_a = response == null ? undefined : response.ok) != null
            ? _a
            : false
        }
      }),
    [getSiweMessageOptions, router]
  )
  // eslint-disable-next-line react/no-children-prop
  return createElement(RainbowKitAuthenticationProvider<SiweMessage>, {
    adapter,
    enabled,
    status,
    children
  })
}
