import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// axios instance
// let port = 8585; // real backend
let port = 8000; // mock port

const service = axios.create({
  // baseURL: '/api',     // !!!! api base_url !!!!!
  baseURL: location.protocol + '//' + location.hostname + ':' + port + '/api',
  timeout: 6000,
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)

    // 403
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }

    // 401
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {

      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })

      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    // each request has access-token
    config.headers['Access-Token'] = token
  }
  return config
}, err) // use err function

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

// expose installer object as well as axios service
export {
  installer as VueAxios,
  service as axios
}
