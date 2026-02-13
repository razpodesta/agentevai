/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignCommunityShell.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN que define a moldura de autoridade comunitária. Sincronizado para Zod V4.
 */

import { z } from 'zod';
import { 
  IdentityRoleSchema, 
  ReputationScoreSchema, 
  IdentityAssuranceLevelSchema 
} from '@agentevai/identity-domain';

/**
 * @name SovereignCommunityShellBaseSchema
 * @description Estrutura fundamental permitindo transformações de Reino.
 */
export const SovereignCommunityShellBaseSchema = z.object({
  /** Snapshot de identidade do Cidadão Soberano */
  activeCitizen: z.object({
    citizenName: z.string().min(2).max(50),
    identityRole: IdentityRoleSchema,
    assuranceLevel: IdentityAssuranceLevelSchema,
    reputationStandingScore: ReputationScoreSchema,
    isProfileSuspended: z.boolean().default(false),
    profilePictureUrl: z.string().url().optional()
  }).readonly(),

  /** Nodos React para injeção de hilos ou feeds */
  children: z.custom<React.ReactNode>()
    .describe('Nodos funcionais da malha de interação.'),

  /** Silo linguístico regionalizado e validado */
  dictionary: z.record(z.string(), z.record(z.string(), z.record(z.string(), z.string())))
    .describe('Dicionário estruturado (Apparatus -> Key -> Value).'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name SovereignCommunityShellInputSchema
 * @section Selagem Nominal Zenith
 */
export const SovereignCommunityShellInputSchema = SovereignCommunityShellBaseSchema
  .brand<'SovereignCommunityShellInput'>()
  .readonly();

export type ISovereignCommunityShellInput = z.infer<typeof SovereignCommunityShellInputSchema>;