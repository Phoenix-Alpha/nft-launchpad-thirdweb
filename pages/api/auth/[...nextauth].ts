import { IncomingMessage } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

import { NEXTAUTH_URL } from '@/configs/env'

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text'
        },
        signature: {
          label: 'Signature',
          type: 'text'
        }
      },
      authorize: async (credentials) => {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))

          const nextAuthUrl = NEXTAUTH_URL
          if (!nextAuthUrl) {
            return null
          }

          const nextAuthHost = new URL(nextAuthUrl).host
          if (siwe.domain !== nextAuthHost) {
            return null
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null
          }

          await siwe.validate(credentials?.signature || '')
          return {
            id: siwe.address
          }
        } catch (e) {
          return null
        }
      }
    })
  ]

  return {
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub
        session.user = {
          name: token.sub
        }
        return session
      }
    },
    providers,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt'
    }
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req)

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send('Bad request')
    return
  }

  const isDefaultSigninPage =
    req.method === 'GET' &&
    req.query.nextauth.find((value) => value === 'signin')

  if (isDefaultSigninPage) {
    authOptions.providers.pop()
  }

  return await NextAuth(req, res, authOptions)
}
