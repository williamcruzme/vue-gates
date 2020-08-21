import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'VueGates',
      env: 'production',
      format: 'umd',
      file: 'dist/vue-gates.js',
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  },
];
