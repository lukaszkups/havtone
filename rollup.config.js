import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const plugins = [typescript({ tsconfig: './tsconfig.json' }), terser()];

export default [
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.esm.js', format: 'esm' },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.umd.js', format: 'umd', name: 'havtone', exports: 'default' },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.iife.js', format: 'iife', name: 'havtone', exports: 'default' },
    plugins,
  },
];
