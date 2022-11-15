import axios from 'axios'

const base_url = 'https://api.opensea.io/api/v1/bundles'

export const getNFTCards = (query: any) => {
  return axios.get(`${base_url}`, query)
}
