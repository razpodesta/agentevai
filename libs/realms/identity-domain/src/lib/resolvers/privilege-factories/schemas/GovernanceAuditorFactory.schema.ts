/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactorySchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Precision
 * @description ADN de fronteira para a fábrica de auditores governamentais.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica.
 */

import { z } from 'zod';
import {
  IdentityAssuranceLevelSchema,
  ReputationScoreSchema
} from '../../../schemas/UserIdentity.schema.js';

/**
 * @name GovernanceAuditorFactoryParametersSchema
 * @description Aduana de entrada para validação do rastro institucional.
 */
export const GovernanceAuditorFactoryParametersSchema = z.object({
  reputationStanding: ReputationScoreSchema,
  identityAssuranceLevel: IdentityAssuranceLevelSchema
}).readonly();

export type IGovernanceAuditorFactoryParameters = z.infer<typeof GovernanceAuditorFactoryParametersSchema>;
