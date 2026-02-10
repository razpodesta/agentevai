/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ComplaintSubComponentsSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Atomic Registry
 * @description Fachada de ADN que centraliza os contratos das zonas de responsabilidade.
 * Saneado para erradicar abreviações e conflitos de exportação (Cura TS2724).
 */

import { z } from 'zod';
import {
  ComplaintIdentifierSchema,
  ComplaintSeveritySchema
} from './PublicComplaintOrganism.schema.js';

/* --- 📝 ZONA EDITORIAL (ADN NARRATIVO) --- */

/**
 * @name ComplaintEditorialZoneInputSchema
 * @description Sincronizado com o aparato atômico EditorialZone.
 */
export const ComplaintEditorialZoneInputSchema = z.object({
  identifier: ComplaintIdentifierSchema,
  title: z.string().min(10).max(120),
  description: z.string().min(50),
  severity: ComplaintSeveritySchema,
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
})
.brand<'ComplaintEditorialZoneInput'>()
.readonly();

export type IComplaintEditorialZoneInput = z.infer<typeof ComplaintEditorialZoneInputSchema>;

/* --- 📸 ZONA DE EVIDÊNCIAS (ADN VISUAL) --- */

/**
 * @name ComplaintEvidenceZoneInputSchema
 */
export const ComplaintEvidenceZoneInputSchema = z.object({
  mediaUrl: z.string().url().optional(),
  alternateText: z.string().min(10),
  correlationIdentifier: z.uuid()
})
.brand<'ComplaintEvidenceZoneInput'>()
.readonly();

export type IComplaintEvidenceZoneInput = z.infer<typeof ComplaintEvidenceZoneInputSchema>;

/* --- 🛡️ SELO DE FÉ PÚBLICA (ADN BLOCKCHAIN) --- */

/**
 * @name PublicTrustSealInputSchema
 */
export const PublicTrustSealInputSchema = z.object({
  merkleRootAnchor: z.string().length(64),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
})
.brand<'PublicTrustSealInput'>()
.readonly();

export type IPublicTrustSealInput = z.infer<typeof PublicTrustSealInputSchema>;
