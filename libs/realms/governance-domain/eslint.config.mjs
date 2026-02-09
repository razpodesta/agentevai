/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ESLintGovernanceRules
 */

import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      /** 
       * @section Saneamento de Nomenclatura 
       * Proibido o uso de 'sig' (Abreviação). Use 'electronicSignature'.
       */
      'no-restricted-syntax': [
        'error',
        {
          selector: "VariableDeclarator[id.name='sig']",
          message: "Abreviação proibida: Use 'electronicSignatureIdentifier' ou 'merkleProof'."
        }
      ]
    },
  },
];