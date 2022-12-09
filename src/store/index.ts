import { defineStore } from 'pinia'

import { getNFTCards } from '../api/apiCaller'

import { ICard } from '../interfaces'

export const useCardsStore = defineStore('cards', {
  state: () => ({
    nftCards: [] as ICard[],
  }),
  getters: {
    nftCardList: (state) => state.nftCards,
  },
  actions: {
    async mutateNftCardListAsync(offset: number) {
      const { data } = await getNFTCards(offset)
      const dataT = data.bundles.map((item: ICard, index: number) => ({
        ...item,
        id: this.nftCardList.length + index + 1,
      }))
      this.nftCards = [...this.nftCards, ...dataT]
    },
  },
})
