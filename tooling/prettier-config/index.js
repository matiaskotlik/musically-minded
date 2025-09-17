/// <reference types="./types.d.ts" />

import * as prettierPluginTailwindcss from 'prettier-plugin-tailwindcss';
import prettierPluginSql from 'prettier-plugin-sql';
import prettierPluginToml from 'prettier-plugin-toml';
import * as prettierPluginPackagejson from 'prettier-plugin-packagejson';
import * as prettierPluginSh from 'prettier-plugin-sh';

import { execSync } from 'node:child_process';

/** @type import('prettier').Plugin */
const prettierPluginBlack = {
  languages: [
    {
      aceMode: 'text',
      extensions: ['.py'],
      linguistLanguageId: 303,
      name: 'Python',
      parsers: ['black'],
      tmScope: 'source.py',
      vscodeLanguageIds: ['python'],
    },
  ],
  parsers: {
    black: {
      astFormat: 'black',
      parse(text) {
        return text;
      },
      locStart: function () {
        throw new Error('Function not implemented.');
      },
      locEnd: function () {
        throw new Error('Function not implemented.');
      },
    },
  },
  printers: {
    black: {
      print(path, options) {
        let black;
        try {
          black = execSync('which black', { encoding: 'utf8' }).trimEnd();
        } catch {
          // If black is not installed, we use pipx to run it
          black = 'pipx run black';
        }

        return execSync(`${black} -q -l ${options.printWidth} -`, {
          encoding: 'utf8',
          input: path.node,
        });
      },
    },
  },
};

/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: [
    prettierPluginTailwindcss,
    prettierPluginSql,
    prettierPluginToml,
    prettierPluginPackagejson,
    prettierPluginSh,
    prettierPluginBlack,
  ],
  trailingComma: 'es5',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
};

/** @type {import('prettier-plugin-tailwindcss').PluginOptions} */
const prettierPluginTailwindConfig = {
  tailwindFunctions: ['clsx', 'cva', 'cn', 'twc', 'tw', 'style'],
  tailwindAttributes: ['className'],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: 'postgresql',
  keywordCase: 'lower',
  dataTypeCase: 'lower',
  functionCase: 'lower',
  identifierCase: 'lower',
};

export default {
  ...prettierConfig,
  ...prettierPluginTailwindConfig,
  ...prettierPluginSqlConfig,
};
