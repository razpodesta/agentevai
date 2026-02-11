/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenStandingDisplaySchema
 * @version 2.1.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN de elite para exibição de mérito social.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

/**
 * @name CitizenStandingDisplayBaseSchema
 * @description Estrutura fundamental para composição.
 */
export const CitizenStandingDisplayBaseSchema = z.object({
  citizenName: z.string().min(2).max(50),
  humanizedRole: z.string().min(3),
  reputationScore: ReputationScoreSchema,
  isSuspended: z.boolean().default(false),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
});

/**
 * @name CitizenStandingDisplayInputSchema
 * @description CURA TS2724: Exportação nominal selada para uso no orquestrador.
 */
export const CitizenStandingDisplayInputSchema = CitizenStandingDisplayBaseSchema
  .brand<'CitizenStandingDisplayInput'>()
  .readonly();

export type ICitizenStandingDisplayInput = z.infer<typeof CitizenStandingDisplayInputSchema>;