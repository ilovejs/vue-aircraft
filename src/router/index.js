import Vue from 'vue'
import Router from 'vue-router'
import { DEFAULT_ROUTERS } from '@/config/router.config'

Vue.use(Router)

// html5 history mode
export default new Router({
  mode: 'history', //https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: DEFAULT_ROUTERS
})
