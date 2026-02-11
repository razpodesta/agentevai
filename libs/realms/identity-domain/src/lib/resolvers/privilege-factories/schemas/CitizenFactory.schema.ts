/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenFactorySchema
 * @version 1.0.0
 * @protocol OEDP-V6.0 - High Precision ADN
 */

import { z } from 'zod';
import { 
  ReputationScoreSchema, 
  IdentityAssuranceLevelSchema 
} from '../../../schemas/UserIdentity.schema.js';

/**
 * @name CitizenFactoryInputSchema
 * @description Aduana de entrada para a fábrica de autoridade do cidadão.
 */
export const CitizenFactoryInputSchema = z.object({
  reputationStanding: ReputationScoreSchema
    .describe('O mérito social acumulado pelo cidadão.'),

  identityAssuranceLevel: IdentityAssuranceLevelSchema
    .describe('O nível de prova de identidade (IAL) verificado.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'CitizenFactoryInput'>()
.readonly();

export type ICitizenFactoryInput = z.infer<typeof CitizenFactoryInputSchema>;