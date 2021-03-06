<h1 align="center">Vue Aircraft</h1>
<h5>An out-of-box UI solution for Enterprise data intensive app </h5>
<div align="center">
  
  Built on top of Ant Design UI admin template with:
  
    * improved multi-tab
    * logins
    * pagination async table
    * simplified axois binding (skipped vuex for some cases)
  
  20x built-in customized dashboard components:
  
     List, Charts, CountDown, Editor, Menu, Step Form, Tree, Table, Setting Drawer, Auto complete, Card etc.
     
  
  
  
  UI from:  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>

  Basic template docs:
  
- Preview: https://preview.pro.loacg.com
- Home Page: https://pro.loacg.com
- Online Documentation: https://pro.loacg.com/docs/getting-started
- Local Documentation: https://github.com/sendya/antd-pro-vue-site
- ChangeLog: https://pro.loacg.com/docs/changelog
- FAQ: https://pro.loacg.com/docs/faq
- Branches: 
  - demo/router-view-table: CRUD view in router
  - feature/demand_load: loaded on demand
  - feature/lang: i18n support
  - feature/dynamic-menu: dynamic menu demo
  - lite: lite template (legacy)


### Overview
----

![dashboard + multi-tabs](https://static-2.loacg.com/open/static/github/20190224163345.jpg)

![dashboard + setting](https://static-2.loacg.com/open/static/github/20181126112124.png)

![user profile](https://static-2.loacg.com/open/static/github/20180916-134251.png)

![permission list](https://static-2.loacg.com/open/static/github/20180916-154937.png)


### Env and dependencies

- node
- yarn
- webpack
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

- Load on Demand: modify `/src/main.js` L14,  replace to `import './core/lazy_use'` code.

- Customize Theme:  [Custom Theme Config](https://github.com/kokoroli/antd-awesome/blob/master/docs/Ant_Design_%E6%A0%B7%E5%BC%8F%E8%A6%86%E7%9B%96.md)


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

* Websocket
  
  [sockjs](https://github.com/sockjs) is used by [webpack-dev-server](https://github.com/webpack/webpack-dev-server/issues/1628)
  
  Symptom:
  
    Timeout on websocket, check socketio.js in console... result is blank screen.

    GET http://10.0.75.1:8000/sockjs-node/info?t=1562569252925 net::ERR_CONNECTION_REFUSED

    Other use in same domain local interact can't visit dev server via 192.xx or SYD.LTD.PC1 
    since this server hard-code localhost, no route back.

## Vue UI

```
vue ui
```

## Webpack + IDE 

* library path inference for Webpack 

Mouse click import string redirect to true file path, rather than yellow warning line.

- [Nice]https://medium.com/js-dojo/how-to-configure-webpack-4-with-vuejs-a-complete-guide-209e943c4772

- https://cli.vuejs.org/guide/webpack.html

* More 
  
  https://webpack.js.org/concepts/hot-module-replacement/

  d2-admin 

## TS compiler options

https://www.typescriptlang.org/docs/handbook/compiler-options.html

## Eslint FAQ

* Full scale extends is verbose
"extends": [
        "airbnb-base",
        // "plugin:vue/recommended"
        "plugin:vue/strongly-recommended"
        // "@vue/standard"
    ],
* [Quick guide]https://medium.com/@agm1984/how-to-set-up-es-lint-for-airbnb-vue-js-and-vs-code-a5ef5ac671e8

* for vscode, open console eslint error logs for .json file syntax..

* Vscode plugin:
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint 

## Custom Backend settings

util/request.js
  
    - base_url and axios service, timeout
  
