import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginJest from 'eslint-plugin-jest'
import pluginPrettier from "eslint-plugin-prettier/recommended";


export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  pluginJest.configs['flat/recommended'],
  pluginPrettier
]
