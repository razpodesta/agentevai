/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateCitizenStandingSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision ADN
 * @description ADN para orquestração de mérito social. Sincronizado com Zod V4.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '../../schemas/UserIdentity.schema.js';

export const ImpactTypeSchema = z.enum([
  'COMPLAINT_VERIFIED',
  'SUPPORT_RECEIVED',
  'SUPPORT_GIVEN',
  'ENTROPY_DETECTED',
  'FAKE_NEWS_CONFIRMED',
  'SENIORITY_MILESTONE'
]).brand<'ImpactType'>();

export type ImpactType = z.infer<typeof ImpactTypeSchema>;

/**
 * @name CalculateCitizenStandingInputSchema
 * @description Aduana de entrada estrita.
 */
export const CalculateCitizenStandingInputSchema = z.object({
  currentReputationScore: ReputationScoreSchema,

  impactType: ImpactTypeSchema,

  neuralMultiplier: z.number()
    .min(0.5)
    .max(5)
    .default(1)
    .describe('Fator de ajuste neural para calibração de mérito.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'CalculateCitizenStandingInput'>()
.readonly();

export type ICalculateCitizenStandingInput = z.infer<typeof CalculateCitizenStandingInputSchema>;
