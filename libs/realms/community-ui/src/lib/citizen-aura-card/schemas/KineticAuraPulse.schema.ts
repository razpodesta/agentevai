/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticAuraPulseSchema
 * @version 1.0.0
 * @protocol OEDP-V6.0 - Kinetic Visual ADN
 * @description ADN que define a pulsação cromática e semântica da identidade.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

/**
 * @name KineticAuraPulseInputSchema
 * @description Aduana para a partícula visual de reputação.
 */
export const KineticAuraPulseInputSchema = z.object({
  standingPoints: ReputationScoreSchema
    .describe('O mérito social do cidadão que dita a frequência cromática da aura.'),

  isSuspended: z.boolean()
    .default(false)
    .describe('Sinalizador de colapso de reputação (Restrição técnica).'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para ARIA labels.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'KineticAuraPulseInput'>()
.readonly();

export type IKineticAuraPulseInput = z.infer<typeof KineticAuraPulseInputSchema>;