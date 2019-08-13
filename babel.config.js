module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'ie >= 11'],
        },
      },
    ],
  ],
  // if your use import on Demand, Use this code
  // ,
  // plugins: [
  //   [ 'import', {
  //     'libraryName': 'ant-design-vue',
  //     'libraryDirectory': 'es',
  //     'style': true // `style: true` 会加载 less 文件
  //   } ]
  // ]
}
