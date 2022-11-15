import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { SiteHead, SiteLayout } from '@/components'
import { getServerSidePropsForCollectionPage } from '@/utils/pages'

// Disable SSR as thirdweb SDK only working on browser
const CollectionNftsList = dynamic(
  () => import('../../components/CollectionNftsList'),
  {
    ssr: false
  }
)

export interface INftCollectionPageProps {
  collectionAddress: string
}

const NftCollectionPage = ({ collectionAddress }: INftCollectionPageProps) => {
  return (
    <div className="flex flex-col pt-6 sm:pt-10">
      <CollectionNftsList address={collectionAddress} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (context) =>
  getServerSidePropsForCollectionPage(context)

NftCollectionPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <SiteHead />
      <SiteLayout>{page}</SiteLayout>
    </>
  )
}

export default NftCollectionPage
