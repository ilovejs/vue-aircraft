const PERMISSION_ENUM = {
  add: { key: 'add', label: 'Add' },
  delete: { key: 'delete', label: 'Delete' },
  edit: { key: 'edit', label: 'Edit' },
  query: { key: 'query', label: 'Query' },
  get: { key: 'get', label: 'Get' },
  enable: { key: 'enable', label: 'Enable' },
  disable: { key: 'disable', label: 'Disable' },
  import: { key: 'import', label: 'Import' },
  export: { key: 'export', label: 'Export' },
}

function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  // $auth becomes global variable used in Vue file
  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        const _this = this
        // take permissions as input
        return (permissions) => {
          const [permission, action] = permissions.split('.')
          console.log('helper/permission.js plugin, permissionList copied')
          const permissionList = _this.$store.getters.roles.permissions
          // check permission and action
          // return boolean
          return permissionList.find((val) => val.permissionId === permission).actionList.findIndex((val) => val === action) > -1
        }
      },
    },
  })

  // todo: not used $enum global
  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get() {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach((v) => {
            result = result && result[v] || null
          })
          return result
        }
      },
    },
  })
}

export default plugin
