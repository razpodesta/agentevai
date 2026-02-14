/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUI.schema
 * @version 6.5.8
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para o simulador publicitário. Sincronizado para Zod V4 Zenith.
 */

import { z } from 'zod';

export const AdFormatSchema = z.enum([
  'EDITORIAL_NATIVE_BANNER',
  'SPONSORED_FORENSIC_REPORT',
  'CITIZEN_REWARD_AD',
  'GOOGLE_ADSENSE_FALLBACK',
  'REGIONAL_STORY_INJECTION'
])
.describe('Taxonomia de formatos autorizados para o enxame publicitário.')
.brand<'AdFormat'>();

export type AdFormat = z.infer<typeof AdFormatSchema>;

export const AdvertiserTypeSchema = z.enum([
  'GOVERNMENT_INSTITUTION',
  'REGIONAL_CORPORATION',
  'LOCAL_COMMERCE',
  'SOVEREIGN_PARTNER'
])
.describe('Classificação de soberania do anunciante.')
.brand<'AdvertiserType'>();

export type AdvertiserType = z.infer<typeof AdvertiserTypeSchema>;

export const AdVantagePreviewUIInputSchema = z.object({
  activeFormat: AdFormatSchema,
  advertiserType: AdvertiserTypeSchema,
  regionName: z.string().min(2).max(50),
  advertiserBrandName: z.string().min(2).max(50),
  dictionary: z.record(z.string(), z.record(z.string(), z.string())),
  correlationIdentifier: z.uuid()
})
.brand<'AdVantagePreviewUIInput'>()
.readonly();

export type IAdVantagePreviewUIInput = z.infer<typeof AdVantagePreviewUIInputSchema>;
