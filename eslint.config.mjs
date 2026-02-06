import nx from '@nx/eslint-plugin';

/**
 * Raz Podestá - MetaShark Tech
 * Global Linting Configuration Agentevai
 * Foco: Erradicação absoluta de ANY e ABREVIAÇÕES.
 */
export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/public/locales'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // Erradicação de Any
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      /**
       * @section Regras de Nomenclatura Soberana
       * Proíbe abreviações comuns para forçar Prosa Técnica.
       */
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclarator[id.name='id'], VariableDeclarator[id.name='req'], VariableDeclarator[id.name='res'], VariableDeclarator[id.name='val']",
          message: "Abreviações não são permitidas. Use 'identifier', 'request', 'response' ou 'value'.",
        },
      ],
    },
  },
];