import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import project from './modules/project'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

// Computed Properties from stores.
// https://vuex.vuejs.org/guide/getters.html
export default new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,    //don't forget
    user,
    project
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
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

    // must leave this to last
    multiTab: state => state.app.multiTab,
    cachedViews: state => state.tagsView.cachedViews
  }
})
