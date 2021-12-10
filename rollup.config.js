import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from "rollup-plugin-commonjs";
import glob from 'glob';

import pkg from './package.json';

const inputs = glob.sync('src/**/!(*.test|setupTests|index).?(js|jsx)')
  .filter(f => f.indexOf('example') === -1);

console.log('---- OUTPUTS ----');
console.log(inputs);

const external = Object.keys(pkg.peerDependencies || {})
  .concat(Object.keys(pkg.optionalDependencies || {}));

console.log('--- EXTERNALS ---');
console.log(external);

module.exports = {
  input: ['src/index.js'].concat(inputs),
  external: external,
  output: [{
    dir: 'lib/esm',
    format: 'esm',
  }, {
    dir: 'lib/cjs',
    format: 'cjs',
  }],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
    })
  ],
}
