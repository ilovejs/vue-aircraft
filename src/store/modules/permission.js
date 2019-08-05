import { ASYNC_ROUTERS, DEFAULT_ROUTERS } from '@/config/router.config'

/**
 * If route to visit is in role permitted list.
 * Normally used as predicates for filter.
 * @param allowedPermissions - granted permission list
 *                             e.g. ['dashboard','exception']
 * @param routeToVisit       - it could be child route of main route
 * @returns {boolean}
 */
function _hasPermission (allowedPermissions, routeToVisit) {
  // debugger;
  console.log('allowedPermissions', allowedPermissions)
  if (routeToVisit.meta && routeToVisit.meta.permission) {
    let flag = false
    for (let i = 0, len = allowedPermissions.length; i < len; i++) {
      // route permission includes one of the permission
      // e.g. route.permission = 'dashboard' includes 'dashboard',
      // which is permission[0]
      flag = routeToVisit.meta.permission.includes(allowedPermissions[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  // else no meta.permission in url
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function _filterAsyncRouter (routes, roles) {
  return routes.filter(route => {
    //Format: permissionList = ["dashboard","exception","result","profile"]
    //        route = {path: "/", name: "index", component: {…},
    //                 meta: {…}, redirect: "/dashboard/workplace", …
    console.log('_filterAsyncRouter roles: ', roles)
    if (_hasPermission(roles.permissionList, route)) {
      //recursive lookup if route has children
      //see route.config.js for setup e.g. / has children /dashboard /form /..
      if (route.children && route.children.length) {
        //assign back children field for route before return
        route.children = _filterAsyncRouter(route.children, roles)
      }
      //no children and `has permission`
      return true
    }
    return false
  })
}

const permission = {
  state: {
    routers: DEFAULT_ROUTERS,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = DEFAULT_ROUTERS.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        console.log('GenerateRoutes roles:', roles)
        const accessedRouters = _filterAsyncRouter(ASYNC_ROUTERS, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
