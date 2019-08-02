import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const email = ['dummy@gmail.com']
const username = ['admin', 'user', 'super']
const password = [
  'admin',
  '21232f297a57a5a743894a0e4a801fc3',
  '8914de686ab28dc22f30d3d8e107ff6c'
] // admin, ant.design

const login = (options) => {
  const body = getBody(options)

  const actualUsername = body.username
  const actualPassword = body.password

  if (!username.includes(actualUsername) ||
     !password.includes(actualPassword)) {
  // if (actualEmail !== "dummy@gmail.com" ||
  //     actualPassword !== "admin") {
    return builder(
      { isLogin: true },
      'Account or password wrong',
      401)
  }

  console.log('auth else:')

  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'password': '',
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'deleted': 0,
    'roleId': 'admin',
    'lang': 'zh-CN',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200,
  { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

//expose as api
Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
