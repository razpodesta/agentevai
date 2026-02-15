/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicTrendAnalyzerSchema
 * @version 6.6.1
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para cálculo de entropia e temperatura social por hexágono H3.
 * Sincronizado para orquestração de mapas de calor cinéticos e rastro de fé pública.
 */

import { z } from 'zod';
import { H3IndexSchema } from '@agentevai/types-common';

/**
 * @section Dimensões Nominais (Branded Types)
 * Impede que scores de entropia sejam confundidos com métricas financeiras ou de identidade.
 */
export const HexagonalTemperatureSchema = z.enum([
  'NOMINAL_COLD',    // Estabilidade absoluta: Território em paz.
  'ACTIVE_WARM',     // Movimentação detectada: Pulso social em crescimento.
  'VIBRANT_ORANGE',  // Alerta de tendência: Risco de crise identificado.
  'CRITICAL_INFRA'   // Colapso iminente: Foco de entropia que exige intervenção.
])
.describe('Temperatura semântica da célula H3 baseada no rastro behaviorista.')
.brand<'HexagonalTemperature'>();

export type HexagonalTemperature = z.infer<typeof HexagonalTemperatureSchema>;

/**
 * @name TrendAnalysisInputSchema
 * @description Aduana de entrada estrita para o motor de análise.
 */
export const TrendAnalysisInputBaseSchema = z.object({
  targetHexagonIndex: H3IndexSchema
    .describe('O identificador inalterável da célula H3 (Resolução 9).'),

  eventCountInWindow: z.number()
    .int()
    .nonnegative()
    .describe('Volume consolidado de denúncias/fatos selados na janela ativa.'),

  averageSeverityScore: z.number()
    .min(0)
    .max(100)
    .describe('Média ponderada da gravidade (Calculada pelo AI-Neural-Auditor).'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
});

/** @section Selagem Nominal de Entrada */
export const TrendAnalysisInputSchema = TrendAnalysisInputBaseSchema
  .brand<'TrendAnalysisInput'>()
  .readonly();

export type ITrendAnalysisInput = z.infer<typeof TrendAnalysisInputSchema>;

/**
 * @name TrendAnalysisResultSchema
 * @description Veredito final do estado térmico do território.
 */
export const TrendAnalysisResultBaseSchema = z.object({
  hexagonIndex: H3IndexSchema,

  currentTemperature: HexagonalTemperatureSchema,

  entropyIndex: z.number()
    .min(0)
    .max(1)
    .describe('Índice normalizado de desordem social no hexágono.'),

  requiresAlertDispatch: z.boolean()
    .default(false)
    .describe('Gatilho para o NotificationNexus em caso de calor crítico.'),

  correlationIdentifier: z.uuid()
});

/** @section Selagem Nominal de Saída */
export const TrendAnalysisResultSchema = TrendAnalysisResultBaseSchema
  .brand<'TrendAnalysisResult'>()
  .readonly();

export type ITrendAnalysisResult = z.infer<typeof TrendAnalysisResultSchema>;
