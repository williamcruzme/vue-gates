import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/laravel-permissions.js',
  output: {
    name: 'LaravelPermissions',
    env: 'production',
    format: 'umd',
    file: 'dist/laravel-permissions.js',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
