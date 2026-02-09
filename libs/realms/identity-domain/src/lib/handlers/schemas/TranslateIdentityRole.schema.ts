/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslateIdentityRoleSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5.1 - High Precision
 * @description ADN de fronteira para o motor de tradução de papéis sociais.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica militar.
 */

import { z } from 'zod';
import { SovereignLocaleSchema } from '@agentevai/types-common';
import { IdentityRoleSchema } from '../../schemas/UserIdentity.schema.js';

/**
 * @name TranslateIdentityRoleInputSchema
 * @description Aduana de entrada para garantir a integridade da solicitação de tradução.
 */
export const TranslateIdentityRoleInputSchema = z.object({
  /** O papel técnico a ser humanizado (ex: PLATFORM_ENGINEER) */
  targetIdentityRole: IdentityRoleSchema,

  /** A identidade cultural de destino (pt-BR, es-ES, en-US) */
  activeSovereignLocale: SovereignLocaleSchema
    .describe('Identidade cultural validada para transmutação.'),

  /** UUID de jornada para rastreabilidade cruzada */
  correlationIdentifier: z.uuid()
    .describe('Rastro forense inalterável da jornada operativa.')
}).readonly();

export type ITranslateIdentityRoleInput = z.infer<typeof TranslateIdentityRoleInputSchema>;
