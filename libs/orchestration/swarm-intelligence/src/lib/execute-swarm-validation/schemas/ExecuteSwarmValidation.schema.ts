/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteSwarmValidationSchema
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Swarm Intelligence DNA
 */

import { z } from 'zod';
import { H3IndexSchema } from '@agentevai/types-common';

/** 
 * @name SwarmValidationInputSchema 
 * @description Aduana de entrada para ativação do loop de veracidade regional.
 */
export const SwarmValidationInputSchema = z.object({
  originatingComplaintIdentifier: z.uuid()
    .describe('Identificador da denúncia que requer validação do enxame.'),

  eventH3Index: H3IndexSchema
    .describe('Âncora geográfica (Célula H3) do fato reportado.'),

  requiredAssuranceLevel: z.enum(['IAL2_VERIFIED', 'IAL3_SOVEREIGN'])
    .default('IAL3_SOVEREIGN')
    .describe('Nível mínimo de prova de identidade para participar deste enxame.'),

  searchRadiusInRings: z.number()
    .int().min(1).max(5)
    .default(2)
    .describe('Extensão da malha de busca em anéis hexagonais.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
})
.brand<'SwarmValidationInput'>()
.readonly();

export type ISwarmValidationInput = z.infer<typeof SwarmValidationInputSchema>;