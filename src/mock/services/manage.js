import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      no: `No ${tmpKey}`,
      description: 'Trade description....',
      callNo: Mock.mock('@integer(1, 999)'),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false,
    })
  }

  return builder({
    pageSize,
    pageNo,
    totalCount,
    totalPage,
    data: result,
  })
}

const projects = () => builder({
    data: [{
      id: 1,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: 'Alipay',
      description: '那是一种内在的东西， 他们到达不了，也无法触及的',
      status: 1,
      updatedAt: '2018-07-26 00:00:00',
    },
    {
      id: 2,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: 'Angular',
      description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
      status: 1,
      updatedAt: '2018-07-26 00:00:00',
    },
    {
      id: 3,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: 'Ant Design',
      description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
      status: 1,
      updatedAt: '2018-07-26 00:00:00',
    },
    {
      id: 4,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      title: 'Ant Design Pro',
      description: '那时候我只会想自己想要什么，从不想自己拥有什么',
      status: 1,
      updatedAt: '2018-07-26 00:00:00',
    },
    {
      id: 5,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      title: 'Bootstrap',
      description: '凛冬将至',
      status: 1,
      updatedAt: '2018-07-26 00:00:00',
    },
    {
      id: 6,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
      title: 'Vue',
      description: '生命就像一盒巧克力，结果往往出人意料',
      status: 1,
      updatedAt: '2018-07-26 00:00:00',
    },
    ],
    pageSize: 10,
    pageNo: 0,
    totalPage: 6,
    totalCount: 57,
  })

const activity = () => builder([{
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划',
    },
    time: '2018-08-23 14:47:00',
  },
  {
    id: 1,
    user: {
      nickname: '蓝莓酱',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    },
    project: {
      name: '白鹭酱油开发组',
      action: '更新',
      event: '番组计划',
    },
    time: '2018-08-23 09:35:37',
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)',
    },
    project: {
      name: '白鹭酱油开发组',
      action: '创建',
      event: '番组计划',
    },
    time: '2017-05-27 00:00:00',
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: '@image(64x64)',
    },
    project: {
      name: '高逼格设计天团',
      action: '更新',
      event: '六月迭代',
    },
    time: '2018-08-23 14:47:00',
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: '@image(64x64)',
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代',
    },
    time: '2018-08-23 14:47:00',
  },
  {
    id: 1,
    user: {
      nickname: '曲丽丽',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    },
    project: {
      name: '高逼格设计天团',
      action: 'created',
      event: '六月迭代',
    },
    time: '2018-08-23 14:47:00',
  },
  ])

const teams = () => builder([{
    id: 1,
    name: 'Science Team',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  },
  {
    id: 2,
    name: 'Programmer Team',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  },
  {
    id: 1,
    name: 'Designer Team',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  },
  {
    id: 1,
    name: 'Game of throne follower',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  },
  {
    id: 1,
    name: 'Geek Team',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  },
  ])

const radar = () => builder([{
    item: 'Reference',
    Personal: 70,
    Team: 30,
    Department: 40,
  },
  {
    item: 'Reputation',
    Personal: 60,
    Team: 70,
    Department: 40,
  },
  {
    item: 'Output',
    Personal: 50,
    Team: 60,
    Department: 40,
  },
  {
    item: 'Contribution',
    Personal: 40,
    Team: 50,
    Department: 40,
  },
  {
    item: 'Hot',
    Personal: 60,
    Team: 70,
    Department: 40,
  },
  {
    item: 'External',
    Personal: 70,
    Team: 50,
    Department: 40,
  },
  ])

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
