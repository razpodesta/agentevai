/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCardSchema
 * @version 1.2.0
 * @protocol OEDP-V5.5.2 - Visual Authority ADN
 * @description ADN mestre para a representação de autoridade e mérito do cidadão.
 * Sincronizado para erradicar falhas de visibilidade no CommunityUIHub.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ZOD-V4-SYNC: Uso de construtores de topo e descrições densas para IA.
 */

import { z } from 'zod';
import { 
  IdentityRoleSchema, 
  IdentityAssuranceLevelSchema,
  ReputationScoreSchema
} from '@agentevai/identity-domain';

/**
 * @name CitizenAuraCardSchema
 * @description Aduana de ADN para o aparato de identidade visual. 
 * Define a estrutura inalterável que ancora o prestígio do cidadão na interface.
 */
export const CitizenAuraCardSchema = z.object({
  citizenName: z.string()
    .min(2)
    .max(50)
    .describe('Nome canônico ou alcunha soberana do cidadão para exibição editorial.'),

  profilePictureUrl: z.string()
    .url()
    .optional()
    .describe('Rastro visual do perfil hospedado em infraestrutura de armazenamento autorizada.'),

  identityRole: IdentityRoleSchema
    .describe('Papel fundamental que define a autoridade funcional do cidadão.'),

  assuranceLevel: IdentityAssuranceLevelSchema
    .describe('Nível de garantia de identidade (IAL) verificado via rastro forense.'),

  reputationStandingScore: ReputationScoreSchema
    .describe('Índice de mérito social acumulado no ecossistema.'),

  isProfileSuspended: z.boolean()
    .default(false)
    .describe('Sinalizador de restrição técnica ativa que degrada a visibilidade do perfil.'),

  /** 
   * @section Soberania Linguística
   * Injeção de rastro semântico regional.
   */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Fragmento de dicionário regionalizado injetado para humanização de labels.'),

  /** Identificador único da jornada para correlação com o SovereignLogger */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual para perícia técnica.')
})
.brand<'CitizenAuraCard'>() // Selo de Soberania de Tipo
.readonly(); // Imutabilidade forçada para proteção de rastro

/**
 * @interface ICitizenAuraCard
 * @description Contrato estrito e imutável para propriedades do componente de Aura.
 */
export type ICitizenAuraCard = z.infer<typeof CitizenAuraCardSchema>;