import baseConfig from '@repo/eslint-config/base';
import expoConfig from 'eslint-config-expo/flat.js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    extends: [expoConfig],
    rules: {
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
  {
    extends: [baseConfig],
    ignores: ['eslint.config.mjs'],
    rules: {
      'unicorn/no-array-sort': 'off', // https://github.com/facebook/hermes/pull/1298
    },
  },
]);
