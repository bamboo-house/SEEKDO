module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12, //latestから12に変更
    sourceType: 'module',
    tsconfigRootDir: __dirname, //追加 tsconfig.jsonがある相対パスを指定
    project: ['./tsconfig.json'], //追加  tsconfig.jsonを指定
  },
  overrides: [
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports', //追加 使っていないimportを自動で削除用
    'prettier', //追加 ESLintの情報に沿ってフォーマット
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ["error"], //typescript側のno-use-before-defineを使うようにする
    '@typescript-eslint/no-unused-vars': 'off', //unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', //不要なimportの削除
    'unused-imports/no-unused-vars': [ //unused-importsでno-unused-varsのルールを再定義
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'import/extensions': [
      //importのときにファイルの拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/prop-types': 'off', //TypeScriptでチェックしているから不要。offにする
    'react/react-in-jsx-scope': 'off', //import React from 'react'が無くてもエラーを無くす
    'no-void': [ //void演算子の許可
      'error',
      {
        allowAsStatement: true, 
      },
    ],
  },
  settings: {
    'import/resolver': {
      //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
}
