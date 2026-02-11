/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextSchema
 * @version 4.0.0
 * @protocol OEDP-V6.0 - Standard MetaShark Zenith
 * @description Define o ADN da realidade operacional. Sincronizado para Zod V4.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  SovereignCountrySchema
} from '@agentevai/types-common';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const RegionSlugSchema = z.string()
  .toLowerCase()
  .describe('Identificador único de ruteamento geográfico.')
  .brand<'RegionSlug'>();

export type RegionSlug = z.infer<typeof RegionSlugSchema>;

export const HealthScoreSchema = z.number()
  .min(0)
  .max(100)
  .describe('Índice de integridade sistêmica (0-100).')
  .brand<'HealthScore'>();

export type HealthScore = z.infer<typeof HealthScoreSchema>;

/**
 * @name SovereignContextBaseSchema
 * @description Estrutura pura para mutações controladas antes da selagem.
 */
export const SovereignContextBaseSchema = z.object({
  geography: z.object({
    countryCode: SovereignCountrySchema
      .describe('Código ISO 3166-1 alpha-2 da soberania nacional ativa.'),

    stateCode: z.string()
      .length(2)
      .toUpperCase()
      .trim()
      .describe('Sigla da Unidade Federativa correspondente.'),

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
      .describe('Direção semântica do texto (Left-to-Right).'),
  }),

  appearance: z.object({
    themeMode: z.enum(['OBSIDIAN', 'MILK'])
      .describe('Fase lumínica do ecossistema (Dark/Light).'),

    motionProfile: z.enum(['FULL', 'REDUCED', 'NONE'])
      .default('FULL')
      .describe('Intensidade cinética baseada na performance do hardware.'),
  }),

  systemStatus: z.object({
    healthScore: HealthScoreSchema,

    isDegradedModeActive: z.boolean()
      .default(false)
      .describe('Sinalizador de resiliência neural para sobrevivência operativa.'),

    lastSyncTimestamp: z.string()
      .datetime()
      .describe('Marca temporal ISO-8601 da ancoragem de consciência.'),
  }),
});

/**
 * @name SovereignContextSchema
 * @description O contrato SELADO e IMUTÁVEL da realidade sistêmica.
 */
export const SovereignContextSchema = SovereignContextBaseSchema
  .refine((data) => {
    // Validação de Soberania Nacional: Brasil exige pt-BR
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
