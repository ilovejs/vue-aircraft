import { axios } from '@/utils/request'

export function createProject (token, param) {
  console.log('api:createProject:', param)
  return axios({
    url: '/projects',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'post',
    data: param
  })
}

export function readProject (token) {
  return axios({
    url: '/projects/' + token,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'get'
  })
}

