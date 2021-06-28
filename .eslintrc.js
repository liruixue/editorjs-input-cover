module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  rules: {
    'class-methods-use-this': ['off'],
    'linebreak-style': [0, 'error', 'windows'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
  globals: {
    fetch: false,
    document: false,
    FileReader: false,
  },
  env: {
    'jest/globals': true,
  },
};
