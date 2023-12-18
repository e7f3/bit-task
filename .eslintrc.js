const esRules = {
  'import/order': [
    'error',
    {
      groups: [
        ['external', 'builtin'],
        'internal',
        ['sibling', 'parent'],
        'index',
      ],
      pathGroups: [
        {
          pattern: '@react',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@src/**',
          group: 'internal',
        },
      ],
      pathGroupsExcludedImportTypes: ['internal', 'react'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
  'simple-import-sort/exports': 'error',
  semi: 'off',
  'react/function-component-definition': [
    2,
    {
      namedComponents: ['arrow-function', 'function-declaration'],
      unnamedComponents: ['arrow-function', 'function-expression'],
    },
  ],
  'jsx-quotes': ['error', 'prefer-single'],
  'react/jsx-filename-extension': [2, { extensions: ['.tsx', '.jsx', '.js'] }],
  'import/no-unresolved': 'off',
  'react/require-default-props': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'warn',
  'import/extensions': 'off',
  'import/prefer-default-export': 'off',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  'react/jsx-props-no-spreading': 'warn',
  'no-underscore-dangle': 'off',
  'import/no-import-module-exports': 'off',
  'max-len': [
    2,
    {
      ignoreComments: true,
      ignoreUrls: true,
      code: 140,
      ignorePattern: '^(import\\s.+\\sfrom\\s.+|\\} from)',
    },
  ],
  '@typescript-eslint/no-var-requires': 'warn',
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error', { enums: false }],

  '@typescript-eslint/naming-convention': 'warn',
  'react/display-name': 'off',
  'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
  'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  'jsx-a11y/click-events-have-key-events': 'warn',
  'jsx-a11y/no-static-element-interactions': 'warn',
  'jsx-a11y/no-noninteractive-element-interactions': 'warn',
  // 'no-param-reassign': 'off',
  'no-param-reassign': ['warn', { props: false }],
  '@typescript-eslint/ban-ts-comment': 'warn',
  'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
  'react/prop-types': 'off',
  'no-nested-ternary': 'off',
  'no-else-return': 'off',
  'implicit-arrow-linebreak': 'off',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
    'import',
    'react-hooks',
    'simple-import-sort',
  ],
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: esRules,
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'consistent-return': 'off',
      },
    },
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['**/src/**/*.{tsx,jsx}'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
}
