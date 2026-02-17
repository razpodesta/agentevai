/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignConsciousnessSchema
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Master DNA Runtime
 * @description Única Fonte de Verdade para o estado fundamental do sistema.
 * CURADO: Sincronizado com types-common e renomeado para conformidade de aparato.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  SovereignCountrySchema,
  RegionSlugSchema,
  HealthScoreSchema
} from '@agentevai/types-common';

export const GeographyConsciousnessSchema = z.object({
  countryCode: SovereignCountrySchema,
  stateCode: z.string().length(2).toUpperCase(),
  citySlug: RegionSlugSchema,
  regionName: z.string().min(2),
  timezone: z.string().default('America/Sao_Paulo'),
}).readonly();

export const LanguageConsciousnessSchema = z.object({
  activeLocale: SovereignLocaleSchema,
  direction: z.enum(['ltr', 'rtl']).default('ltr'),
}).readonly();

export const AppearanceConsciousnessSchema = z.object({
  themeMode: z.enum(['OBSIDIAN', 'MILK']),
  motionProfile: z.enum(['FULL', 'REDUCED', 'NONE']).default('FULL'),
}).readonly();

export const SystemStatusConsciousnessSchema = z.object({
  healthScore: HealthScoreSchema,
  isDegradedModeActive: z.boolean().default(false),
  lastSyncTimestamp: z.string().datetime(),
}).readonly();

export const SovereignConsciousnessSchema = z.object({
  geography: GeographyConsciousnessSchema,
  language: LanguageConsciousnessSchema,
  appearance: AppearanceConsciousnessSchema,
  systemStatus: SystemStatusConsciousnessSchema,
})
.refine((data) => {
  if (data.geography.countryCode === 'BR' && data.language.activeLocale !== 'pt-BR') {
    return false;
  }
  return true;
}, {
  message: 'GEOPOLITICAL_INCONSISTENCY: Locale mismatch with Country Sovereignty.',
  path: ['language', 'activeLocale']
})
.brand<'SovereignConsciousness'>()
.readonly();

export type ISovereignConsciousness = z.infer<typeof SovereignConsciousnessSchema>;
