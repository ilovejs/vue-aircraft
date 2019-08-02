import { axios } from '@/utils/request'

/* settings that maps to backend endpoint */

/**
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: '/auth/login',
    method: 'post',
    data: parameter
  })
}

export function getInfo (token) {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      // 'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Token ' + token
    }
  })
}

export function logout () {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
