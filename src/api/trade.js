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

export function apiUpdateTrade (token, tid, param) {
  console.log('api: Update Trade:', tid, param)
  return axios({
    url: '/trades/' + tid,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'PUT',
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
    method: 'GET',
    params: param
  })
}

export function apiProjectTrades(token, param) {
  console.log('api: load a trade for p: ', param)
  return axios({
    url: '/trades/?pid=' + param ,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Token ' + token
    },
    method: 'GET',
    params: param
  })
}

