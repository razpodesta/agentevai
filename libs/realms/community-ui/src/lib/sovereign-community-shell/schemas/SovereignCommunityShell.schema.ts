/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignCommunityShellSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5.2 - Structural Integrity
 * @description ADN que define a moldura de interação comunitária. 
 * Sincronizado para sustentar o rastro de identidade e fé pública dos sub-aparatos.
 */

import { z } from 'zod';
import { 
  IdentityRoleSchema, 
  ReputationScoreSchema, 
  IdentityAssuranceLevelSchema 
} from '@agentevai/identity-domain';

/**
 * @name SovereignCommunityShellInputSchema
 * @description Aduana de entrada estrita para o orquestrador de dashboard comunitário.
 */
export const SovereignCommunityShellInputSchema = z.object({
  /** 
   * Dados do Cidadão Ativo.
   * @section Sincronia de Identidade (Cura do Erro TS2739)
   */
  activeCitizen: z.object({
    citizenName: z.string().min(2),
    identityRole: IdentityRoleSchema,
    assuranceLevel: IdentityAssuranceLevelSchema,
    reputationStandingScore: ReputationScoreSchema,
    isProfileSuspended: z.boolean()
      .default(false)
      .describe('Sinalizador de restrição operativa para o cidadão atual.'),
    profilePictureUrl: z.string()
      .url()
      .optional()
      .describe('URL canônica do rastro visual do cidadão.')
  }).readonly(),

  /** Conteúdo dinâmico injetado (Feed de atividade ou Hilos) */
  children: z.custom<React.ReactNode>()
    .describe('Nodos React que serão injetados na malha de interação.'),

  /** 
   * @section Soberania Linguística
   * Silo de tradução regional injetado pelo motor de i18n.
   */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Dicionário regional validado para transmutação léxica.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual para correlação de logs.')
})
.brand<'SovereignCommunityShellInput'>()
.readonly();

export type ISovereignCommunityShellInput = z.infer<typeof SovereignCommunityShellInputSchema>;