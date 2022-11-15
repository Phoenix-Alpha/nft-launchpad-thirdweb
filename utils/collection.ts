import axios from 'axios'

import { API_URLS } from '@/configs/api'

export const createCollection = ({
  name,
  description,
  address
}: {
  name: string
  description: string
  address: string
}) =>
  axios.post(API_URLS.COLLECTION, {
    name,
    description,
    address
  })

export const getCollections = (name?: string) => {
  let apiUrl = API_URLS.COLLECTION
  if (name) {
    apiUrl = `${API_URLS.COLLECTION}?name=${name}`
  }
  return axios.get(apiUrl)
}
