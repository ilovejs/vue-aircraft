import Vue from 'vue'
import { apiLoadTrades } from '@/api/trade'
import { ACCESS_TOKEN, ADD_TRADE } from '@/store/mutation-types'

// exported at the bottom
const trade = {
  state: {
    trades: [],
  },
  mutations: {
    [ADD_TRADE]: (state, p) => {
      state.trades.concat(p)
    }
  },
  actions: {
    // todo: list related trade, not all
    ListTrades({commit}, params){
      return new Promise((resolve, reject) => {
        const token = Vue.ls.get(ACCESS_TOKEN)
        apiLoadTrades(token, params).then(resp => {
          console.log('ListTrades:', resp)
          commit(ADD_TRADE, resp.trades)
          resolve(resp)
        }).catch(e => {
          reject(e)
        })
      }).catch(e => {
        console.log('modules - trade.js', e)
      })
    }
  }

}

export default trade
