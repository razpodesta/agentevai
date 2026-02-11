/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactorySchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision ADN
 * @description ADN de fronteira para a fábrica de auditores governamentais.
 */

import { z } from 'zod';
import { 
  ReputationScoreSchema, 
  IdentityAssuranceLevelSchema 
} from '../../../schemas/UserIdentity.schema.js';

/**
 * @name GovernanceAuditorFactoryInputSchema
 * @description Aduana de entrada estrita para validação do rastro institucional.
 */
export const GovernanceAuditorFactoryInputSchema = z.object({
  reputationStanding: ReputationScoreSchema
    .describe('O mérito social acumulado necessário para o exercício da auditoria.'),

  identityAssuranceLevel: IdentityAssuranceLevelSchema
    .describe('O nível de prova NIST exigido para autoridade institucional.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'GovernanceAuditorFactoryInput'>()
.readonly();

export type IGovernanceAuditorFactoryInput = z.infer<typeof GovernanceAuditorFactoryInputSchema>;