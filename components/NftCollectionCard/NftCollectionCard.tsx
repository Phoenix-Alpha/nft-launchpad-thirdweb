import { FC, memo } from 'react'

import { useNftCollectionCard } from '@/hooks'

export interface INftCollectionCardProps {
  address: string
}

export const NftCollectionCard: FC<INftCollectionCardProps> = memo(
  ({ address }: INftCollectionCardProps) => {
    const { metadata, handleClick } = useNftCollectionCard(address)

    return (
      <div
        className="group relative cursor-pointer rounded shadow transition-all duration-300 hover:-translate-y-1"
        onClick={handleClick}
      >
        <div className="mt-4 flex justify-between p-6">
          <div>
            <h3 className="text-3xl text-indigo-600">{metadata?.name}</h3>
            <p className="mt-1 text-2xl text-gray-500">
              {metadata?.description}
            </p>
          </div>
        </div>
      </div>
    )
  }
)

NftCollectionCard.displayName = 'NftCollectionCard'

export default NftCollectionCard
