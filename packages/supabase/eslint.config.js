import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';

export default defineConfig([
  includeIgnoreFile(path.join(import.meta.dirname, '../../.gitignore')),
  globalIgnores(['gen/*']),
  eslintJs.configs.recommended,
  // @ts-expect-error typescript-eslint types do not match eslint
  tseslint.configs.strict,
  // @ts-expect-error typescript-eslint types do not match eslint
  tseslint.configs.stylistic,
]);
