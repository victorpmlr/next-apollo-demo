module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    chrome: true,
    safari: true,
    JSX: true,
    React: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
  },
}
