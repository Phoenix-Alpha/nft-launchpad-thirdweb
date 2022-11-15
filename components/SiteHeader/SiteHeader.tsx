import { FC, memo } from 'react'

import { SignInWithWalletButton, SiteLogo } from '@/components'
import { PATHS } from '@/configs/misc'

const navigation = [
  { name: 'Collections', href: PATHS.BASE },
  { name: 'Create', href: PATHS.COLLECTION_CREATE }
]

export interface ISiteHeaderProps {}

export const SiteHeader: FC<ISiteHeaderProps> = memo(() => {
  return (
    <header className="shadow">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <SiteLogo />

            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-600 hover:text-indigo-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <SignInWithWalletButton />
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
})

SiteHeader.displayName = 'SiteHeader'

export default SiteHeader
