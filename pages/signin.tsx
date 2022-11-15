import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

import { SiteHead, SiteLayout } from '@/components'
import { getServerSidePropsForAuthPage } from '@/utils/pages'

const SignInPage = () => {
  return (
    <div className="flex flex-col pt-6 sm:pt-10">
      <h2 className="mb-4 text-4xl font-bold">Sign In</h2>
      <p className="text-lg font-medium text-gray-400">
        Please sign in with your wallet using the button on the top bar
      </p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (context) =>
  getServerSidePropsForAuthPage(context)

SignInPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <SiteHead />
      <SiteLayout>{page}</SiteLayout>
    </>
  )
}

export default SignInPage
