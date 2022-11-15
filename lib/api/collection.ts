import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

/**
 * Create Collection
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, address } = req.body

  if (!name || !description || !address) {
    return res.status(400).end('Bad request. Parameters are not valid.')
  }

  try {
    const response = await prisma.collection.create({
      data: {
        name,
        description,
        address
      }
    })

    return res.status(201).json({
      collectionId: response.id
    })
  } catch (error) {
    return res.status(500).end(error)
  }
}

/**
 * Get Collections
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getCollections(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query

  if (Array.isArray(name)) {
    return res.status(500).end('Bad request. Query parameters are not valid.')
  }

  try {
    const collections = await prisma.collection.findMany({
      where: {
        name
      }
    })
    return res.status(201).json({
      collections
    })
  } catch (error) {
    return res.status(500).end(error)
  }
}
