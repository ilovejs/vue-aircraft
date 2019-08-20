import { axios } from '@/utils/request'

export function apiCreateTrade (token, param) {
  console.log('api:apiCreateTrade:', param)
  return axios({
    url: '/trades',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'post',
    data: param
  })
}

export function apiLoadTrades(token, param) {
  console.log('api: load trades', param)
  return axios({
    url: '/trades',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'get',
    params: param
  })
}

export function apiLoadSingleTrade(token, pid) {
  console.log('api: load a trade: ', pid)
  return axios({
    url: '/trades/' + pid ,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'get'
  })
}

