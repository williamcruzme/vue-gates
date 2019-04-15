import babel from 'rollup-plugin-babel';

export default {
  input: 'src/laravel-permissions.js',
  output: [
    {
      name: 'LaravelPermissions',
      file: 'dist/laravel-permissions.js',
      format: 'umd',
    },
    {
      file: 'dist/laravel-permissions.min.js',
      format: 'cjs',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
