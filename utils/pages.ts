import { Collection } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'

import { PATHS } from '@/configs/misc'

import { getCollections } from './collection'

export const getServerSidePropsForAuthPage = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context
  const session = await getSession({ req })
  const token = await getToken({ req: context.req })
  const address = token?.sub ?? null

  if (res && session && address) {
    return {
      props: {
        address,
        session
      },
      redirect: { destination: PATHS.BASE, permanent: false }
    }
  }

  return {
    props: {}
  }
}

export const getServerSidePropsForProtectedPage = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context
  const session = await getSession({ req })
  const token = await getToken({ req: context.req })
  const address = token?.sub ?? null

  if (!res || !session || !address) {
    return {
      props: {},
      redirect: { destination: PATHS.SIGNIN, permanent: false }
    }
  }

  try {
    return {
      props: {
        address,
        session
      }
    }
  } catch (error) {
    return {
      props: {},
      redirect: { destination: PATHS.SIGNOUT, permanent: false }
    }
  }
}

export const getServerSidePropsForHomePage = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context
  const session = await getSession({ req })
  const token = await getToken({ req: context.req })
  const address = token?.sub ?? null

  if (!res || !session || !address) {
    return {
      props: {},
      redirect: { destination: PATHS.SIGNIN, permanent: false }
    }
  }

  try {
    const response = await getCollections()
    const collections: Collection[] = response.data?.collections ?? []
    return {
      props: {
        address,
        session,
        addresses: collections.map((col) => col.address)
      }
    }
  } catch (error) {
    return {
      props: {},
      redirect: { destination: PATHS.SIGNOUT, permanent: false }
    }
  }
}

export const getServerSidePropsForCollectionPage = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context

  const session = await getSession({ req })
  const token = await getToken({ req: context.req })
  const address = token?.sub ?? null

  if (!res || !session || !address) {
    return {
      props: {},
      redirect: { destination: PATHS.SIGNIN, permanent: false }
    }
  }

  const name = context.query?.name
  if (Array.isArray(name) || !name) {
    return {
      props: {
        session
      },
      redirect: { destination: PATHS.COLLECTION, permanent: false }
    }
  }

  try {
    const response = await getCollections(name)
    const collections: Collection[] = response.data?.collections ?? []

    if (collections.length === 0) {
      return {
        props: {
          session
        },
        redirect: { destination: PATHS.COLLECTION, permanent: false }
      }
    }

    return {
      props: {
        address,
        session,
        collectionAddress: collections[0].address
      }
    }
  } catch (error) {
    return {
      props: {},
      redirect: { destination: PATHS.SIGNOUT, permanent: false }
    }
  }
}
