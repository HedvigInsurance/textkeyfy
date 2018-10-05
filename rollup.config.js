import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const plugins = [
  resolve(),
  typescript({
    exclude: ['node_modules', '**/*.test.ts'],
  }),
  terser(),
  commonjs(),
]
const external = ['react', 'react-apollo', 'graphql-tag']

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'package',
      file: pkg.browser,
      format: 'umd',
    },
    plugins,
    external,
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins,
    external,
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.module, format: 'es' }],
    plugins,
    external,
  },
]
