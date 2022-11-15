import { GetServerSideProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import { memo, useEffect } from 'react'

import { getServerSidePropsForProtectedPage } from '@/utils/pages'

export interface ISignoutPageProps {}

export const SignoutPage: NextPage<ISignoutPageProps> = memo(() => {
  useEffect(() => {
    signOut().then().catch()
  }, [])

  return null
})

export const getServerSideProps: GetServerSideProps = async (context) =>
  getServerSidePropsForProtectedPage(context)

SignoutPage.displayName = 'SignoutPage'

export default SignoutPage
