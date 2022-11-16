import { createStore } from 'vuex'

import { getNFTCards } from '../api/apiCaller'

import { ICard, URLQuery } from '../interfaces'

export default createStore({
  state: {
    nftCardList: [],
  },
  mutations: {
    mutateNftCardList(state, payload) {
      state.nftCardList = payload
    },
  },
  actions: {
    async mutateNftCardListAsync({ commit }, payload: URLQuery) {
      const { data } = (await getNFTCards(payload)) as any
      commit('mutateNftCardList', data.bundles)
    },
  },
  modules: {},
})
