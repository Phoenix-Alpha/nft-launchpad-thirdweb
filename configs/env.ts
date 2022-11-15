export const IS_DEV = process.env.APP_ENV === 'development'
export const IS_PROD = process.env.APP_ENV === 'production'

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL
export const API_URL = process.env.API_URL ?? 'http://localhost:3000/api'

export const ALCHEMY_ID = process.env.ALCHEMY_ID
