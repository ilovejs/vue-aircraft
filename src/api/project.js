import { axios } from '@/utils/request'

export function apiCreateProject(token, param) {
  console.log('api:apiCreateProject:', param)
  return axios({
    url: '/projects',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`,
    },
    method: 'post',
    data: param,
  })
}

export function apiLoadProjects(token) {
  console.log('api: list projects')
  return axios({
    url: '/projects',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`,
    },
    method: 'get',
  })
}

export function apiLoadSingleProject(token, pid) {
  console.log('api: load a project: ', pid)
  return axios({
    url: `/projects/${pid}`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`,
    },
    method: 'get',
  })
}
