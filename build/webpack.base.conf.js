'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
 // 雪碧图--1、创建一个对象
const SpritesmithPlugin = require('webpack-spritesmith')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
const templateFunction = function (data) {
  // console.log(data.sprites);
  const shared = '.w-icon { background-image: url(I); }'
    .replace('I', data.sprites[0].image);
  // 注意：此处默认图标使用的是二倍图
  const perSprite = data.sprites.map(function (sprite) {
    // background-size: SWpx SHpx;
    return '.w-icon-N { width: SWpx; height: SHpx; }\n.w-icon-N .w-icon, .w-icon-N.w-icon { width: Wpx; height: Hpx; background-position: Xpx Ypx; margin-top: -SHpx; margin-left: -SWpx; display: inline-block;} '
      .replace(/N/g, sprite.name)
      .replace(/SW/g, sprite.width / 2)
      .replace(/SH/g, sprite.height / 2)
      .replace(/W/g, sprite.width)
      .replace(/H/g, sprite.height)
      .replace(/X/g, sprite.offset_x)
      .replace(/Y/g, sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
};

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  plugins: [  // 从这里开始写配置
    new SpritesmithPlugin({
      // 目标小图标
      src: {
        cwd: path.resolve(__dirname, '../static/img'),
        glob: '*.png'
      },
      // 输出雪碧图文件及样式文件存放位置
      target: {
        image: path.resolve(__dirname, '../static/cssSprite/Sprite.png'),
        css: [
          [path.resolve(__dirname, '../static/cssSprite/Sprite.css'), {
            format: 'function_based_template'
          }]
        ]
        // css: path.resolve(__dirname, '../static/cssSprite/Sprite.css')
      },
      customTemplates: {
        'function_based_template': templateFunction,
      },
      // css样式文件中调用雪碧图地址写法
      apiOptions: {
        cssImageRef: './Sprite.png'
      },
      spritesmithOptions: {
        algorithm: 'binary-tree',
        padding: 4
        // 具体参数参考：https://github.com/twolfson/layout#algorithms
      }
    })
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
