/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PreferenceVaultSchema
 * @version 7.1.0
 * @protocol OEDP-V7.0 - Zenith Registry SSOT
 */

import { z } from 'zod';
import { SovereignLocaleSchema, RegionSlugSchema } from '@agentevai/types-common';
import { ActorIdentifierSchema } from '../../actor-passport/schemas/ActorPassport.schema.js';

/**
 * @section Dimensões Nominais (Auras de Preferência)
 */
export const ThemeModeSchema = z.enum(['OBSIDIAN', 'MILK'])
  .describe('Fase lumínica preferencial do cidadão.')
  .brand<'ThemeMode'>();

export type ThemeMode = z.infer<typeof ThemeModeSchema>;

export const MotionProfileSchema = z.enum(['FULL', 'REDUCED', 'NONE'])
  .describe('Intensidade cinética autorizada pelo hardware do cidadão.')
  .brand<'MotionProfile'>();

export type MotionProfile = z.infer<typeof MotionProfileSchema>;

/**
 * @name PreferenceVaultSchema
 * @description ADN que sela as escolhas persistentes do Ator.
 */
export const PreferenceVaultSchema = z.object({
  actorIdentifier: ActorIdentifierSchema
    .describe('Vínculo inalterável com a certidão de nascimento do Ator.'),

  appearance: z.object({
    themeMode: ThemeModeSchema,
    motionProfile: MotionProfileSchema.default('FULL' as MotionProfile), // CURADO: Sem 'any'
  }).readonly(),

  language: z.object({
    preferredLocale: SovereignLocaleSchema,
    autoTranslateEnabled: z.boolean().default(true),
  }).readonly(),

  routing: z.object({
    favoriteCitySlug: RegionSlugSchema.optional()
      .describe('Âncora geográfica de ruteamento imediato.'),
    startPage: z.enum(['NATIONAL_ZENITH', 'REGIONAL_PULSE']).default('REGIONAL_PULSE'),
  }).readonly(),

  lastUpdated: z.string().datetime(),
  correlationIdentifier: z.uuid()
})
.brand<'PreferenceVault'>()
.readonly();

export type IPreferenceVault = z.infer<typeof PreferenceVaultSchema>;
