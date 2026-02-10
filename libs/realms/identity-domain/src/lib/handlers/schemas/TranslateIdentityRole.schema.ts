/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslateIdentityRoleSchema
 * @version 3.1.0
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description ADN de fronteira para transmutação semântica de papéis.
 */

import { z } from 'zod';
import { SovereignLocaleSchema } from '@agentevai/types-common';
import { IdentityRoleSchema } from '../../schemas/UserIdentity.schema.js';

/**
 * @name TranslateIdentityRoleInputSchema
 * @description Aduana de entrada estrita. Define a tríade nominal para tradução regional.
 */
export const TranslateIdentityRoleInputSchema = z.object({
  targetIdentityRole: IdentityRoleSchema
    .describe('O papel funcional do cidadão a ser transmutado.'),

  activeSovereignLocale: SovereignLocaleSchema
    .describe('A identidade cultural ativa (BCP 47) para localização.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'TranslateIdentityRoleInput'>()
.readonly();

export type ITranslateIdentityRoleInput = z.infer<typeof TranslateIdentityRoleInputSchema>;
