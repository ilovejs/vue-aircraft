import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// NProgress Configuration
NProgress.configure({ showSpinner: false })

// no redirect whitelist
const whiteList = ['login', 'register', 'registerResult']

// Generate routes from roles
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  to.meta && (typeof to.meta.title !== 'undefined'
    && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  if (Vue.ls.get(ACCESS_TOKEN)) {
    // has token
    if (to.path === '/user/login') {              //hard coding
      next({ path: '/dashboard/workplace' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {

        // User store action:GetInfo
        store.dispatch('GetInfo').then(res => {
          const roles = res.result && res.result.role

          console.log(`permission.js > route.beforeEach > User role is: ${roles}`)

          // Permission store action
          store.dispatch('GenerateRoutes', { roles }).then(() => {

            // Generate routes from roles !!
            // add route table dynamically
            router.addRoutes(store.getters.addRouters)

            const redirect = decodeURIComponent(from.query.redirect || to.path)

            if (to.path === redirect) {
              // HACK: ensure addRoutes is done,
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              next({ path: redirect })
            }
          })
        }).catch(() => {
          notification.error({
            message: 'Error',
            description: 'Request user info failed, please retry.'
          })
          store.dispatch('Logout').then(() => {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // if name is in whitelist
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      // if current page is login will not trigger afterEach hook, so manually handle it
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
