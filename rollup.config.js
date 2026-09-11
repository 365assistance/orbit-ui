import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    // Map the `@/` alias to src/ (mirrors tsconfig paths).
    alias({
      entries: [{ find: /^@\/(.*)$/, replacement: path.resolve(__dirname, 'src/$1') }],
    }),
    resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] }),
    commonjs(),
    // Official Rollup TS plugin — integrates into the transform pipeline so
    // `type`-only imports and .tsx compile before Rollup's parser sees them.
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.stories.tsx', 'node_modules'],
    }),
    // Any CSS a component imports directly gets injected. The standalone
    // token layer (tokens.css) is copied to dist/styles.css by build:css
    // (consumers import '@365assistance/orbit-ui/styles.css' once at app root).
    postcss({ inject: true, minimize: true }),
  ],
  // React is a peer dep — never bundle it (avoids duplicate React instances).
  external: ['react', 'react-dom', 'react/jsx-runtime'],
};
