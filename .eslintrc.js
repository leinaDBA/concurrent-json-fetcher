module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': ['error', { singleQuote: true }],
    'spaced-comment': ['error', 'always', { exceptions: ['*'] }],
  },
  settings: {
    'import/resolver': { node: { extensions: ['.js'] } },
  },
};
