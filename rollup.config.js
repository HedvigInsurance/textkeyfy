import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

const plugins = [typescript()]
const external = []

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'package',
        file: pkg.browser,
        format: 'umd',
        sourcemap: true,
      },
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins,
    external,
  },
]
