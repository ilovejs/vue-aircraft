English | [简体中文](./README.zh-CN.md)

<h1 align="center">Ant Design Pro Vue</h1>

<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>

<div align="center">

[![Backers on Open Collective](https://opencollective.com/ant-design-pro-vue/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/ant-design-pro-vue/sponsors/badge.svg)](#sponsors) [![License](https://img.shields.io/npm/l/package.json.svg?style=flat)](https://github.com/sendya/ant-design-pro-vue/blob/master/LICENSE)
[![Release](https://img.shields.io/github/release/sendya/ant-design-pro-vue.svg?style=flat)](https://github.com/sendya/ant-design-pro-vue/releases/latest)
[![Travis branch](https://travis-ci.org/sendya/ant-design-pro-vue.svg?branch=master)](https://travis-ci.org/sendya/ant-design-pro-vue)

</div>

- Preview: https://preview.pro.loacg.com
- Home Page: https://pro.loacg.com
- Documentation: https://pro.loacg.com/docs/getting-started
- ChangeLog: https://pro.loacg.com/docs/changelog
- FAQ: https://pro.loacg.com/docs/faq
- Branches: 
  - demo/router-view-table: CRUD view in router
  - feature/demand_load: loaded on demand
  - feature/lang: i18n support
  - feature/dynamic-menu: dynamic menu demo
  - lite: lite template (legacy)


Overview
----

![dashboard + multi-tabs](https://static-2.loacg.com/open/static/github/20190224163345.jpg)

![dashboard + setting](https://static-2.loacg.com/open/static/github/20181126112124.png)

![user profile](https://static-2.loacg.com/open/static/github/20180916-134251.png)

![permission list](https://static-2.loacg.com/open/static/github/20180916-154937.png)


### Env and dependencies

- node
- yarn
- webpack
- eslint
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - Picture edit
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - AntV G2
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - Antv/G2 of Vue
- [Vue.ls](https://github.com/RobinCK/vue-ls) - plugin for local storage
> Note:  [Yarn](https://yarnpkg.com/) package management is recommended, the exact same version loaded with the demo site of this project (yarn.lock) . but you can also use npm


### Project setup

- Clone repo
```bash
git clone https://github.com/sendya/ant-design-pro-vue.git
cd ant-design-pro-vue
```

- Install dependencies
```
yarn install
```

- Compiles and hot-reloads for development
```
yarn run serve
```

- Compiles and minifies for production
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```


### Other

- **IMPORTANT : About Issue feedback !! when opening Issue read [Issue / PR Contributing](https://github.com/sendya/ant-design-pro-vue/issues/90)**

- [Vue-cli3](https://cli.vuejs.org/guide/) used by the project.
- Disable Eslint (not recommended): remove `eslintConfig`  field in `package.json`  and `vue.config.js` field `lintOnSave: false`

- Load on Demand: modify `/src/main.js` L14,  replace to `import './core/lazy_use'` code.

- Customize Theme:  `vue.config.js` 
eg: 
```ecmascript 6
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* Less variables, required modifyVars*/

          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  }
```
- **polyfill**

- remove polyfill: 
  > [Vue CLI Polyfill](https://cli.vuejs.org/zh/guide/browser-compatibility.html#usebuiltins-usage)
  
  - remove `import '@babel/polyfill'`  field in  `src/main.js`
  - `babel.conflg.js` remove
    ```ecmascript 6
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
    ```

## Browsers support

Modern browsers and IE10.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE10, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## i18n

(example)[https://github.com/kazupon/vue-i18n/issues/108]

(codepen)[https://jsfiddle.net/2av8r31w/3/]

## Issues

* The project is not following vue-cli project template. Type inference failed with webstorm *.js 

[Should update the project for IDE support:](https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000556284-vue-import-component-Module-is-not-installed-)

* Timeout on websocket, check socketio.js in console... result is blank screen.

  GET http://10.0.75.1:8000/sockjs-node/info?t=1562569252925 net::ERR_CONNECTION_REFUSED

## Vue UI

```
vue ui
```

## IDE library path inference for Webpack 

Mouse click import string redirect to true file path, rather than yellow warning line.

[Pick the right webpack.config.js](https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config)

## TS compiler options

https://www.typescriptlang.org/docs/handbook/compiler-options.html

## eslint
"extends": [
        "airbnb-base",
        // "plugin:vue/recommended"
        "plugin:vue/strongly-recommended"
        // "@vue/standard"
    ],
    
# 
warning package-lock.json found. Your project contains lock files generated by tools other than Yarn. It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. To clear this warning, remove package-lock.json.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "ant-design-vue > @ant-design/icons-vue@1.0.1" has incorrect peer dependency "@ant-design/icons@~1.1.0".
warning "@vue/eslint-config-standard > eslint-plugin-import@2.16.0" has incorrect peer dependency "eslint@2.x - 5.x".
warning " > babel-core@7.0.0-bridge.0" has unmet peer dependency "@babel/core@^7.0.0-0".
warning " > eslint-plugin-vue@5.2.2" has incorrect peer dependency "eslint@^5.0.0".
warning "eslint-plugin-vue > vue-eslint-parser@5.0.0" has incorrect peer dependency "eslint@^5.0.0".
warning " > less-loader@4.1.0" has unmet peer dependency "webpack@^2.0.0 || ^3.0.0 || ^4.0.0".
