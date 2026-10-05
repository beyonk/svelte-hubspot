import recommended from '@beyonk/eslint-config/recommended'
import svelte from '@beyonk/eslint-config/svelte'

export default [
  ...recommended,
  ...svelte({}),
  {
    ignores: [
      '.svelte-kit',
      'dist'
    ]
  }
]
