import globals from 'globals';

export default [{
  files: ['src/**/*.{js,jsx}'],
  languageOptions: {
    globals: { ...globals.browser, ...globals.es2021 },
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  rules: { 'no-undef': 'error' },
}];
