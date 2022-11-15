import { useContractMetadata } from '@thirdweb-dev/react'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { PATHS } from '@/configs/misc'

export const useNftCollectionCard = (address: string) => {
  const router = useRouter()

  const { data: metadata } = useContractMetadata(address)

  const handleClick = useCallback(() => {
    if (metadata?.name) {
      router.push(`${PATHS.COLLECTION}/${metadata.name}`)
    }
  }, [metadata, router])

  return {
    metadata,
    handleClick
  }
}
