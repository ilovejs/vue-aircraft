import Vue from 'vue'
import { getInfo, login, logout } from '@/api/login'
import { ACCESS_TOKEN, USER_ID } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

// todo: just for demo purpose
import { mockUserInfo } from '@/mock/services/user'

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
      console.log('SET ROLES: ', roles)
    },
    SET_INFO: (state, info) => {
      state.info = info
      console.log('SET INFO: ', info)
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // api
        login(userInfo).then(response => {
          const token = response.result.token

          Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(USER_ID, response.result.id)

          commit('SET_TOKEN', token)
          console.log('SET_TOKEN: ', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo: function({ commit }) {
      return new Promise((resolve, reject) => {
        const token = Vue.ls.get(ACCESS_TOKEN)
        // api action
        getInfo(token).then(response => {
          // Mock Backend json field
          const result = mockUserInfo()
          console.log('mockUserInfo', result)
            // response.result
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role

            role.permissions = result.role.permissions
            role.permissions.map(p => {
              if (p.actionEntitySet != null && p.actionEntitySet.length > 0) {
                // build new actionList from `actionEntitySet`
                p.actionList = p.actionEntitySet.map(x => { return x.action })
              }
            })
            // build permissionList from `permissionId`
            role.permissionList = role.permissions.map(p => { return p.permissionId })

            // resolve() and return to caller permission beforeEach
            // dynamic routing parts
            response.result.role = role

            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
            // commit('SET_ROLES', info.role)
            // commit('SET_INFO', info)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', {
            name: result.name,
            welcome: welcome()
          })
          commit('SET_AVATAR', result.avatar)

          console.log('response', response)

          // this is literally a return
          resolve(response)

        }).catch(error => {
          console.log('getInfo: ', error)
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
