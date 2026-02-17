/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserIdentitySchema
 * @version 7.3.1
 * @protocol OEDP-V7.0 - Zenith Aggregation DNA
 * @description ADN de elite que une o rastro de Registro (Ser) com Autorização (Poder).
 * CURADO: Saneamento de rastro para recuperação de rastro forense em colapso.
 */

import { z } from 'zod';
import {
  IdentityRoleSchema,
  ReputationScoreSchema,
  SovereignLocaleSchema
} from '@agentevai/types-common';

/** @section Sincronia de Borda (Inter-Bunker) */
import { ActorPassportSchema } from '@agentevai/actor-registry';
import { IdentityAttributesSchema } from '@agentevai/sovereign-authorization';

/**
 * @name UserIdentitySchema
 * @description Única Fonte de Verdade (SSOT) para a identidade holística do cidadão.
 */
export const UserIdentitySchema = z.object({
  passport: ActorPassportSchema
    .describe('Passaporte técnico contendo dados PII e nível de garantia.'),

  attributes: IdentityAttributesSchema
    .describe('Matriz de privilégios e sanções operativas ativas.'),

  coreRole: IdentityRoleSchema
    .describe('Papel funcional que orienta a narrativa de interface.'),

  reputationStanding: ReputationScoreSchema
    .describe('Standing social processado pelo motor de gamificação.'),

  preferredSovereignLocale: SovereignLocaleSchema
    .describe('Preferência cultural para ruteamento semântico.'),

  presence: z.object({
    lastSyncTimestamp: z.string().datetime(),
    consciousnessCorrelationIdentifier: z.uuid()
      .describe('Vínculo com o rastro de realidade de borda (Consciousness).')
  }).readonly()
})
.brand<'UserIdentity'>()
.readonly();

export type IUserIdentity = z.infer<typeof UserIdentitySchema>;

/**
 * @name UserIdentityRecoverySchema
 * @description ADN de contingência para extrair rastro de correlação sem radiação 'any'.
 */
export const UserIdentityRecoverySchema = z.object({
  presence: z.object({
    consciousnessCorrelationIdentifier: z.uuid()
  })
}).partial().passthrough();
