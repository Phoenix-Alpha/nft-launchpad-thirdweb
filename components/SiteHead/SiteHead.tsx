import Head from 'next/head'
import { FC, memo, useMemo } from 'react'

import { META_DEFAULTS } from '@/configs/misc'

export interface ISiteHeadProps {
  title?: string
  description?: string
}

export const SiteHead: FC<ISiteHeadProps> = memo(
  ({ title, description }: ISiteHeadProps) => {
    const pageTitle = useMemo(
      () =>
        title
          ? `${title} - ${META_DEFAULTS.description}`
          : `${META_DEFAULTS.title} - ${META_DEFAULTS.description}`,
      [title]
    )

    const pageDescription = useMemo(
      () => description ?? META_DEFAULTS.description,
      [description]
    )

    return (
      <Head>
        <title>{pageTitle}</title>

        <meta charSet="utf-8" />
        <meta name="description" content={pageDescription} />

        <meta property="og:url" content={META_DEFAULTS.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>
    )
  }
)

SiteHead.displayName = 'SiteHead'

export default SiteHead
