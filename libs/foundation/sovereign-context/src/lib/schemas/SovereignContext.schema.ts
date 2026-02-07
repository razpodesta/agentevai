/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextSchema
 * @version 2.0.0
 * @description Define o ADN da realidade operacional (Geografia, Idioma, Estética e Saúde).
 * Esta é a Única Fonte de Verdade (SSOT) para o estado do sistema em runtime.
 * @protocol OEDP-V5.5 - Standard MetaShark
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 * Previne a "Obsessão por Primitivos" e garante integridade em operações de Log e IA.
 */
export const RegionSlugSchema = z.string().toLowerCase().brand<'RegionSlug'>();
export type RegionSlug = z.infer<typeof RegionSlugSchema>;

export const HealthScoreSchema = z.number().min(0).max(100).brand<'HealthScore'>();
export type HealthScore = z.infer<typeof HealthScoreSchema>;

/**
 * @name SovereignContextSchema
 * @description Aduana de ADN para o estado global do sistema.
 * @utilization Zod 1000% - Implementa transformações, refinamentos e imutabilidade.
 */
export const SovereignContextSchema = z.object({
  /**
   * @description Dimensão de Soberania Geográfica.
   * Crucial para o AuthorityBridge e ruteamento dinâmico.
   */
  geography: z.object({
    countryCode: z.enum(['br', 'es', 'us'])
      .describe('Código soberano do país ativo para conformidade legal regional.'),

    stateCode: z.string()
      .length(2)
      .toUpperCase()
      .trim()
      .describe('Sigla do estado brasileiro (UF). Base para geofencing.'),

    citySlug: RegionSlugSchema
      .describe('Identificador amigável e único da cidade para ruteamento de denúncias.'),

    regionName: z.string()
      .min(2)
      .trim()
      .describe('Nome legível da localidade para exibição em aparatos de branding.'),

    timezone: z.string()
      .default('America/Sao_Paulo')
      .describe('Fuso horário para precisão em jornalismo e registros forenses.'),
  }),

  /**
   * @description Dimensão de Soberania Linguística.
   * Define como o i18n-engine deve processar as almas linguísticas dos aparatos.
   */
  language: z.object({
    activeLocale: z.enum(['pt-BR', 'es-ES', 'en-US'])
      .describe('Locale ativo que determina qual dicionário .json será carregado.'),

    direction: z.enum(['ltr', 'rtl'])
      .default('ltr')
      .describe('Direção da escrita textual (Visual Semantics).'),
  }),

  /**
   * @description Dimensão de Soberania Estética (Manifesto 0008).
   * Controla a fase lumínica e o comportamento cinético do ecossistema.
   */
  appearance: z.object({
    themeMode: z.enum(['OBSIDIAN', 'MILK'])
      .describe('Esquema de cores ativo: Obsidian (#000) ou Milk (#FFF).'),

    motionProfile: z.enum(['FULL', 'REDUCED', 'NONE'])
      .default('FULL')
      .describe('Nível de intensidade de animações Framer Motion baseado na saúde do sistema.'),
  }),

  /**
   * @description Dimensão de Soberania de Saúde e Resiliência (Manifesto 0010).
   * Monitorado pela IA de Autocura para disparar procedimentos de emergência.
   */
  systemStatus: z.object({
    healthScore: HealthScoreSchema
      .describe('Pontuação de 0 a 100 da integridade sistêmica gerada pelo AI-Neural-Auditor.'),

    isDegradedModeActive: z.boolean()
      .default(false)
      .describe('Quando true, desativa aparatos não vitais para garantir a funcionalidade de denúncia.'),

    lastSyncTimestamp: z.string()
      .datetime()
      .describe('Marca temporal da última sincronização de contexto com o rastro forense.'),
  }),
})
/**
 * @section Refinamentos de Elite
 * Validações cruzadas que garantem que o contexto é logicamente consistente.
 */
.refine((data) => {
  if (data.geography.countryCode === 'br' && data.language.activeLocale !== 'pt-BR') {
    return false; // Alerta de inconsistência geopolítica
  }
  return true;
}, {
  message: 'LOCALE_INCONSISTENT_WITH_COUNTRY',
  path: ['language', 'activeLocale']
})
.readonly();

/**
 * Interface imutável de Elite para consumo em todo o Monorepo.
 */
export type ISovereignContext = z.infer<typeof SovereignContextSchema>;
