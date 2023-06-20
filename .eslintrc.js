module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'eslint-disable-next-line': 'off',
    'eslint-disable quotes': 'off',
    'eslint-disable': 'off',
    'eslint-disable semi': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
