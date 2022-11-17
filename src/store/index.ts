import { createStore } from 'vuex'

import { getNFTCards } from '../api/apiCaller'

import { ICard } from '../interfaces'

export default createStore({
  state: {
    nftCardList: [] as ICard[],
  },
  mutations: {
    mutateNftCardList(state, payload: ICard[]) {
      state.nftCardList.push(...payload)
      console.log('state.nftCardList', state.nftCardList)
    },
  },
  actions: {
    async mutateNftCardListAsync({ commit }, offset: number) {
      const { data } = await getNFTCards(offset)
      commit('mutateNftCardList', data.bundles)
    },
  },
  modules: {},
})
