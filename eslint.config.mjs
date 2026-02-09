/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintSovereignRules
 * @version 2.7.0
 * @protocol OEDP-V5.5.2 - High Precision Boundaries & Linguistic Sovereignty
 * @description Constituição mestre de linting e policiamento de fronteiras do ecossistema Agentevai.
 * Saneado para orquestração multi-reino e erradicação absoluta de radiação técnica.
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
      /* --- 🧬 ESTRATÉGIA ZERO-ANY (MANIFESTO 0005) --- */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_' 
        },
      ],
      'prefer-const': 'error',

      /**
       * @section NX MODULE BOUNDARIES
       * @description Define as leis de importação entre Reinos, Integrações e Alicerces.
       * Hierarquia de Soberania: Apps -> Orchestration -> Realms -> Integrations -> Foundation.
       */
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              /** ALICERCE (Foundation): Pureza absoluta. Não depende de ninguém. */
              sourceTag: 'scope:foundation',
              onlyDependOnLibsWithTags: ['scope:foundation'],
            },
            {
              /** INTEGRAÇÕES: Adaptadores Hexagonais. Dependem apenas da base. */
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
              /** REINO IDENTIDADE: Gestão de Cidadania e Autoridade. */
              sourceTag: 'scope:identity',
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
              /** 
               * REINO DENÚNCIAS: O Coração da fiscalização. 
               * @section NIVELAMENTO_V5.5.2: Autorizado a consumir Identidade e Governança.
               */
              sourceTag: 'scope:complaints',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
                'scope:community', // Para CitizenAuraCard
                'scope:governance' // Para PopularSupportTrigger
              ],
            },
            {
              /** REINO GOVERNANÇA: Selagem de fé pública e imutabilidade. */
              sourceTag: 'scope:governance',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:complaints',
                'scope:geography',
              ],
            },
            {
              /** REINO COMUNIDADE: Interação Social e Engajamento. */
              sourceTag: 'scope:community',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:identity',
              ],
            },
            {
              /** REINO MARKETING & ADVERTISING: Conversão e Sustentabilidade. */
              sourceTag: 'scope:marketing',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
              ],
            },
            {
              /** FERRAMENTARIA (Tools): Automação de engenharia. */
              sourceTag: 'scope:tools',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
              ],
            },
            {
              /** BÓVEDA DE PERÍCIA (QA): Auditoria Forense Total. */
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
              /** APLICAÇÕES: Pontas de lança. Consumidores finais da malha. */
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],

      /* --- 📜 POLÍTICA ZERO-ABBREVIATIONS (MANIFESTO 0002) --- */
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclarator[id.name='id'], Parameter[name='id'], Property[key.name='id']",
          message: "Abreviação proibida: Use 'identifier' em vez de 'id' (exceto em UUIDs técnicos internos).",
        },
        {
          selector: "VariableDeclarator[id.name='req'], Parameter[name='req']",
          message: "Abreviação proibida: Use 'request' em vez de 'req'.",
        },
        {
          selector: "VariableDeclarator[id.name='res'], Parameter[name='res']",
          message: "Abreviação proibida: Use 'response' em vez de 'res'.",
        },
        {
          selector: "VariableDeclarator[id.name='val'], Parameter[name='val']",
          message: "Abreviação proibida: Use 'value' em vez de 'val'.",
        },
        {
          selector: "VariableDeclarator[id.name='params'], Parameter[name='params']",
          message: "Abreviação proibida: Use 'parameters' em vez de 'params'.",
        },
        {
          selector: "VariableDeclarator[id.name='err'], Parameter[name='err']",
          message: "Abreviação proibida: Use 'error' em vez de 'err'.",
        },
        {
          selector: "VariableDeclarator[id.name='msg'], Parameter[name='msg']",
          message: "Abreviação proibida: Use 'message' em vez de 'msg'.",
        },
        {
          selector: "VariableDeclarator[id.name='props'], Parameter[name='props']",
          message: "Abreviação proibida: Use 'properties' em vez de 'props'.",
        },
        {
          selector: "VariableDeclarator[id.name='ctx'], Parameter[name='ctx']",
          message: "Abreviação proibida: Use 'context' em vez de 'ctx'.",
        },
        {
          selector: "VariableDeclarator[id.name='ref'], Parameter[name='ref']",
          message: "Abreviação proibida: Use 'reference' em vez de 'ref'.",
        },
        {
          selector: "VariableDeclarator[id.name='intl'], Parameter[name='intl']",
          message: "Abreviação proibida: Use 'internationalization' em vez de 'intl'.",
        },
        {
          selector: "VariableDeclarator[id.name='auth'], Parameter[name='auth']",
          message: "Abreviação proibida: Use 'authentication' em vez de 'auth'.",
        },
      ],
    },
  },
];