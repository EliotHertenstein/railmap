module.exports = {
  // parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'plugin:react/all',
    'plugin:react/jsx-runtime',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'plugin:@typescript-eslint',
    'plugin:you-dont-need-momentjs/recommended',
    'prettier',
  ],
  rules: {
    'react/jsx-sort-props': 'error',
    'you-dont-need-momentjs': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-max-depth': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-bind': 'off',
    'react/forbid-component-props': 'off',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/order': [
      'error',
      {
        groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin', 'object', 'type'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
}
