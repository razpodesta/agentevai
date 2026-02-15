/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicAudit.schema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Forensic Integrity
 * @description ADN que define o rastro de gravação de auditoria geoespacial.
 */

import { z } from 'zod';

/**
 * @name GeographicAuditEntrySchema
 * @description Contrato selado para transmutação de IGeospatialTruth em rastro físico.
 */
export const GeographicAuditEntrySchema = z.object({
  identifier: z.uuid()
    .describe('Identificador único inalterável do registro de auditoria.'),

  fidelityLevel: z.enum(['IAL2_VERIFIED', 'IAL3_SOVEREIGN'])
    .describe('Nível de prova técnica da localização capturada.'),

  h3IndexHexadecimal: z.string().length(15).optional()
    .describe('O identificador hexagonal Uber H3 para clusterização neural.'),

  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),

  regionName: z.string().min(2),
  stateCode: z.string().length(2).toUpperCase(),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.'),

  detectedAt: z.string().datetime()
    .describe('Timestamp preciso da captura (ISO-8601).')
})
.brand<'GeographicAuditEntry'>()
.readonly();

export type IGeographicAuditEntry = z.infer<typeof GeographicAuditEntrySchema>;