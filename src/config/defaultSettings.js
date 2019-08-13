/**
 * Global variables for setting
 */

export default {
  primaryColor: '#FA541C', // primary color of ant design, if color not changing, clear localStorage
  navTheme: 'dark', // theme for nav menu, e.g. light
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: false, // sticky siderbar
  autoHideHeader: true, // auto hide header
  colorWeak: false, // for color blind person
  multiTab: true, // useful item
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // vue-ls options [storage]
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name [session, local, memory], localStorage vs sessionStorage
  },
}
