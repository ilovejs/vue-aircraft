import Vue from 'vue'
import VueStorage from 'vue-ls'

// lazy version is in components_use.js
import Antd from 'ant-design-vue'
import {notification} from 'ant-design-vue'

import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext libs
import VueClipboard from 'vue-clipboard2'
import config from '@/config/defaultSettings'
import PermissionHelper from '@/utils/helper/permission'
// ?
// import '@/components/use'
import './directives/action'


// Config
VueClipboard.config.autoSetContainer = true

// https://vue.ant.design/components/notification/
notification.config({
  duration: 5,
  placement: 'bottomLeft'
})

// ?
Vue.use(Antd)

Vue.use(Viser)
Vue.use(VueStorage, config.storageOptions) // refer to config above
Vue.use(VueClipboard)
Vue.use(PermissionHelper)

// ?
Vue.use(VueCropper)
