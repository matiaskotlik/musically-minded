import path from 'node:path';

const buildNextLintCommand = (filenames) =>
  `pnpm lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

export default {
  '*': ['pnpm format --ignore-unknown --', buildNextLintCommand],
};
