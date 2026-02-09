/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveIdentityPrivilegesSchema
 * @version 1.1.0
 * @protocol OEDP-V5.5.1 - Forensic Integrity
 * @description ADN para orquestração de privilégios.
 * Sincronizado com o motor de Identidade Soberana.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica militar.
 */

import { z } from 'zod';
import {
  IdentityRoleSchema,
  ReputationScoreSchema,
  IdentityAssuranceLevelSchema,
  IdentityAttributesSchema // Agora formalmente exportado
} from '../../schemas/UserIdentity.schema.js';

/**
 * @name ResolveIdentityPrivilegesInputSchema
 * @description Aduana para o rastro de identidade de entrada.
 */
export const ResolveIdentityPrivilegesInputSchema = z.object({
  coreRole: IdentityRoleSchema,

  reputationStanding: ReputationScoreSchema,

  identityAssuranceLevel: IdentityAssuranceLevelSchema,

  /**
   * @section Sincronia Zod v4
   * Uso de z.uuid() direto no topo.
   */
  correlationIdentifier: z.uuid()
    .describe('Rastro forense inalterável da jornada atual.'),
}).readonly();

export type IResolveIdentityPrivilegesInput = z.infer<typeof ResolveIdentityPrivilegesInputSchema>;

/**
 * @name ResolveIdentityPrivilegesOutputSchema
 * @description O output reutiliza o esquema de atributos do domínio já consolidado.
 */
export const ResolveIdentityPrivilegesOutputSchema = IdentityAttributesSchema;
