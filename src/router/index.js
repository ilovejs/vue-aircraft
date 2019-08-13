import Vue from 'vue'
import Router from 'vue-router'
import { DEFAULT_ROUTERS, constantRouterMap, asyncRouterMap } from '@/config/router.config'


Vue.use(Router)

let routes

if (process.env.LOGIN === 'true') {
  routes = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap.concat(asyncRouterMap),
  })
} else {
  // html5 history mode
  // https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  routes = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: DEFAULT_ROUTERS,
  })
}

const ROUTES = routes
export default ROUTES
