/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignGeospatialSchema
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para indexação geoespacial inalterável.
 */

import { z } from 'zod';

/** 
 * @name H3IndexSchema 
 * @description Identificador nominal para indexação hexagonal Uber H3 (Resolução 9).
 * CURA TS2305: Centralizado na fundação para consumo por todos os Reinos.
 */
export const H3IndexSchema = z.string()
  .length(15)
  .regex(/^[89a-fA-F0-9]{15}$/)
  .describe('Identificador inalterável do hexágono global H3 para precisão regional.')
  .brand<'H3Index'>();

export type H3Index = z.infer<typeof H3IndexSchema>;

/**
 * @name GeographicCoordinatesSchema
 */
export const GeographicCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180)
}).readonly();

export type IGeographicCoordinates = z.infer<typeof GeographicCoordinatesSchema>;