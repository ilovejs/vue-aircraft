import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false })

const whiteList = ['login', 'register', 'registerResult']

// Generate routes from roles
router.beforeEach((to, from, next) => {
  NProgress.start()

  to.meta && (typeof to.meta.title !== 'undefined'
    && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  if (Vue.ls.get(ACCESS_TOKEN)) {
    console.log('Vue.ls get token ok.')

    // redirection to dashboard
    if (to.path === '/user/login') {
      console.log('goto /dashboard/workplace')

      next({ path: '/dashboard/workplace' })
      NProgress.done()
    } else {

      if (store.getters.roles.length === 0) {

        console.log('len(getters.roles)==0, dispatching GetInfo')

        store.dispatch('GetInfo').then(response => {
          const roles = response.result && response.result.role
          console.log('permission.js roles: ', roles)

          // Dynamic routes
          store.dispatch('GenerateRoutes', { roles }).
            then(() => {
            // Generate routes from roles !! add route table dynamically
            router.addRoutes(store.getters.addRouters)

            const redirect = decodeURIComponent(
              from.query.redirect || to.path)

            if (to.path === redirect) {
              // HACK: ensure addRoutes is done,
              // set the replace: true so the navigation will not
              // leave a history record
              next({ ...to, replace: true })
            } else {
              next({ path: redirect })
            }
          })
        }).catch((e) => {
          console.log('permission, GetInfo raise', e)
          notification.error({
            message: 'Error',
            description: 'Request user info failed, please retry.'
          })

          store.dispatch('Logout').then(() => {
            next({ path: '/user/login', query: { redirect: to.fullPath } })
          })
        })
      } else {
        console.log('getters.roles have length !')
        next()
      }
    }
  } else {
    console.log("Vue.ls token not found")
    if (whiteList.includes(to.name)) {
      // if name is in whitelist
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      // if current page is login will not trigger afterEach hook,
      // so manually handle it
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
