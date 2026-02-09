/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicRegionSchema
 * @version 1.3.1
 * @protocol OEDP-V5.5 - High Precision & Territorial Sovereignty
 * @description ADN mestre para representação de territórios soberanos brasileiros.
 * Refatorado: Separação de Base e Selagem para permitir modificações estruturais (.partial) em handlers.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica absoluta.
 */

import { z } from 'zod';
import { RegionSlugSchema } from '@agentevai/sovereign-context';
import { SovereignCountrySchema } from '@agentevai/types-common';

/**
 * @section Tipagem Nominal (Branded Types)
 * Blindagem de tipos primitivos para evitar colisões semânticas.
 */

export const IbgeCodeSchema = z.number()
  .int()
  .positive()
  .describe('Código numérico oficial do IBGE para identificação única de municípios.')
  .brand<'IbgeCode'>();

export type IbgeCode = z.infer<typeof IbgeCodeSchema>;

export const BrazilianStateCodeSchema = z.string()
  .length(2)
  .toUpperCase()
  .describe('Identificador alfabético da Unidade Federativa (UF) conforme padrão ISO/IBGE.')
  .brand<'BrazilianStateCode'>();

export type BrazilianStateCode = z.infer<typeof BrazilianStateCodeSchema>;

/**
 * @name BrazilianMunicipalityBaseSchema
 * @description Definição estrutural bruta do município.
 * EXPOSTA para permitir que handlers utilizem .partial(), .pick() ou .omit() antes da selagem final.
 */
export const BrazilianMunicipalityBaseSchema = z.object({
  countryCode: SovereignCountrySchema
    .default(SovereignCountrySchema.parse('BR'))
    .describe('Âncora de soberania nacional (Manifesto 0018).'),

  identifier: IbgeCodeSchema.optional()
    .describe('Identificador IBGE. Obrigatório para sincronia de backend core.'),

  name: z.string()
    .min(2)
    .trim()
    .transform(value => value.normalize('NFC'))
    .describe('Nome canônico da localidade para exibição editorial.'),

  slug: RegionSlugSchema.optional()
    .describe('Slug de ruteamento dinâmico gerado via TransmuteTextToSlug.'),

  stateCode: BrazilianStateCodeSchema,

  geofencing: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    radiusInMeters: z.number().default(5000).describe('Raio de influência geográfica para agrupamento semântico.')
  }).optional().describe('Coordenadas e perímetros de autoridade territorial.'),
});

/**
 * @name BrazilianMunicipalitySchema
 * @description O contrato selado e imutável (SSOT) para trânsito de dados em todo o Monorepo.
 */
export const BrazilianMunicipalitySchema = BrazilianMunicipalityBaseSchema.readonly();

/**
 * @interface IBrazilianMunicipality
 * @description Interface imutável resultante da selagem de ADN.
 */
export type IBrazilianMunicipality = z.infer<typeof BrazilianMunicipalitySchema>;
