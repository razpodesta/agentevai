/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Master DNA Integrity
 * @description Única Fonte de Verdade (SSOT) para a realidade operativa.
 * Saneado para exportar membros Branded exigidos pelo Hub de Exportação.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy IA-READABLE: Descrições densas para auditoria neural.
 */

import { z } from 'zod';
import { SovereignLocaleSchema, SovereignCountrySchema } from '@agentevai/types-common';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

/** 
 * CURA TS2305: Exportações explícitas de topo. 
 * Estas constantes agora são visíveis pelo Hub de exportação.
 */
export const RegionSlugSchema = z.string()
  .min(2)
  .toLowerCase()
  .describe('Identificador inalterável de ruteamento geográfico.')
  .brand<'RegionSlug'>();

export type RegionSlug = z.infer<typeof RegionSlugSchema>;

export const HealthScoreSchema = z.number()
  .min(0)
  .max(100)
  .describe('Índice de integridade sistêmica calculado em tempo real.')
  .brand<'HealthScore'>();

export type HealthScore = z.infer<typeof HealthScoreSchema>;


/* --- 📍 SEÇÃO 2: SUB-ESQUEMAS ATÔMICOS (BASE SCHEMAS) --- */

export const GeographyContextSchema = z.object({
  countryCode: SovereignCountrySchema,
  stateCode: z.string().length(2).toUpperCase(),
  citySlug: RegionSlugSchema, // Uso da constante de topo
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
  healthScore: HealthScoreSchema, // Uso da constante de topo
  isDegradedModeActive: z.boolean().default(false),
  lastSyncTimestamp: z.string().datetime(),
}).readonly();


/* --- 🏛️ SEÇÃO 3: CONTRATO MESTRE (SEALED INPUT) --- */

export const SovereignContextBaseSchema = z.object({
  geography: GeographyContextSchema,
  language: LanguageContextSchema,
  appearance: AppearanceContextSchema,
  systemStatus: SystemStatusContextSchema,
});

export const SovereignContextSchema = SovereignContextBaseSchema
  .refine((data) => {
    // Lei de Soberania Nacional: Brasil (BR) exige rastro cultural pt-BR
    if (data.geography.countryCode === 'BR' && data.language.activeLocale !== 'pt-BR') {
      return false;
    }
    return true;
  }, { 
    message: 'GEOPOLITICAL_INCONSISTENCY: Locale mismatch with Country Sovereignty.', 
    path: ['language', 'activeLocale'] 
  })
  .brand<'SovereignContext'>()
  .readonly();

export type ISovereignContext = z.infer<typeof SovereignContextSchema>;