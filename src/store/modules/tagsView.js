// Provide actions addCachedView etc for MultiTab component via store/index.js and dispatch
// https://github.com/zhaozhenghao1993/zh-web-vue/blob/master/src/store/modules/tagsView.js
const tagsView = {
  state: {
    cachedViews: [],
  },
  mutations: {
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (view.meta.keepAlive) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
  },
  actions: {
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },
  },
}

export default tagsView
