/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PublicComplaintSchema
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description Única Fonte de Verdade para o fato denunciado.
 * CURADO: Sincronizado com a Trindade Nominal (CitizenId, H3Index, ComplaintId).
 */

import { z } from 'zod';
import { 
  H3IndexSchema, 
  CitizenIdentifierSchema 
} from '@agentevai/types-common';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

export const ComplaintIdentifierSchema = z.uuid()
  .describe('Identificador Zenith inalterável da denúncia.')
  .brand<'ComplaintIdentifier'>();

export type ComplaintIdentifier = z.infer<typeof ComplaintIdentifierSchema>;

export const ComplaintSeveritySchema = z.enum([
  'INFORMATIVE', 'MODERATE', 'CRITICAL', 'ZENITH_ALERTA'
])
.describe('Nível de urgência para o ruteamento neural da verdade.')
.brand<'ComplaintSeverity'>();

export type ComplaintSeverity = z.infer<typeof ComplaintSeveritySchema>;

/* --- 🏛️ SEÇÃO 2: CONTRATO DE DOMÍNIO (SSOT) --- */

export const PublicComplaintBaseSchema = z.object({
  identifier: ComplaintIdentifierSchema,
  
  authorIdentifier: CitizenIdentifierSchema
    .describe('Vínculo criptográfico com o rastro do denunciante IAL3.'),

  titleHeader: z.string()
    .min(10).max(120)
    .describe('Título editorial para impacto no enxame público.'),

  narrativeBody: z.string()
    .min(50)
    .describe('Relato forense detalhado da negligência ou dor identificada.'),

  severity: ComplaintSeveritySchema,

  /** @section Ancoragem_Geoespacial (Manifesto 0024) */
  geospatialAnchor: z.object({
    h3Index: H3IndexSchema,
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  }).readonly(),

  evidenceResourceUrls: z.array(z.string().url())
    .min(1)
    .describe('Rastro visual selado no storage soberano.'),

  /** @section Fé_Pública */
  merkleRootAnchor: z.string().length(64).optional()
    .describe('Âncora matemática inalterável na Blockchain.'),

  correlationIdentifier: z.uuid()
});

/** @name PublicComplaintSchema */
export const PublicComplaintSchema = PublicComplaintBaseSchema
  .brand<'PublicComplaint'>()
  .readonly();

export type IPublicComplaint = z.infer<typeof PublicComplaintSchema>;