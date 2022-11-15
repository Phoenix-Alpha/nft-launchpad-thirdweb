import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import Image from 'next/image'
import { FC, memo } from 'react'

import { Button } from '@/components'

export interface ISignInWithWalletButtonProps {}

export const SignInWithWalletButton: FC<ISignInWithWalletButtonProps> = memo(
  () => (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            className={classNames({
              'aria-hidden select-none opacity-0 pointer-events-none': !ready
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} type="button">
                    Sign In with Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                )
              }

              return (
                <div className="flex gap-3">
                  <Button onClick={openChainModal} type="button">
                    {chain.hasIcon && (
                      <div
                        className="mr-2 h-4 w-4 overflow-hidden rounded-full"
                        style={{
                          background: chain.iconBackground
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
)

SignInWithWalletButton.displayName = 'SignInWithWalletButton'

export default SignInWithWalletButton
