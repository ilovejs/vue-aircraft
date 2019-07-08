import Vue from 'vue'
import { getInfo, login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        //api
        login(userInfo).then(response => {
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo: function({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          //todo: restful style need a protocol between fe and be, or code break when Backend change.
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            //pull the whole object
            role.permissions = result.role.permissions
            role.permissions.map(p => {
              if (p.actionEntitySet != null && p.actionEntitySet.length > 0) {
                // permission.action list
                p.actionList = p.actionEntitySet.map(
                  x => {
                    return x.action
                  })
              }
            })
            //aggregate permission into a list
            role.permissionList = role.permissions.map(
              permission => {
                return permission.permissionId
              })
            //save role
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }
  }
}

export default user
