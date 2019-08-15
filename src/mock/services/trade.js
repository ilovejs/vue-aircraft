import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const trades = () => {
  return builder([
    {
      project: 1,
      creator: 'Science Team',
      category: 13,
      breakdown: "Level 1"
    }
  ])
}

const postTrades = () => {
  return builder([
    {
      result: "ok"
    }
  ])

}
Mock.mock(/\/project\/trades/, 'get', trades)
Mock.mock(/\/project\/trades/, 'post', postTrades)
