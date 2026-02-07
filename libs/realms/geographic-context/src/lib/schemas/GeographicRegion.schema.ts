/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicRegionSchema
 * @version 1.0.0
 * @description ADN para representação de territórios soberanos.
 * Integra o identificador jurídico (IBGE) para o território brasileiro.
 */

import { z } from 'zod';
import { RegionSlugSchema } from '@agentevai/sovereign-context';

/**
 * @section Tipagem Nominal (Branded)
 */
export const IbgeCodeSchema = z.number().int().positive().brand<'IbgeCode'>();
export type IbgeCode = z.infer<typeof IbgeCodeSchema>;

/**
 * @name BrazilianMunicipalitySchema
 * @description Representação purificada de uma cidade brasileira conforme o IBGE.
 */
export const BrazilianMunicipalitySchema = z.object({
  /** Código único do IBGE (Ex: 4205407 para Florianópolis) */
  identifier: IbgeCodeSchema,
  /** Nome oficial do município */
  name: z.string().min(2).trim(),
  /** Slug para ruteamento dinâmico no Next.js 16 */
  slug: RegionSlugSchema,
  /** Sigla da Unidade Federativa (Ex: SC) */
  stateAbbreviation: z.string().length(2).toUpperCase(),
  /** Metadados de geolocalização central */
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
}).readonly();

export type IBrazilianMunicipality = z.infer<typeof BrazilianMunicipalitySchema>;
