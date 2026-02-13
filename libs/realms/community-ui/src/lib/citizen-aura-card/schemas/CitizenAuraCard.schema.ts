/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCard.schema
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN mestre para representação de autoridade do cidadão. Sincronizado para Zod V4.
 * CURA TS2724: Alinhamento nominal para exportação no Hub de Comunidade.
 */

import { z } from 'zod';
import { 
  IdentityRoleSchema, 
  IdentityAssuranceLevelSchema,
  ReputationScoreSchema
} from '@agentevai/identity-domain';

/**
 * @name CitizenAuraCardBaseSchema
 * @description Estrutura fundamental permitindo transformações de Reino (parciais ou extensões).
 */
export const CitizenAuraCardBaseSchema = z.object({
  citizenName: z.string()
    .min(2).max(50)
    .describe('Identificador nominal ou alcunha soberana do cidadão.'),

  profilePictureUrl: z.string()
    .url()
    .optional()
    .describe('Localização do rastro visual no storage regional.'),

  identityRole: IdentityRoleSchema,

  assuranceLevel: IdentityAssuranceLevelSchema,

  reputationStandingScore: ReputationScoreSchema,

  isProfileSuspended: z.boolean().default(false),

  /** Silo linguístico validado pelo motor i18n */
  dictionary: z.record(z.string(), z.record(z.string(), z.record(z.string(), z.string())))
    .describe('Dicionário estruturado exaustivo (Apparatus -> Key -> Value).'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name CitizenAuraCardSchema
 * @section Selagem Nominal Zenith
 * CURA: Renomeado de 'InputSchema' para 'Schema' para conformidade com o Hub.
 */
export const CitizenAuraCardSchema = CitizenAuraCardBaseSchema
  .brand<'CitizenAuraCard'>()
  .readonly();

export type ICitizenAuraCard = z.infer<typeof CitizenAuraCardSchema>;