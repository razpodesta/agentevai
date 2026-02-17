/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AnalyzeHexagonalThermodynamicsSchema
 * @version 7.3.3
 * @protocol OEDP-V7.0 - Zenith Strategic DNA
 * @description ADN de elite para termodinâmica social.
 * CURADO: Sincronia nominal total e inclusão de rastro de Contaminação Espacial.
 */

import { z } from 'zod';
import { H3IndexSchema } from '@agentevai/types-common';

export const EntropyScoreSchema = z.number()
  .min(0).max(10000)
  .brand<'EntropyScore'>();

export type EntropyScore = z.infer<typeof EntropyScoreSchema>;

export const ThermalStateSchema = z.enum([
  'ABSOLUTE_ZERO', 'NOMINAL_COLD', 'ACTIVE_WARM',
  'VIBRANT_ORANGE', 'CRITICAL_INFRA', 'ZENITH_ALERTA'
]).brand<'ThermalState'>();

export type ThermalState = z.infer<typeof ThermalStateSchema>;

export const AnalyzeHexagonalThermodynamicsInputSchema = z.object({
  h3IndexIdentifier: H3IndexSchema,

  /** @section Enxame_de_Eventos */
  events: z.array(z.object({
    eventIdentifier: z.uuid(),
    assuranceLevel: z.enum(['IAL1_UNVERIFIED', 'IAL2_VERIFIED', 'IAL3_SOVEREIGN']),
    neuralSeverityScore: z.number().min(1).max(10),
    publishedAt: z.string().datetime(),
    isInstitutionalResponsePending: z.boolean().default(true)
  })),

  /** @section Vetores_de_Vizinhança (Alibaba Tier) */
  neighboringEntropyScores: z.array(z.object({
    h3Index: H3IndexSchema,
    score: z.number().min(0)
  })).default([]).describe('Influência térmica dos hexágonos adjacentes.'),

  correlationIdentifier: z.uuid()
})
.brand<'AnalyzeHexagonalThermodynamicsInput'>()
.readonly();

export type IAnalyzeHexagonalThermodynamicsInput = z.infer<typeof AnalyzeHexagonalThermodynamicsInputSchema>;

export const ThermalVerdictSchema = z.object({
  h3Index: H3IndexSchema,
  globalEntropyScore: EntropyScoreSchema,
  activeThermalState: ThermalStateSchema,
  spatialContagionFactor: z.number().min(0).max(1).describe('Percentual de calor vindo de vizinhos.'),
  lastPulseAt: z.string().datetime(),
  correlationIdentifier: z.uuid()
}).brand<'ThermalVerdict'>().readonly();

export type IThermalVerdict = z.infer<typeof ThermalVerdictSchema>;
