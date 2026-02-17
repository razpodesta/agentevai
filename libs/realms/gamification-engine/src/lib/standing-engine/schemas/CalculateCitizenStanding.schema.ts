/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateCitizenStandingSchema
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Master DNA Zenith
 * @description ADN para orquestração de mérito social.
 * CURADO: Sincronizado com types-common para erradicar a obsessão por primitivos.
 */

import { z } from 'zod';
import {
  ReputationScoreSchema,
  CitizenIdentifierSchema
} from '@agentevai/types-common';

/**
 * @section Dimensão Semântica
 */
export const ImpactTypeSchema = z.enum([
  'COMPLAINT_VERIFIED',    // Fato confirmado por IA/Enxame
  'SUPPORT_RECEIVED',      // Reconhecimento de pares
  'SUPPORT_GIVEN',         // Engajamento proativo
  'ENTROPY_DETECTED',      // Comportamento tóxico (Sanção)
  'FAKE_NEWS_CONFIRMED',   // Violação de veracidade (Degradação Máxima)
  'SENIORITY_MILESTONE'    // Lealdade ao território
])
.describe('Categorização do evento para processamento aritmético de mérito.')
.brand<'ImpactType'>();

export type ImpactType = z.infer<typeof ImpactTypeSchema>;

/**
 * @name CalculateCitizenStandingInputSchema
 */
export const CalculateCitizenStandingInputSchema = z.object({
  citizenIdentifier: CitizenIdentifierSchema
    .describe('Identificador Zenith do cidadão alvo da transmutação.'),

  currentReputationScore: ReputationScoreSchema
    .describe('O standing social atual extraído do rastro de identidade.'),

  impactType: ImpactTypeSchema,

  neuralMultiplier: z.number()
    .min(0.5).max(10)
    .default(1)
    .describe('Fator de ajuste injetado pelo AI-Neural-Auditor baseado na qualidade da evidência.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
})
.brand<'CalculateCitizenStandingInput'>()
.readonly();

export type ICalculateCitizenStandingInput = z.infer<typeof CalculateCitizenStandingInputSchema>;
