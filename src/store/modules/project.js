import Vue from 'vue'
import { loadProjects } from '@/api/project'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// exported at the bottom
const project = {
  state: {
    projects: [],
  },
  mutations: {
    ADD_PROJECT: (state, p) => {
      state.projects.concat(p)
    },
  },
  actions: {
    // todo: list related project, not all
    ListProjects({ commit }) {
      return new Promise((resolve, reject) => {
        const token = Vue.ls.get(ACCESS_TOKEN)

        loadProjects(token).then((resp) => {
          console.log(resp)

          commit('ADD_PROJECT', resp.projects)
          resolve(resp)
        }).catch((e) => {
          reject(e)
        })
      }).catch((e) => {
        console.log('modules - project.js', e)
      })
    },
  },

}

export default project
