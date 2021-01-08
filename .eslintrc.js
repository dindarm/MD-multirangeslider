module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 4,
        multiline: {
          max: 4,
          allowFirstLine: true
        }
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 'warn',
    'no-multiple-empty-lines': 'warn',
    'key-spacing': 'warn',
    'no-undef': 'warn',
    indent: 'warn',
    'no-trailing-spaces': 'warn',
    'eol-last': 'warn',
    'no-constant-condition': 'warn',
    'prefer-const': 'warn',
    semi: 'warn',
    'padded-blocks': 'warn',
    'space-before-function-paren': 'warn',
    'no-unreachable': 'warn',
    'space-infix-ops': 'warn',
    'handle-callback-err': 'warn',
    'object-curly-spacing': 'warn',
    'object-curly-newline': ['warn', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true,
        minProperties: 3
      }
    }],
    'no-multi-spaces': 'warn',
    'space-in-parens': 'warn',
    quotes: 'warn',
    'comma-spacing': 'warn',
    'vue/no-unused-components': 'warn',
    'quote-props': 'warn',
    'no-tabs': 'warn',
    'arrow-spacing': 'warn',
    'object-property-newline': 'warn',
    'vue/no-mutating-props': 'warn'

  }
}
