import Mock from 'mockjs2'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  // Synchronously loading dependencies
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  // console.log('MOCK MOUNTING')
  //
  // require('./services/auth')

  require('./services/user')
  require('./services/manage')
  require('./services/other')
  require('./services/tagCloud')
  require('./services/article')

  // TODO: more config ?
  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('MOCK MOUNTED')
}
