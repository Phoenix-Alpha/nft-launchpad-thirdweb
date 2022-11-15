import { useContract, useContractMetadata, useNFTs } from '@thirdweb-dev/react'
import { SignedPayload721WithQuantitySignature } from '@thirdweb-dev/sdk'
import { useCallback, useState } from 'react'
import { useAccount } from 'wagmi'

export const useCollectionNftsList = (collectionAddress: string) => {
  const [isMinting, setIsMinting] = useState(false)
  const { contract } = useContract(collectionAddress)
  const { data: nfts } = useNFTs(contract?.nft)
  const { data: metadata } = useContractMetadata(collectionAddress)
  const { address } = useAccount()

  const onClickMint = useCallback(async () => {
    if (address) {
      setIsMinting(true)

      const nftMetadata = {
        name: 'Cool NFT #1',
        description: 'This is a cool NFT'
      }

      const startTime = new Date()
      const endTime = new Date(Date.now() + 60 * 60 * 24 * 1000)
      const payload = {
        metadata: nftMetadata, // The NFT to mint
        to: address, // Who will receive the NFT (or AddressZero for anyone)
        quantity: 2, // the quantity of NFTs to mint
        mintStartTime: startTime, // can mint anytime from now
        mintEndTime: endTime // to 24h from now
      }

      const signedPayload = await contract?.nft?.signature?.generate(payload)

      await contract?.nft?.signature?.mint(
        signedPayload as SignedPayload721WithQuantitySignature
      )

      setIsMinting(false)
    }
  }, [address, contract])

  return {
    isMinting,
    nfts,
    metadata,
    onClickMint
  }
}
