import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';

const pkg = require('./package.json');

const libraryName = pkg.name;
const external = Object.keys(pkg.depenencies || {});
const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Gavin Hao
  * @license Apache License 2.0
  */`;

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      banner,
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner,
      globals: {
        vue: 'Vue',
      },
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [...external],
  banner,
  watch: {
    include: 'src/**',
  },

  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: `"${pkg.version}"`,
        __DEV__: `${process.env.NODE_ENV !== 'production'}`,
      },
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // automatically adding a library's peerDependencies to the external configuration.
    peerDepsExternal(),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
