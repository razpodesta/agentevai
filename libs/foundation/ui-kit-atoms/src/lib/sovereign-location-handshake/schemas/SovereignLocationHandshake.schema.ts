/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLocationHandshake.schema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Master DNA
 */

import { z } from 'zod';

/* --- 🛡️ DIMENSÕES NOMINAIS --- */

export const GeographicCoordinateSchema = z.number()
  .describe('Ponto decimal de latitude ou longitude com precisão militar.')
  .brand<'GeographicCoordinate'>();

export type GeographicCoordinate = z.infer<typeof GeographicCoordinateSchema>;

export const HighFidelityLocationSchema = z.object({
  latitude: GeographicCoordinateSchema,
  longitude: GeographicCoordinateSchema,
  accuracyInMeters: z.number().nonnegative(),
  altitude: z.number().nullable(),
  capturedAt: z.string().datetime(),
}).brand<'HighFidelityLocation'>().readonly();

export type IHighFidelityLocation = z.infer<typeof HighFidelityLocationSchema>;

/* --- 📥 ADUANAS DE ENTRADA --- */

export const SovereignLocationHandshakeInputSchema = z.object({
  onLocationCaptured: z.function({
    input: z.tuple([HighFidelityLocationSchema]),
    output: z.void()
  }),
  dictionary: z.record(z.string(), z.record(z.string(), z.string())),
  correlationIdentifier: z.uuid()
})
.brand<'SovereignLocationHandshakeInput'>()
.readonly();

export type ISovereignLocationHandshakeInput = z.infer<typeof SovereignLocationHandshakeInputSchema>;
