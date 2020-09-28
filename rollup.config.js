import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  output: {
    name: 'VueGates',
    file: 'dist/vue-gates.js',
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
  },
  external: ['vue'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    vue({
      css: false,
      template: {
        isProduction: true,
      },
    }),
    buble(),
  ],
};
