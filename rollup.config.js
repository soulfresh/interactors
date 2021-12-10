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
    resolve(),
    commonjs({
      include: ["node_modules/**"],
      namedExports: {
        "lodash.isequal": [
          "isEqual",
        ],
        "@interactors/globals": [
          "globals"
        ]
      }
    }),
    // babel({
    //   babelHelpers: 'bundled',
    //   // TODO Get this working with:
    //   // babelHelpers: 'runtime',
    //   exclude: 'node_modules/**'
    // }),
  ],
}
