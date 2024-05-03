module.exports = {
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    env: {
      es6: true,
      node: true,
      browser: true,
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    parser: "babel-eslint",
    ignorePatterns: ['/node_modules/**', '/build/**', '/public/**', '/src/assets/**'],
    rules: {
      'no-unused-vars': ['warn', { args: 'none', argsIgnorePattern: 'req|res|next|val' }],
      'react/prop-types': "off",
      'react/jsx-no-undef': 'warn',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-key': 'warn',
      'prettier/prettier': ['error'],
    },  settings: {
      react: {
        version: 'detect',
      },
    },
};