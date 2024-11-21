/** @type {import('eslint').Linter.Config} */
const config = {
    plugins: ['react', 'react-hooks'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    rules: {
        // Özelleştirilmiş kurallarınızı buraya ekleyebilirsiniz
    },
    overrides: [
        {
            files: ['*.jsx', '*.tsx'],
            rules: {
                // React ile ilgili özel kurallar
            },
        },
    ],
};

module.exports = config;
