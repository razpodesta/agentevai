/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PermissionAduanaSchema
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Law Enforcement DNA
 * @description ADN que governa a entrada para a decisão de autoridade sistêmica.
 */

import { z } from 'zod';
import {
  ActorPassportSchema
} from '@agentevai/actor-registry';
import {
  ReputationScoreSchema,
  IdentityRoleSchema
} from '@agentevai/types-common';

/**
 * @name PermissionAduanaInputSchema
 * @description Contrato de entrada para o tribunal de permissões.
 */
export const PermissionAduanaInputSchema = z.object({
  actorPassport: ActorPassportSchema
    .describe('O rastro civil e categoria do ator para análise de base.'),

  currentReputationScore: ReputationScoreSchema
    .describe('O mérito social que dita o peso e sanções do ator.'),

  requestedRole: IdentityRoleSchema
    .describe('O papel funcional que o ator deseja exercer.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
})
.brand<'PermissionAduanaInput'>()
.readonly();

export type IPermissionAduanaInput = z.infer<typeof PermissionAduanaInputSchema>;
