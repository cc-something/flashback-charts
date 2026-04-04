export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['theme', 'tailwind', 'apply', 'layer', 'config'],
      },
    ],
    'import-notation': null,
  },
}
