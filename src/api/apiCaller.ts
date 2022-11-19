import axios from 'axios'

const base_url =
  'https://api.opensea.io/api/v1/bundles?format=json&limit=5&offset='

export const getNFTCards = (offset: number) => {
  return axios.get(`${base_url}` + offset)
}
