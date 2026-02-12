/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganismSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 * @description ADN mestre para o organismo de fiscalização.
 * Erradica a obsesão por primitivos via marcas nominais (Branding).
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';
import { IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';
import { SupportStatusSchema } from '@agentevai/governance-ui';

/** @section Dimensões Nominais (Branded) */
export const ComplaintIdentifierSchema = z.uuid()
  .describe('ID inalterável da denúncia no rastro de soberania.')
  .brand<'ComplaintIdentifier'>();

export type ComplaintIdentifier = z.infer<typeof ComplaintIdentifierSchema>;

export const ComplaintSeveritySchema = z.enum([
  'INFORMATIVE',
  'MODERATE',
  'CRITICAL',
  'RESOLVED'
])
.describe('Nível de urgência determinado pela perícia neural.')
.brand<'ComplaintSeverity'>();

export type ComplaintSeverity = z.infer<typeof ComplaintSeveritySchema>;

/** @name PublicComplaintOrganismInputSchema */
export const PublicComplaintOrganismInputSchema = z.object({
  identifier: ComplaintIdentifierSchema,
  
  severity: ComplaintSeveritySchema,
  
  author: CitizenAuraCardSchema
    .describe('Snapshot de identidade do denunciante.'),

  title: z.string()
    .min(10).max(120)
    .transform(value => value.toUpperCase()),

  description: z.string()
    .min(50)
    .describe('Narrativa técnica do fato reportado.'),

  mediaUrl: z.string()
    .url()
    .optional()
    .describe('Rastro visual selado no storage soberano.'),

  merkleRootAnchor: z.string()
    .length(64)
    .describe('Âncora SHA-256 de imutabilidade matemática.'),

  locationLabel: z.string()
    .min(2)
    .describe('Identificação regional (ex: Florianópolis, SC).'),

  supportCount: z.number()
    .int()
    .nonnegative()
    .default(0),

  currentUserAssuranceLevel: IdentityAssuranceLevelSchema,
  
  userSignatureStatus: SupportStatusSchema,

  /** Callback de execução de vontade */
  onSignRequest: z.function({
    input: z.tuple([ComplaintIdentifierSchema]),
    output: z.promise(z.void())
  }),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
})
.brand<'PublicComplaintOrganismInput'>()
.readonly();

export type IPublicComplaintOrganismInput = z.infer<typeof PublicComplaintOrganismInputSchema>;