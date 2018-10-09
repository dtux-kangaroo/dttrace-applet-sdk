import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {uglify} from 'rollup-plugin-uglify'
import uglifyEs from 'rollup-plugin-uglify-es';
import packageJson from './package.json' 

const formatEnv = process.env.FORMAT_ENV
const compressEnv = process.env.COMPRESS_ENV 
const compresser ={
  uglify,
  uglifyEs
}
const banner =`
  /*!
   * ${packageJson.name} v${packageJson.version}
   * (c) 2018-${new Date().getFullYear()} Rui Chengping
   */`

const config = {
  input: 'src/index.js',
  output: {
    banner
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**'
    }),
    commonjs()
  ]
}

if(formatEnv === 'es' || formatEnv ==='cjs'){
  config.output.format=formatEnv
}

if (compressEnv) {
  config.plugins.push(
    compresser[compressEnv]({
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