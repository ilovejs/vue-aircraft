import { axios } from '@/utils/request'

export function createProject(token, param) {
  console.log('api:createProject:', param)
  return axios({
    url: '/projects',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    },
    method: 'post',
    data: param
  })
}

export function loadProjects(token) {
  console.log('api: list projects')
  return axios({
    url: '/projects',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    },
    method: 'get'
  })
}

export function loadSingleProject(token, pid) {
  console.log('api: load a project: ', pid)
  return axios({
    url: `/projects/${pid}`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    },
    method: 'get'
  })
}

export function addTrade(token, data) {
  console.log('api: add trade project data:', data)
  return axios({
    url: `/trades`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    },
    method: 'post',
    data: data
  })
}

export function removeTrade(token, tid) {
  console.log('api: remove trade project data:', tid)
  return axios({
    url: `/trades/` + tid,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    },
    method: 'delete'
  })
}

export function apiLoadCategory(token) {
  console.log('api: load category')
  return axios({
    url: '/bts',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'get'
  })
}
