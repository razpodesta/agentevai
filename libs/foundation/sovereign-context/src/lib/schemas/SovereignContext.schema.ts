/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextSchema
 * @version 5.0.0
 * @protocol OEDP-V6.0 - High Precision
 * @description ADN Mestre que orquestra a realidade sistêmica via composição atômica.
 */

import { z } from 'zod';
import { SovereignLocaleSchema, SovereignCountrySchema } from '@agentevai/types-common';

/* --- 📍 SUB-ESQUEMAS ATÔMICOS --- */

export const GeographyContextSchema = z.object({
  countryCode: SovereignCountrySchema,
  stateCode: z.string().length(2).toUpperCase(),
  citySlug: z.string().min(2).toLowerCase().brand<'RegionSlug'>(),
  regionName: z.string().min(2),
  timezone: z.string().default('America/Sao_Paulo'),
}).readonly();

export const LanguageContextSchema = z.object({
  activeLocale: SovereignLocaleSchema,
  direction: z.enum(['ltr', 'rtl']).default('ltr'),
}).readonly();

export const AppearanceContextSchema = z.object({
  themeMode: z.enum(['OBSIDIAN', 'MILK']),
  motionProfile: z.enum(['FULL', 'REDUCED', 'NONE']).default('FULL'),
}).readonly();

export const SystemStatusContextSchema = z.object({
  healthScore: z.number().min(0).max(100).brand<'HealthScore'>(),
  isDegradedModeActive: z.boolean().default(false),
  lastSyncTimestamp: z.string().datetime(),
}).readonly();

/* --- 🏛️ CONTRATO MESTRE --- */

export const SovereignContextBaseSchema = z.object({
  geography: GeographyContextSchema,
  language: LanguageContextSchema,
  appearance: AppearanceContextSchema,
  systemStatus: SystemStatusContextSchema,
});

export const SovereignContextSchema = SovereignContextBaseSchema
  .refine((data) => {
    // Regra de Soberania Territorial: Brasil exige rastro cultural pt-BR
    if (data.geography.countryCode === 'BR' && data.language.activeLocale !== 'pt-BR') return false;
    return true;
  }, { message: 'GEOPOLITICAL_INCONSISTENCY', path: ['language', 'activeLocale'] })
  .brand<'SovereignContext'>()
  .readonly();

export type ISovereignContext = z.infer<typeof SovereignContextSchema>;