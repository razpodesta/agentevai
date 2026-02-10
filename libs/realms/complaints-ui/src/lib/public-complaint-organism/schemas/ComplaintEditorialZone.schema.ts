/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ComplaintEditorialZoneSchema
 * @version 1.1.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN de elite para a zona editorial.
 * Sincronizado para garantir unificação de marca nominal.
 */

import { z } from 'zod';
import { ComplaintSeveritySchema, ComplaintIdentifierSchema } from './PublicComplaintOrganism.schema.js';

/**
 * @name ComplaintEditorialZoneInputSchema
 * @description Aduana de entrada estrita.
 * Marca Nominal: ComplaintEditorialZoneInput (Exaustiva).
 */
export const ComplaintEditorialZoneInputSchema = z.object({
  identifier: ComplaintIdentifierSchema,

  title: z.string()
    .min(10)
    .max(120)
    .transform(text => text.toUpperCase())
    .describe('Título editorial transmutado para caixa alta.'),

  description: z.string()
    .min(50)
    .describe('Narrativa detalhada do fato reportado.'),

  severity: ComplaintSeveritySchema,

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada operativa.')
})
.brand<'ComplaintEditorialZoneInput'>() // MARCA UNIFICADA
.readonly();

export type IComplaintEditorialZoneInput = z.infer<typeof ComplaintEditorialZoneInputSchema>;
