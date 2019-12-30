module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  // extends: [
  //   'airbnb-base',
  // ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // "semi":["error","always"]
    // "semi":["warn","always"]
    "semi":["off","always"],
    "quotes":["warn","double"],
    "no-console":"warn"
  },
};

// off, warn, error