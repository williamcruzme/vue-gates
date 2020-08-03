import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/vue-gates.js',
  output: {
    name: 'VueGates',
    env: 'production',
    format: 'umd',
    file: 'dist/vue-gates.js',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
