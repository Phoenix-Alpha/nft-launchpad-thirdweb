/* eslint-disable @next/next/no-img-element */
import { NFT, NFTContract } from '@thirdweb-dev/react'
import { FC, memo } from 'react'

export interface INftCardProps {
  nft: NFT<NFTContract>
}

export const NftCard: FC<INftCardProps> = memo(({ nft }: INftCardProps) => {
  return (
    <div className="group relative select-none rounded shadow transition-all duration-300 hover:-translate-y-1">
      {nft.metadata.image && (
        <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
          <img
            src={nft.metadata.image}
            alt={nft.metadata.name as string}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
      )}
      <div className="mt-4 flex justify-between p-6">
        <div>
          <h3 className="text-sm text-gray-700">{nft.metadata.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {nft.metadata.description}
          </p>
        </div>
      </div>
    </div>
  )
})

NftCard.displayName = 'NftCard'

export default NftCard
