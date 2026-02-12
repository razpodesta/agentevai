/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicRegionSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision & Territorial Sovereignty
 * @description ADN mestre para territórios brasileiros. Sincronizado para Zod V4.
 */

import { z } from 'zod';
import { RegionSlugSchema } from '@agentevai/sovereign-context';
import { SovereignCountrySchema } from '@agentevai/types-common';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const IbgeCodeSchema = z.number()
  .int()
  .positive()
  .describe('Código numérico oficial do IBGE.')
  .brand<'IbgeCode'>();

export type IbgeCode = z.infer<typeof IbgeCodeSchema>;

export const BrazilianStateCodeSchema = z.string()
  .length(2)
  .toUpperCase()
  .brand<'BrazilianStateCode'>();

export type BrazilianStateCode = z.infer<typeof BrazilianStateCodeSchema>;

/**
 * @name BrazilianMunicipalityBaseSchema
 * @description Estrutura pura para permitir desestruturação segura (un-branded properties).
 */
export const BrazilianMunicipalityBaseSchema = z.object({
  countryCode: SovereignCountrySchema
    .describe('Âncora de soberania nacional (Manifesto 0018).'),

  identifier: IbgeCodeSchema
    .describe('Identificador IBGE inalterável.'),

  name: z.string()
    .min(2)
    .trim()
    .transform(value => value.normalize('NFC')),

  slug: RegionSlugSchema
    .describe('Slug de ruteamento gerado via TransmuteTextToSlug.'),

  stateCode: BrazilianStateCodeSchema,

  geofencing: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    radiusInMeters: z.number().default(5000)
  }).optional(),
});

/**
 * @name BrazilianMunicipalitySchema
 * @description Contrato SELADO e NOMINAL para trânsito no Reino Geográfico.
 */
export const BrazilianMunicipalitySchema = BrazilianMunicipalityBaseSchema
  .brand<'BrazilianMunicipality'>()
  .readonly();

export type IBrazilianMunicipality = z.infer<typeof BrazilianMunicipalitySchema>;