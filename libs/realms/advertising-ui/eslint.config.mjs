/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintAdvertisingRules
 */

import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      /** 
       * @section Erradicação de Abreviações
       * Proibido o uso de 'ad' (Abreviação). Use 'advertisement' ou 'promotion'.
       */
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclarator[id.name='ad']",
          message: "Abreviação proibida: Use 'advertisement' ou 'campaignIdentifier'."
        }
      ]
    },
  },
];