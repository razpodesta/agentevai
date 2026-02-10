/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicRegionSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision & Territorial Sovereignty
 * @description ADN mestre para territórios soberanos brasileiros.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica.
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
  .describe('Código numérico oficial do IBGE para identificação de municípios.')
  .brand<'IbgeCode'>();

export type IbgeCode = z.infer<typeof IbgeCodeSchema>;

export const BrazilianStateCodeSchema = z.string()
  .length(2)
  .toUpperCase()
  .describe('Identificador alfabético da Unidade Federativa.')
  .brand<'BrazilianStateCode'>();

export type BrazilianStateCode = z.infer<typeof BrazilianStateCodeSchema>;

/**
 * @name BrazilianMunicipalityBaseSchema
 */
export const BrazilianMunicipalityBaseSchema = z.object({
  countryCode: SovereignCountrySchema
    .describe('Âncora de soberania nacional (Manifesto 0018).'),

  identifier: IbgeCodeSchema
    .describe('Identificador IBGE inalterável.'),

  name: z.string()
    .min(2)
    .trim()
    .transform(value => value.normalize('NFC'))
    .describe('Nome canônico da localidade.'),

  slug: RegionSlugSchema
    .describe('Slug de ruteamento gerado via TransmuteTextToSlug.'),

  stateCode: BrazilianStateCodeSchema,

  geofencing: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    radiusInMeters: z.number().default(5000)
  }).optional().describe('Coordenadas e perímetros de autoridade.'),
});

/**
 * @name BrazilianMunicipalitySchema
 * @description Contrato selado e imutável (SSOT).
 */
export const BrazilianMunicipalitySchema = BrazilianMunicipalityBaseSchema.readonly();

export type IBrazilianMunicipality = z.infer<typeof BrazilianMunicipalitySchema>;
