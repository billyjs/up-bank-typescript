import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      name: 'Up',
      file: pkg.browser,
      format: 'umd',
      globals: {
        fetch: 'fetch',
      },
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    nodePolyfills(),
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
