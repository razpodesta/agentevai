/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchorSchema
 * @version 5.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 */

import { z } from 'zod';
import { SovereignCountrySchema, RegionSlugSchema } from '@agentevai/sovereign-context';
import { BrazilianStateCodeSchema } from './GeographicRegion.schema.js';

/**
 * @name ExternalGeographicPulseSchema
 * @description Aduana para o rastro bruto vindo de provedores IP-API.
 */
export const ExternalGeographicPulseSchema = z.object({
  country_code: z.string().length(2).optional(),
  country_name: z.string().optional(),
  region_code: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
}).loose().readonly();

export type IExternalGeographicPulse = z.infer<typeof ExternalGeographicPulseSchema>;

/**
 * @name LookupTerritorialAnchorInputSchema
 */
export const LookupTerritorialAnchorInputSchema = z.object({
  internetProtocolAddress: z.ipv4(),
  correlationIdentifier: z.uuid()
})
.brand<'LookupTerritorialAnchorInput'>()
.readonly();

/**
 * @name TerritorialAnchorResultSchema
 * @description Contrato de saída SELADO para garantir a consciência geográfica.
 */
export const TerritorialAnchorResultSchema = z.object({
  name: z.string().min(2),
  stateCode: BrazilianStateCodeSchema,
  countryCode: SovereignCountrySchema,
  slug: RegionSlugSchema.optional(),
  city: z.string().optional()
})
.brand<'TerritorialAnchorResult'>()
.readonly();

export type ITerritorialAnchorResult = z.infer<typeof TerritorialAnchorResultSchema>;