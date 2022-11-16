import axios from 'axios'
import { URLQuery } from '../interfaces'

const base_url = 'https://api.opensea.io/api/v1/bundles'

export const getNFTCards = (query: URLQuery) => {
  return axios.get(`${base_url}`, query as any)
}
