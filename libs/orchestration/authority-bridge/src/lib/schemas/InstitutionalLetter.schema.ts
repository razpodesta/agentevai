/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InstitutionalLetterSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Master DNA Integrity
 * @description SSOT para formalização de documentos de pressão pública.
 */

import { z } from 'zod';

/** 
 * @section Taxonomia de Canais 
 */
export const DespatchChannelSchema = z.enum([
  'GOVERNMENT_EMAIL',   
  'SOCIAL_PUBLIC_POST', 
  'OFFICIAL_API_BRIDGE',
  'POSTAL_SERVICE_API' 
])
.describe('Vetor institucional de entrega da vontade cidadã.')
.brand<'DespatchChannel'>();

export type DespatchChannel = z.infer<typeof DespatchChannelSchema>;

/**
 * @name InstitutionalLetterBaseSchema
 * @description Estrutura fundamental para auditoria forense.
 */
export const InstitutionalLetterBaseSchema = z.object({
  documentIdentifier: z.uuid()
    .describe('Identificador inalterável da carta para consulta pública.'),

  targetAuthorityName: z.string()
    .min(5)
    .describe('Nome completo da autoridade destinatária.'),

  targetAuthorityIdentity: z.string()
    .describe('Identificador funcional (ex: Matrícula, CPF ou ID de Órgão).'),

  complaintIdentifier: z.uuid()
    .describe('Vínculo com o evento de mobilização original.'),

  merkleRootAnchor: z.string()
    .length(64)
    .describe('Âncora SHA-256 de fé pública gerada pelo Ledger.'),

  signatureCount: z.number()
    .int()
    .positive()
    .describe('Volume consolidado de assinaturas seladas no bloco.'),

  despatchChannel: DespatchChannelSchema,

  regionalSlug: z.string()
    .min(2)
    .describe('Identificador geográfico do território de emissão.'),

  generatedAt: z.string()
    .datetime()
    .describe('Timestamp de ignição do documento.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
});

/**
 * @name InstitutionalLetterSchema
 * @description Contrato SELADO e NOMINAL para trânsito entre Reinos.
 */
export const InstitutionalLetterSchema = InstitutionalLetterBaseSchema
  .brand<'InstitutionalLetter'>()
  .readonly();

export type IInstitutionalLetter = z.infer<typeof InstitutionalLetterSchema>;