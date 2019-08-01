import Mock from 'mockjs2'

// conditions before loading mocks
if (process.env.NODE_ENV !== 'production' ||
  process.env.VUE_APP_PREVIEW === 'true') {

  // Synchronously load dependencies
  // Prevent GetInfo in vuex run before mock，leading to no result from mock.
  console.log('mock mounting')

  require('./services/auth')
  require('./services/user')
  require('./services/manage')
  require('./services/other')
  require('./services/tagCloud')
  require('./services/article')

  Mock.setup({
    timeout: 800
  })

  console.log('mock mounted')
}

