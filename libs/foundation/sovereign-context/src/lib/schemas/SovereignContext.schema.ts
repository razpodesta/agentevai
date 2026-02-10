/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Standard MetaShark
 * @description Define o ADN da realidade operacional (Geografia, Idioma, Estética e Saúde).
 * Sincronizado para Zod V4 e unificação de rastro forense.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica absoluta.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  SovereignCountrySchema
} from '@agentevai/types-common';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const RegionSlugSchema = z.string().toLowerCase().brand<'RegionSlug'>();
export type RegionSlug = z.infer<typeof RegionSlugSchema>;

export const HealthScoreSchema = z.number().min(0).max(100).brand<'HealthScore'>();
export type HealthScore = z.infer<typeof HealthScoreSchema>;

/**
 * @name SovereignContextSchema
 * @description Aduana de ADN para o estado global do sistema em runtime.
 */
export const SovereignContextSchema = z.object({
  geography: z.object({
    countryCode: SovereignCountrySchema
      .describe('Código ISO 3166-1 alpha-2 da soberania nacional ativa.'),

    stateCode: z.string()
      .length(2)
      .toUpperCase()
      .trim()
      .describe('Sigla da Unidade Federativa (UF).'),

    citySlug: RegionSlugSchema
      .describe('Slug de ruteamento para o Jornal Local.'),

    regionName: z.string()
      .min(2)
      .trim()
      .describe('Nome amigável da localidade para exibição editorial.'),

    timezone: z.string()
      .default('America/Sao_Paulo')
      .describe('Fuso horário para precisão em registros forenses.'),
  }),

  language: z.object({
    activeLocale: SovereignLocaleSchema
      .describe('Identidade cultural e linguística ativa (BCP 47).'),

    direction: z.enum(['ltr', 'rtl'])
      .default('ltr')
      .describe('Direção semântica do texto.'),
  }),

  appearance: z.object({
    themeMode: z.enum(['OBSIDIAN', 'MILK'])
      .describe('Fase lumínica do ecossistema.'),

    motionProfile: z.enum(['FULL', 'REDUCED', 'NONE'])
      .default('FULL')
      .describe('Intensidade cinética baseada na performance do hardware.'),
  }),

  systemStatus: z.object({
    healthScore: HealthScoreSchema
      .describe('Índice de integridade sistêmica (0-100).'),

    isDegradedModeActive: z.boolean()
      .default(false)
      .describe('Flag de resiliência neural para sobrevivência operativa.'),

    lastSyncTimestamp: z.string()
      .datetime()
      .describe('Marca temporal da ancoragem de consciência.'),
  }),
})
.refine((data) => {
  // Validação de Soberania: Brasil exige pt-BR
  if (data.geography.countryCode === 'BR' && data.language.activeLocale !== 'pt-BR') {
    return false;
  }
  return true;
}, {
  message: 'GEOPOLITICAL_INCONSISTENCY: Locale mismatch with Country Sovereignty.',
  path: ['language', 'activeLocale']
})
.readonly();

export type ISovereignContext = z.infer<typeof SovereignContextSchema>;
