/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintSovereignRules
 * @version 2.6.1
 * @protocol OEDP-V5.5.2 - High Precision Boundaries
 * @description Constituição mestre de linting e policiamento de fronteiras.
 * Saneado para integrar Reinos de Marketing, Auditoria Forense (QA) e fix de sintaxe.
 */

import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/public/locales',
      '**/.next',
      '**/node_modules',
      '**/vite.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      /* --- ESTRATÉGIA ZERO-ANY (MANIFESTO 0005) --- */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'prefer-const': 'error',

      /**
       * @section NX MODULE BOUNDARIES
       * @description Define as leis de importação entre Reinos e Alicerces.
       * Hierarquia Suprema: Apps -> Orchestration -> Realms -> Integrations -> Foundation.
       */
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              /** ALICERCE: Pureza absoluta. */
              sourceTag: 'scope:foundation',
              onlyDependOnLibsWithTags: ['scope:foundation'],
            },
            {
              /** INTEGRAÇÕES: Adaptadores Hexagonais. */
              sourceTag: 'scope:integrations',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
              ],
            },
            {
              /** REINO GEOGRAFIA: Inteligência territorial. */
              sourceTag: 'scope:geography',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
              ],
            },
            {
              /** REINO NOTÍCIAS: Fluxo editorial regional. */
              sourceTag: 'scope:news',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
              ],
            },
            {
              /** REINO DENÚNCIAS: Coração da fiscalização. */
              sourceTag: 'scope:complaints',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
              ],
            },
            {
              /** REINO GOVERNANÇA: Selagem de fé pública. */
              sourceTag: 'scope:governance',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:complaints',
                'scope:geography',
              ],
            },
            {
              /** REINO COMUNIDADE: Interação Social. Depende de Identidade. */
              sourceTag: 'scope:community',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:identity',
              ],
            },
            {
              /** REINO IDENTIDADE: Gestão de Cidadania e Autoridade. */
              sourceTag: 'scope:identity',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
              ],
            },
            {
              /**
               * REINO MARKETING & ADVERTISING: Conversão e Sustentabilidade.
               */
              sourceTag: 'scope:marketing',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
              ],
            },
            {
              /**
               * BÓVEDA DE PERÍCIA (QA): Auditoria Forense Total.
               */
              sourceTag: 'scope:qa',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              /** ORQUESTRAÇÃO: Sistema Nervoso Central. Consome todos os Reinos. */
              sourceTag: 'scope:orchestration',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
                'scope:news',
                'scope:complaints',
                'scope:governance',
                'scope:community',
                'scope:marketing',
                'scope:identity',
              ],
            },
            {
              /** APLICAÇÕES: Pontas de lança. Consumidores finais. */
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],

      /* --- POLÍTICA ZERO-ABBREVIATURAS (MANIFESTO 0002) --- */
      'no-restricted-syntax': [
        'error', // FIX: Nível de severidade injetado para autorizar o parsing do Nx.
        {
          selector: "VariableDeclarator[id.name='id']",
          message:
            "Abreviação proibida: Use 'identifier' em vez de 'id' (exceto em UUIDs técnicos internos).",
        },
        {
          selector:
            "VariableDeclarator[id.name='req'], VariableDeclarator[id.name='res']",
          message: "Abreviação proibida: Use 'request' ou 'response'.",
        },
        {
          selector:
            "VariableDeclarator[id.name='val'], VariableDeclarator[id.name='params']",
          message: "Abreviação proibida: Use 'value' ou 'parameters'.",
        },
        {
          selector:
            "VariableDeclarator[id.name='err'], VariableDeclarator[id.name='msg']",
          message: "Abreviação proibida: Use 'error' ou 'message'.",
        },
      ],
    },
  },
];
