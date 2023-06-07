module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
