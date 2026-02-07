// libs/realms/identity-domain/eslint.config.mjs

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintIdentityRules
 * @description Aplica o policiamento estrito de dependências para o domínio de identidade.
 */

import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}']
        }
      ]
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser')
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      // Regra de Ouro: Domínios não podem importar de UI ou Orchestration (Circular avoidance)
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:identity',
              onlyDependOnLibsWithTags: ['scope:foundation', 'scope:integrations']
            }
          ]
        }
      ]
    }
  }
];