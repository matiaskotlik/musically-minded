import { defineConfig, globalIgnores } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import expoConfig from 'eslint-config-expo/flat';

module.exports = defineConfig([
  includeIgnoreFile(path.join(import.meta.dirname, '../../.gitignore')),
  expoConfig
]);

