/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InstitutionalLetterSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - Institutional Authority
 * @description ADN para formalização de documentos de pressão pública.
 * Implementa rastro de despacho omnicanal e selagem blockchain.
 */

import { z } from 'zod';

export const DespatchChannelSchema = z.enum([
  'GOVERNMENT_EMAIL',   // Envio via Novu/SendGrid para órgãos oficiais
  'SOCIAL_PUBLIC_POST', // Viralização via Twitter/X API v2
  'OFFICIAL_API_BRIDGE',// Integração direta com portais de transparência
  'POSTAL_SERVICE_API' // Despacho físico via integradores (Futuro)
]).describe('Canal de comunicação institucional utilizado.');

/**
 * @name InstitutionalLetterBaseSchema
 */
export const InstitutionalLetterBaseSchema = z.object({
  documentIdentifier: z.uuid()
    .describe('ID único do documento para consulta pública.'),

  targetAuthorityName: z.string().min(5),

  targetAuthorityIdentity: z.string()
    .describe('Identificador institucional da autoridade (ex: CPF, Matrícula ou ID de Órgão).'),

  complaintIdentifier: z.uuid()
    .describe('Vínculo com o evento de mobilização unificado.'),

  merkleRootAnchor: z.string().length(64)
    .describe('Raiz Merkle inalterável provando a validade das assinaturas.'),

  signatureCount: z.number().int().positive(),

  despatchChannel: DespatchChannelSchema,

  regionalSlug: z.string().min(2),

  generatedAt: z.string().datetime(),

  correlationIdentifier: z.uuid()
}).loose();

/**
 * @name InstitutionalLetterSchema
 * @description Contrato SELADO para produção.
 */
export const InstitutionalLetterSchema = InstitutionalLetterBaseSchema.readonly();

export type IInstitutionalLetter = z.infer<typeof InstitutionalLetterSchema>;
