import Image from 'next/image'
import Link from 'next/link'
import { FC, memo } from 'react'

export interface ISiteLogoProps {
  width?: number
  height?: number
  className?: string
}

export const SiteLogo: FC<ISiteLogoProps> = memo(
  ({ width = 40, height = 40 }: ISiteLogoProps) => (
    <Link href="/" passHref>
      <a className="flex items-center">
        <span className="sr-only">Logo</span>
        <Image
          className="rounded"
          width={width}
          height={height}
          src="/images/logo.png"
          alt="logo"
        />
      </a>
    </Link>
  )
)

SiteLogo.displayName = 'SiteLogo'

export default SiteLogo
