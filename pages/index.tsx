import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

import { SiteHead, SiteLayout } from '@/components'
import { getServerSidePropsForHomePage } from '@/utils/pages'

// Disable SSR as thirdweb SDK only working on browser
const NftCollectionCardList = dynamic(
  () => import('../components/NftCollectionCardList'),
  { ssr: false }
)

export interface IHomePageProps {
  addresses: string[]
}

const HomePage = ({ addresses }: IHomePageProps) => {
  return <NftCollectionCardList addresses={addresses} />
}

export const getServerSideProps: GetServerSideProps = (context) =>
  getServerSidePropsForHomePage(context)

HomePage.getLayout = (page: ReactElement) => {
  return (
    <>
      <SiteHead />
      <SiteLayout>{page}</SiteLayout>
    </>
  )
}

export default HomePage
