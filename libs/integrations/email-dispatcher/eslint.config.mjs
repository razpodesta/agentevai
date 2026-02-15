/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintEmailDispatcherRules
 * @protocol OEDP-V6.5
 */

import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      /** 
       * @section SOBERANIA_DE_REINO
       * Adaptadores de Integração só podem olhar para Foundation. 
       * Proibido importar de Realms ou Orchestration (Circular Avoidance).
       */
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:integrations',
              onlyDependOnLibsWithTags: ['scope:foundation']
            }
          ]
        }
      ]
    }
  }
];