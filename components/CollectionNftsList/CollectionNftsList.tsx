import { FC, memo } from 'react'

import { Button, NftCard } from '@/components'
import { useCollectionNftsList } from '@/hooks'

export interface ICollectionNftsListProps {
  address: string
}

export const CollectionNftsList: FC<ICollectionNftsListProps> = memo(
  ({ address }: ICollectionNftsListProps) => {
    const { isMinting, nfts, metadata, onClickMint } =
      useCollectionNftsList(address)

    return (
      <>
        <div className="flex flex-row items-center justify-between">
          <h2 className="mb-4 text-4xl font-bold">
            NFTs for Collection {metadata?.name}
          </h2>
          <Button
            className="w-[8rem]"
            onClick={onClickMint}
            isLoading={isMinting}
            disabled={isMinting}
          >
            Mint
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-10 pt-6 sm:pt-10">
          {nfts?.map((nft) => (
            <NftCard nft={nft} key={nft?.metadata?.uri} />
          ))}
        </div>
      </>
    )
  }
)

CollectionNftsList.displayName = 'CollectionNftsList'

export default CollectionNftsList
