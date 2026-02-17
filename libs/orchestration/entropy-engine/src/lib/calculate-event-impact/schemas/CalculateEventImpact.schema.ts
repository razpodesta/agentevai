/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateEventImpactSchema
 * @version 7.4.3
 * @protocol OEDP-V7.0 - Pure Mathematics DNA
 */

import { z } from 'zod';

/**
 * @name CalculateEventImpactInputSchema
 * @description Aduana de entrada para o kernel de peso termodinâmico.
 */
export const CalculateEventImpactInputSchema = z.object({
  assuranceLevel: z.enum(['IAL1_UNVERIFIED', 'IAL2_VERIFIED', 'IAL3_SOVEREIGN'])
    .describe('Nível de garantia NIST que dita o multiplicador de fé pública.'),

  neuralSeverityScore: z.number()
    .min(1).max(10)
    .describe('Gravidade atribuída pelo Auditor Neural.'),

  isInstitutionalResponsePending: z.boolean()
    .describe('Sinalizador de inércia institucional.'),

  correlationIdentifier: z.uuid()
})
.brand<'CalculateEventImpactInput'>()
.readonly();

export type ICalculateEventImpactInput = z.infer<typeof CalculateEventImpactInputSchema>;
