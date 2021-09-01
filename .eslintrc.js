module.exports = {
  root: true,
  extends: ['@react-native-community'],
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
        'no-restricted-globals': 'off',
        'array-callback-return': 'off',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-extra-boolean-cast': 'off',
        'no-undef': 'off',
      },
      // rules: {
      //   'no-undef': 'off',
      // },
    },
  ],
};
