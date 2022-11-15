import { FC, memo } from 'react'

import { NftCollectionCard } from '@/components'

export interface INftCollectionCardListProps {
  addresses: string[]
}

export const NftCollectionCardList: FC<INftCollectionCardListProps> = memo(
  ({ addresses }: INftCollectionCardListProps) => (
    <div className="flex flex-col pt-6 sm:pt-10">
      <h2 className="mb-4 text-4xl font-bold">Collections List</h2>
      <p className="text-lg font-medium text-gray-400">
        To see NFTs for each collection, click the collection card
      </p>
      <div className="flex flex-wrap items-center gap-10 pt-6 sm:pt-10">
        {addresses?.map((addr) => (
          <NftCollectionCard address={addr} key={addr} />
        ))}
        {addresses?.length === 0 && <div>No collections</div>}
      </div>
    </div>
  )
)

NftCollectionCardList.displayName = 'NftCollectionCardList'

export default NftCollectionCardList
