module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/airbnb',
    '@vue/typescript',
    '@vue/typescript/recommended',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/vue',
    'eslint-config-prettier', // disabled conflicting eslint rules for prettier
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    'vue',
    'jest',
  ],
  overrides: [{
      files: [
        '**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-anonymous-default-export': 'error',
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      'newlines-between': 'always'
    }],
    'import/prefer-default-export': 'off',
  },
}
