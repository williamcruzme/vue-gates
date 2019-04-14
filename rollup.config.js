import babel from 'rollup-plugin-babel';

export default {
  input: 'src/laravel-permissions.js',
  output: [
    {
      file: 'dist/laravel-permissions.js',
      format: 'umd',
    },
    {
      name: 'LaravelPermissions',
      file: 'dist/laravel-permissions.min.js',
      format: 'cjs',
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
