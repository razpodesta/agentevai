/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus RequirementInboxManagerSchema
 * @version 1.0.0
 * @protocol OEDP-V6.5 - B2B Institutional DNA
 */

import { z } from 'zod';

/** @section Dimensões Nominais (Branded Types) */
export const RequirementIdentifierSchema = z.uuid()
  .describe('Identificador institucional único do requerimento na bandeja B2B.')
  .brand<'RequirementIdentifier'>();

export type RequirementIdentifier = z.infer<typeof RequirementIdentifierSchema>;

export const RequirementStatusSchema = z.enum([
  'RECEIVED',
  'UNDER_ANALYSIS',
  'PROPOSED_SOLUTION',
  'SEALED_RESOLUTION'
]).brand<'RequirementStatus'>();

export type RequirementStatus = z.infer<typeof RequirementStatusSchema>;

/** @name RequirementInboxManagerInputSchema */
export const RequirementInboxManagerInputSchema = z.object({
  originatingComplaintIdentifier: z.uuid()
    .describe('Vínculo com o rastro público do Complaints Realm.'),

  responsibleEntityIdentifier: z.uuid()
    .describe('ID da instituição responsável (venculado ao EntityMetadataRegistry).'),

  priorityLevel: z.enum(['ROUTINE', 'URGENT', 'MAXIMUM_SOVEREIGNTY']),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
})
.brand<'RequirementInboxManagerInput'>()
.readonly();

export type IRequirementInboxManagerInput = z.infer<typeof RequirementInboxManagerInputSchema>;
