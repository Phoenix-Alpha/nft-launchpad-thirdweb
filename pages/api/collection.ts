import type { NextApiRequest, NextApiResponse } from 'next'

import { createCollection, getCollections } from '@/lib/api'
import { HttpMethod } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      return getCollections(req, res)
    case HttpMethod.POST:
      return createCollection(req, res)
    default:
      res.setHeader('Allow', [HttpMethod.GET, HttpMethod.POST])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
