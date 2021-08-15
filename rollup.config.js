import commonjs from 'rollup-plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import eslint from 'rollup-plugin-eslint'
import json from '@rollup/plugin-json'
import image from 'rollup-plugin-img'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace' // 变量替换，可以将动态设置的变量提取出来在配置文件中设置
import serve from 'rollup-plugin-serve'
import myExample from './rollup/rollup-plugin-my-example'
const { BUILD } = process.env
// const minified = MINIFY === 'true'
const production = BUILD === 'production'
export default {
  input: './src/index.js',
  output: {
    name: 'index',
    file: './dist/index.umd.min.js',
    format: 'umd',
    sourcemap: production ? false : 'inline',
    indent: false,
    intro: 'var global = typeof self !== undefined ? self : this;'
  },
  plugins: [
    myExample(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(
      {
        namedExports: {
          './node_modules/lodash/lodash.js': ['deepClone']
        },
        ignoreGlobal: true
      }
    ),
    json(),
    BUILD === 'lint' && eslint({
      include: ['./src/*.js']
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    image({
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 30000,
      exclude: 'node_modules/**'
    }),
    sourcemaps(),
    BUILD === 'production' && terser({
      compress: {
        pure_getters: true,
        passes: 3
      }
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    BUILD === 'dev' && serve({
      open: false, // 是否打开浏览器
      historyApiFallback: true,
      contentBase: './', // 服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020 // 端口号，默认10001
    })
  ]
}
