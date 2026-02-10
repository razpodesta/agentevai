/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganismSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Structural Integrity SSOT
 * @description ADN Mestre nivelado para erradicar radiação de marcas nominais conflitantes.
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';
import { IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';
import { SupportStatusSchema } from '@agentevai/governance-ui';

/**
 * @section Dimensões Nominais (Branded Types)
 */
export const ComplaintIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da denúncia.')
  .brand<'ComplaintIdentifier'>();

export type ComplaintIdentifier = z.infer<typeof ComplaintIdentifierSchema>;

export const ComplaintSeveritySchema = z.enum([
  'INFORMATIVE',
  'MODERATE',
  'CRITICAL',
  'RESOLVED'
]).describe('Classificação de urgência determinada por IA.')
  .brand<'ComplaintSeverity'>();

export type ComplaintSeverity = z.infer<typeof ComplaintSeveritySchema>;

/**
 * @name PublicComplaintOrganismInputSchema
 * @description Aduana mestre para o organismo de fiscalização.
 */
export const PublicComplaintOrganismInputSchema = z.object({
  identifier: ComplaintIdentifierSchema,
  title: z.string().min(10).max(120).transform(value => value.toUpperCase()),
  description: z.string().min(50),
  severity: ComplaintSeveritySchema,
  author: CitizenAuraCardSchema,
  currentUserAssuranceLevel: IdentityAssuranceLevelSchema,
  userSignatureStatus: SupportStatusSchema,
  mediaUrl: z.string().url().optional(),
  merkleRootAnchor: z.string().length(64),
  supportCount: z.number().int().nonnegative().default(0),
  locationLabel: z.string().min(2),

  onSignRequest: z.function({
    input: z.tuple([ComplaintIdentifierSchema]),
    output: z.promise(z.void())
  }),

  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
})
.brand<'PublicComplaintOrganismInput'>()
.readonly();

export type IPublicComplaintOrganismInput = z.infer<typeof PublicComplaintOrganismInputSchema>;
