import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import packageJson from './package.json' 

const env = process.env.NODE_ENV
const banner =`
  /*!
   * ${packageJson.name} v${packageJson.version}
   * (c) 2018-${new Date().getFullYear()} Rui Chengping
   */`
const config = {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'Dttrace',
    banner
  },
  plugins: [
    babel({
      exclude: '**/node_modules/**'
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config;