import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  // computed properties for stores. https://vuex.vuejs.org/guide/getters.html
  getters: {
    device: state => state.app.device,
    theme: state => state.app.theme,
    color: state => state.app.color,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.name,
    welcome: state => state.user.welcome,
    roles: state => state.user.roles,
    userInfo: state => state.user.info,
    addRouters: state => state.permission.addRouters,
    multiTab: state => state.app.multiTab
  }
})
