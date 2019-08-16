// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios } from './utils/request'

// TODO: mock is exported under index.js
// loading services according to node settings
// Turn off will cause /api/2step not available in login
// Check console for loading logs
import './mock'

import bootstrap from './core/bootstrap'

/* Check Readme.md
*  https://github.com/sendya/ant-design-pro-vue/blob/master/docs/load-on-demand.md
* */
import './core/use'
// import './core/lazy_use'

import './permission' // permission control
import './utils/filter' // global filter

// disable warning "You are running Vue in development mode."
Vue.config.productionTip = true

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: (h) => h(App),
}).$mount('#app')
