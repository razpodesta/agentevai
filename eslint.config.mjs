/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintSovereignRules
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Zenith Editorial Stabilization
 * @description Constituição suprema de linting. Define as fronteiras diplomáticas
 * entre Reinos (Realms) e garante a pureza do ADN técnico (Zero Abbreviations).
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy BOUNDARY-SOVEREIGNTY: Policiamento estrito de dependências via Nx.
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
      /* --- 🛡️ SEÇÃO 1: SOBERANIA DE TIPAGEM (ZERO ANY) --- */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        },
      ],
      'prefer-const': 'error',

      /* --- 🧱 SEÇÃO 2: POLICIAMENTO DE FRONTEIRAS (NX BOUNDARIES) --- */
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:foundation',
              onlyDependOnLibsWithTags: ['scope:foundation']
            },
            {
              sourceTag: 'scope:integrations',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations'
              ],
            },
            {
              sourceTag: 'scope:geography',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations'
              ],
            },
            {
              sourceTag: 'scope:identity',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations'
              ],
            },
            {
              sourceTag: 'scope:community',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:identity'
              ],
            },
            {
              sourceTag: 'scope:news',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
                'scope:identity',
                'scope:community'               ],
            },
            {
              sourceTag: 'scope:complaints',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:geography',
                'scope:community',
                'scope:governance',
                'scope:identity'
              ],
            },
            {
              sourceTag: 'scope:governance',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations',
                'scope:complaints',
                'scope:geography',
                'scope:identity',
                'scope:community'
              ],
            },
            {
              sourceTag: 'scope:marketing',
              onlyDependOnLibsWithTags: [
                'scope:foundation',
                'scope:integrations'
              ],
            },
            {
              sourceTag: 'scope:orchestration',
              onlyDependOnLibsWithTags: ['*']
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*']
            },
          ],
        },
      ],

      /* --- 💎 SEÇÃO 3: HIGIENE FORENSE (ZERO ABBREVIATIONS) --- */
      'no-restricted-syntax': [
        'error',
        /* Erradicação de identificadores técnicos curtos (Radiação Técnica) */
        {
          selector: "VariableDeclarator[id.name='id'], Parameter[name='id'], Property[key.name='id'], AssignmentProperty[key.name='id']",
          message: "Abreviação proibida: Use 'identifier' em vez de 'id'.",
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
          selector: "VariableDeclarator[id.name='props'], Parameter[name='props'], Property[key.name='props']",
          message: "Abreviação proibida: Use 'properties' em vez de 'props'.",
        },
        {
          selector: "VariableDeclarator[id.name='ctx'], Parameter[name='ctx']",
          message: "Abreviação proibida: Use 'context' em vez de 'ctx'.",
        },
        /* Erradicação de termos UI genéricos e callbacks amorfos */
        {
          selector: "VariableDeclarator[id.name='btn'], Parameter[name='btn']",
          message: "Abreviação proibida: Use 'button' ou 'actionTrigger'.",
        },
        {
          selector: "VariableDeclarator[id.name='alt'], Parameter[name='alt']",
          message: "Abreviação proibida: Use 'alternateText' para acessibilidade soberana.",
        },
        {
          selector: "VariableDeclarator[id.name='cb'], Parameter[name='cb']",
          message: "Abreviação proibida: Use 'callback' ou 'handler'.",
        },
        {
          selector: "VariableDeclarator[id.name='t'], Parameter[name='t']",
          message: "Abreviação proibida: Use 'translate' ou 'translateLabel'.",
        }
      ],
    },
  },
];
