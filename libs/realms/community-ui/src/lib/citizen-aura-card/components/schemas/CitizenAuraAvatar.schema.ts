/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraAvatarSchema
 * @version 1.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de fronteira para a unidade visual do avatar.
 */

import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

/**
 * @name CitizenAuraAvatarInputSchema
 * @description Aduana de entrada estrita para o aparato de representação biométrica.
 */
export const CitizenAuraAvatarInputSchema = z.object({
  citizenName: z.string()
    .min(2)
    .describe('Nome ou alcunha soberana para rastro visual.'),

  profilePictureUrl: z.string()
    .url()
    .optional()
    .describe('Localização da prova visual no storage soberano.'),

  standingPoints: ReputationScoreSchema
    .describe('O mérito social do cidadão carimbado com marca nominal.'),

  isSuspended: z.boolean()
    .default(false)
    .describe('Sinalizador de restrição operativa ativa.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para o aparato.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'CitizenAuraAvatarInput'>()
.readonly();

export type ICitizenAuraAvatarInput = z.infer<typeof CitizenAuraAvatarInputSchema>;