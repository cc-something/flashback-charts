import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  // Vue plugin (sets vue-eslint-parser for .vue files)
  ...pluginVue.configs['flat/recommended'],
  // TypeScript plugin (no global parser override)
  { plugins: { '@typescript-eslint': tseslint.plugin } },
  // Parser for .ts files
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tseslint.parser },
  },
  // Parser for <script> inside .vue files
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  // TypeScript rules for both .ts and .vue
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      ...tseslint.configs.recommended[1].rules,
      ...tseslint.configs.recommended[2].rules,
    },
  },
  prettier,
  { rules: { 'vue/multi-word-component-names': 'off' } },
]
