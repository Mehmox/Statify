/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'
    ],
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    rules: {
        // Özelleştirilmiş kurallarınızı buraya ekleyebilirsiniz
    },
};
  