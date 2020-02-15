// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      // viewportHeight: 568,
      unitPrecision: 2,
      viewportUnit: 'vw',
      selectorBlackList: ['weui', 'iview'], // iview内的组件不转换
      minPixelValue: 1,
      mediaQuery: true,
      // 横屏时使用的单位
      landscapeUnit: 'vh',
      // 横屏时使用的视口宽度
      landscapeWidth: 1334
    }
  },
}
