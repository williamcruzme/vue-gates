import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/laravel-permissions.js',
  output: {
    name: 'LaravelPermissions',
    env: 'production',
    format: 'umd',
    file: 'dist/laravel-permissions.js',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
