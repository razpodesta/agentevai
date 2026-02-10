/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveIdentityPrivilegesSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision ADN
 * @description ADN para orquestração de matriz de privilégios. Sincronizado com Zod V4.
 */

import { z } from 'zod';
import {
  IdentityRoleSchema,
  ReputationScoreSchema,
  IdentityAssuranceLevelSchema,
  IdentityAttributesSchema
} from '../../schemas/UserIdentity.schema.js';

/**
 * @name ResolveIdentityPrivilegesInputSchema
 * @description Aduana de entrada estrita para resolução de autoridade.
 */
export const ResolveIdentityPrivilegesInputSchema = z.object({
  coreRole: IdentityRoleSchema
    .describe('O papel fundamental que orienta a escolha da fábrica de privilégios.'),

  reputationStanding: ReputationScoreSchema
    .describe('O score de mérito social usado para sanções ou bônus.'),

  identityAssuranceLevel: IdentityAssuranceLevelSchema
    .describe('O nível NIST verificado para cálculo de peso de voz.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'ResolveIdentityPrivilegesInput'>()
.readonly();

export type IResolveIdentityPrivilegesInput = z.infer<typeof ResolveIdentityPrivilegesInputSchema>;

/**
 * @name ResolveIdentityPrivilegesOutputSchema
 * @description Re-utiliza o SSOT de atributos de identidade.
 */
export const ResolveIdentityPrivilegesOutputSchema = IdentityAttributesSchema;