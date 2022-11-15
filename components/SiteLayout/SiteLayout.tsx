import { FC, memo, ReactNode } from 'react'

import { SiteHeader } from '@/components'

export interface ISiteLayoutProps {
  children?: ReactNode
}

export const SiteLayout: FC<ISiteLayoutProps> = memo(
  ({ children }: ISiteLayoutProps) => {
    return (
      <>
        <SiteHeader />
        <main>
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">{children}</div>
        </main>
      </>
    )
  }
)

SiteLayout.displayName = 'SiteLayout'

export default SiteLayout
