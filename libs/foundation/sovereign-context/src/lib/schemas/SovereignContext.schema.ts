/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignContextSchema
 * Descrição: Define o ADN da realidade operacional do sistema (Geografia, Idioma, Estética e Saúde).
 * Rota Relativa: libs/foundation/sovereign-context/src/lib/schemas/SovereignContext.schema.ts
 */

import { z } from 'zod';

export const SovereignContextSchema = z.object({
  geography: z.object({
    countryCode: z.enum(['br', 'es', 'us']).describe('Código soberano do país ativo'),
    stateCode: z.string().length(2).toUpperCase().describe('Sigla do estado brasileiro'),
    citySlug: z.string().describe('Identificador amigável da cidade para ruteamento'),
    regionName: z.string().describe('Nome de exibição da localidade'),
  }).describe('Dimensão de Soberania Geográfica'),

  language: z.object({
    activeLocale: z.enum(['pt-BR', 'es-ES', 'en-US']).describe('Identificador de idioma e região'),
    direction: z.enum(['ltr', 'rtl']).default('ltr').describe('Direção da escrita textual'),
  }).describe('Dimensão de Soberania Linguística'),

  appearance: z.object({
    themeMode: z.enum(['OBSIDIAN', 'MILK']).describe('Modo visual ativo'),
    motionProfile: z.enum(['FULL', 'REDUCED']).describe('Nível de intensidade de animações'),
  }).describe('Dimensão de Soberania Estética'),

  systemStatus: z.object({
    healthScore: z.number().min(0).max(100).describe('Pontuação de integridade do sistema via IA'),
    isDegradedModeActive: z.boolean().describe('Gatilho para modo de resiliência e baixo consumo'),
  }).describe('Dimensão de Soberania de Saúde'),
}).readonly();

export type ISovereignContext = z.infer<typeof SovereignContextSchema>;