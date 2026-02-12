/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantageContractsSchema
 * @version 6.2.0
 * @protocol OEDP-V6.0 - Master Sovereignty
 */

import { z } from 'zod';

export const AdvertiserTypeSchema = z.enum([
  'GOVERNMENT_INSTITUTION',
  'REGIONAL_CORPORATION',
  'LOCAL_COMMERCE',
  'THIRD_SECTOR_NGO',
  'SOVEREIGN_PARTNER'
]).brand<'AdvertiserType'>();

export const BusinessSectorSchema = z.enum([
  'CIVIC_TECH',
  'RETAIL_COMMERCE',
  'INFRASTRUCTURE_URBANISM',
  'PUBLIC_HEALTH_CARE',
  'EDUCATION_CULTURE',
  'ENERGY_SUSTAINABILITY',
  'FINANCIAL_SOVEREIGNTY'
]).brand<'BusinessSector'>();

export const AdvertisingFormatSchema = z.enum([
  'EDITORIAL_NATIVE_BANNER',
  'SPONSORED_FORENSIC_REPORT',
  'CITIZEN_REWARD_AD',
  'GOOGLE_ADSENSE_FALLBACK',
  'REGIONAL_STORY_INJECTION'
]).brand<'AdFormat'>();

export type AdFormat = z.infer<typeof AdvertisingFormatSchema>;

/** @name AdVantagePreviewUIInputSchema */
export const AdVantagePreviewUIInputSchema = z.object({
  activeFormat: AdvertisingFormatSchema,
  advertiserType: AdvertiserTypeSchema,
  businessSector: BusinessSectorSchema,
  geographicScope: z.enum(['LOCAL', 'REGIONAL', 'GLOBAL']),
  regionName: z.string().min(2),
  advertiserBrandName: z.string().min(2),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
})
.brand<'AdVantagePreviewUIInput'>()
.readonly();

export type IAdVantagePreviewUIInput = z.infer<typeof AdVantagePreviewUIInputSchema>;