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

export function apiReadProjects(token) {
  console.log('api: list projects')
  return axios({
    url: '/projects',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'get'
  })
}

