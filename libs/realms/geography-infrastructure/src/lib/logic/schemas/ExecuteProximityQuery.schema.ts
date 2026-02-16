/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteProximityQuerySchema
 * @version 6.6.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para consultas de proximidade via H3 Indexing.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Geográficas de Base
 */
export const GeographicCoordinateSchema = z.number()
  .min(-180).max(180)
  .describe('Ponto decimal de latitude ou longitude com precisão militar.')
  .brand<'GeographicCoordinate'>();

export type GeographicCoordinate = z.infer<typeof GeographicCoordinateSchema>;

/** 
 * @name H3IndexSchema 
 * @description Identificador nominal para indexação hexagonal Uber H3.
 */
export const H3IndexSchema = z.string()
  .regex(/^[89a-fA-F0-9]{15}$/)
  .describe('Identificador inalterável do hexágono global H3.')
  .brand<'H3Index'>();

export type H3Index = z.infer<typeof H3IndexSchema>;

/** 
 * @name ProximityQueryInputSchema 
 * @description Aduana de entrada estrita para o motor de busca espacial.
 */
export const ProximityQueryInputBaseSchema = z.object({
  centerLatitude: GeographicCoordinateSchema,
  centerLongitude: GeographicCoordinateSchema,

  searchRadiusInHexagons: z.number()
    .int().min(1).max(50)
    .default(3)
    .describe('Raio de busca medido em anéis de hexágonos (k-ring).'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
});

export const ProximityQueryInputSchema = ProximityQueryInputBaseSchema
  .brand<'ProximityQueryInput'>()
  .readonly();

export type IProximityQueryInput = z.infer<typeof ProximityQueryInputSchema>;