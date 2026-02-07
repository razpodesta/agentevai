/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintSovereignRules
 * @version 2.5.0
 * @description Configuração mestre de linting e regras de fronteira (Boundaries).
 * Implementa o policiamento estrito do protocolo OEDP-V5.5.
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
      '**/node_modules'
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      /* --- ESTRATÉGIA ZERO-ANY (MANIFESTO 0005) --- */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',

      /**
       * @section NX MODULE BOUNDARIES
       * @description Define as leis de importação entre Reinos e Alicerces.
       * A hierarquia deve ser sempre: Apps -> Orchestration -> Realms -> Integrations -> Foundation.
       */
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              /** ALICERCE: Totalmente puro. Não olha para ninguém acima. */
              sourceTag: 'scope:foundation',
              onlyDependOnLibsWithTags: ['scope:foundation']
            },
            {
              /** INTEGRAÇÕES: Adaptadores Hexagonais. Dependem apenas da Base. */
              sourceTag: 'scope:integrations',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations']
            },
            {
              /** REINO GEOGRAFIA: Inteligência territorial. */
              sourceTag: 'scope:geography',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations']
            },
            {
              /** REINO NOTÍCIAS: Depende da Base e Localização. */
              sourceTag: 'scope:news',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations', 'scope:geography']
            },
            {
              /** REINO DENÚNCIAS: O coração do sistema. Depende de Geografia. */
              sourceTag: 'scope:complaints',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations', 'scope:geography']
            },
            {
              /** REINO GOVERNANÇA: Documentos legais. Depende de Denúncias. */
              sourceTag: 'scope:governance',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations', 'scope:complaints', 'scope:geography']
            },
            {
              /** REINO COMUNIDADE: Interação Social. */
              sourceTag: 'scope:community',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations']
            },
            {
              /** ORQUESTRAÇÃO: O Sistema Nervoso. Pode consumir todos os Reinos. */
              sourceTag: 'scope:orchestration',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
                'scope:news',
                'scope:complaints',
                'scope:governance',
                'scope:community'
              ]
            },
            {
              /** APLICAÇÕES: Pontas de lança. Consumidores finais. */
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ],

      /* --- POLÍTICA ZERO-ABREVIATURAS (MANIFESTO 0002) --- */
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclarator[id.name='id']",
          message: "Abreviação proibida: Use 'identifier' em vez de 'id' (exceto em UUIDs técnicos internos)."
        },
        {
          selector: "VariableDeclarator[id.name='req'], VariableDeclarator[id.name='res']",
          message: "Abreviação proibida: Use 'request' ou 'response'."
        },
        {
          selector: "VariableDeclarator[id.name='val'], VariableDeclarator[id.name='params']",
          message: "Abreviação proibida: Use 'value' ou 'parameters'."
        },
        {
          selector: "VariableDeclarator[id.name='err'], VariableDeclarator[id.name='msg']",
          message: "Abreviação proibida: Use 'error' ou 'message'."
        }
      ]
    }
  }
];
