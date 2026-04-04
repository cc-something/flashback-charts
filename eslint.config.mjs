import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]
