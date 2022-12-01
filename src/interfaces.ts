export interface ICardGroup {
  cards: Card[]
  type: CardType
}

export interface Card {
  type: CardType
}

export type CardType = 'debit' | 'apple-cash' | 'pass' | 'generic'

export interface Transaction {
  vendor: string
  location: string
  date: string
  price: string
}

export interface AssetContract {
  address: string
  asset_contract_type: string
  buyer_fee_basis_points: number
  created_date: string
  default_to_fiat: boolean
  description: string
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  external_link: string
  image_url: string
  name: string
  nft_version: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
  opensea_version: string
  owner: number
  payout_address: string
  schema_name: string
  seller_fee_basis_points: number
  symbol: string
  total_supply: string
}

export interface ICard {
  asset_contract: AssetContract
  assets: []
  description: string
  external_linkL: string
  maker: string
  name: string
  permalink: string
  seaport_sell_orders: []
  slug: string
}

export interface CardPanelProps {
  group: ICard
}

export interface CardProps {
  card: ICard
  mask: boolean
}

export interface CardWrapperProps {
  card: ICard
}
