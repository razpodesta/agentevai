/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintOrganism.schema
 * @version 6.5.7
 * @protocol OEDP-V6.5 - Master DNA Integrity
 * @description ADN mestre estabilizado. Erradicados erros TS2769 e TS2339 via Object Configuration Pattern.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZOD-V4-OBJECT-PATTERN: Definição estrita de input/output para compatibilidade 2026.
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';
import { IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';
import { SupportStatusSchema } from '@agentevai/governance-ui';

/**
 * @section Dimensões Nominais (Branded Types)
 */
export const ComplaintIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da denúncia no rastro de soberania.')
  .brand<'ComplaintIdentifier'>();

export type ComplaintIdentifier = z.infer<typeof ComplaintIdentifierSchema>;

export const ComplaintSeveritySchema = z.enum([
  'INFORMATIVE',
  'MODERATE',
  'CRITICAL',
  'RESOLVED'
])
.describe('Classificação de urgência determinada pela IA de Auditoria Regional.')
.brand<'ComplaintSeverity'>();

export type ComplaintSeverity = z.infer<typeof ComplaintSeveritySchema>;

/**
 * @name PublicComplaintOrganismBaseSchema
 * @description Estrutura fundamental permitindo transformações de Reino e extensões neurais.
 */
export const PublicComplaintOrganismBaseSchema = z.object({
  identifier: ComplaintIdentifierSchema,
  severity: ComplaintSeveritySchema,
  author: CitizenAuraCardSchema,

  title: z.string()
    .min(10).max(120)
    .describe('Título editorial para impacto visual imediato.'),

  description: z.string()
    .min(50)
    .describe('Relato detalhado e fundamentado do fato identificado.'),

  mediaUrl: z.string().url().optional()
    .describe('Localização da prova visual selada no storage soberano.'),

  merkleRootAnchor: z.string()
    .length(64)
    .describe('Âncora SHA-256 de fé pública gerada pelo Ledger.'),

  locationLabel: z.string().min(2),
  supportCount: z.number().int().nonnegative().default(0),
  currentUserAssuranceLevel: IdentityAssuranceLevelSchema,
  userSignatureStatus: SupportStatusSchema,

  /**
   * @section CURA_TS2769_TS2339_DEFINITIVA
   * No Zod 4.3.6, a assinatura deve ser um objeto único para garantir a propagação de tipo.
   */
  onSignRequest: z.function({
    input: z.tuple([ComplaintIdentifierSchema]),
    output: z.promise(z.void())
  })
  .describe('Callback de alta prioridade que inicia a selagem de assinatura eletrônica.'),

  /** Silo linguístico validado pelo motor i18n */
  dictionary: z.record(z.string(), z.record(z.string(), z.record(z.string(), z.string())))
    .describe('Dicionário estruturado (Apparatus -> Key -> Value).'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
});

/**
 * @name PublicComplaintOrganismInputSchema
 */
export const PublicComplaintOrganismInputSchema = PublicComplaintOrganismBaseSchema
  .brand<'PublicComplaintOrganismInput'>()
  .readonly();

export type IPublicComplaintOrganismInput = z.infer<typeof PublicComplaintOrganismInputSchema>;
