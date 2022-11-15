import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import { NftCampaignForm, SiteHead, SiteLayout } from '@/components'
import { getServerSidePropsForProtectedPage } from '@/utils/pages'

const NftCollectionCreatePage = () => {
  return (
    <div className="flex items-center justify-center pt-6 sm:pt-10">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <NftCampaignForm />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (context) =>
  getServerSidePropsForProtectedPage(context)

NftCollectionCreatePage.getLayout = (page: ReactElement) => {
  return (
    <>
      <SiteHead />
      <SiteLayout>{page}</SiteLayout>
    </>
  )
}

export default NftCollectionCreatePage
