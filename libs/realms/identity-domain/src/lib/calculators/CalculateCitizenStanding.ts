/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateCitizenStanding
 * @version 1.3.0
 * @protocol OEDP-V5.5 - High Precision & Forensic Integrity
 * @description Motor aritmético atômico para transmutação de eventos sociais em Standing de Reputação.
 * Implementa Clamping de ADN, Multiplicadores de IA e detecção de Inércia Reputacional.
 * @policy ZERO-ANY: Tipagem Nominal Estrita (Branded Types).
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import { z } from 'zod';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  ReputationScoreSchema,
  ReputationScore
} from '../schemas/UserIdentity.schema';

/**
 * @section Taxonomia de Impacto (Soberania Algorítmica)
 * Define os pesos base para cada interação permitida no ecossistema.
 * Extraído para constante imutável fora do escopo funcional para performance.
 */
const BASE_IMPACT_WEIGHTS = {
  COMPLAINT_VERIFIED: 50,    // Validação institucional/IA (+50)
  SUPPORT_RECEIVED: 5,      // Reconhecimento de pares (+5)
  SUPPORT_GIVEN: 1,         // Engajamento proativo (+1)
  SENIORITY_MILESTONE: 10,  // Recompensa por lealdade temporal (+10)
  ENTROPY_DETECTED: -100,   // Comportamento tóxico detectado pela IA (-100)
  FAKE_NEWS_CONFIRMED: -500 // Violação gravíssima de veracidade (-500)
} as const;

/**
 * @name ImpactEventSchema
 * @description Aduana de ADN para eventos de alteração de standing.
 */
const ImpactEventSchema = z.object({
  impactType: z.enum([
    'COMPLAINT_VERIFIED',
    'SUPPORT_RECEIVED',
    'SUPPORT_GIVEN',
    'ENTROPY_DETECTED',
    'FAKE_NEWS_CONFIRMED',
    'SENIORITY_MILESTONE'
  ]).describe('Categoria semântica do evento de impacto social.'),
  
  neuralMultiplier: z.number()
    .min(0.5)
    .max(5)
    .default(1)
    .describe('Fator dinâmico injetado pela IA com base na qualidade do rastro forense.')
}).readonly();

export type IImpactEvent = z.infer<typeof ImpactEventSchema>;

export interface CalculateCitizenStandingParameters {
  readonly currentReputationScore: number;
  readonly impactEvent: IImpactEvent;
  readonly correlationIdentifier: string;
}

/**
 * @name CalculateCitizenStanding
 * @function
 * @description Executa a evolução do standing social do cidadão com precisão de relógio suíço.
 * 
 * @param {CalculateCitizenStandingParameters} parameters - Snapshot atual e evento de impacto.
 * @returns {ReputationScore} Standing resultante validado e grampeado ao ADN.
 */
export const CalculateCitizenStanding = (
  parameters: CalculateCitizenStandingParameters
): ReputationScore => {
  const apparatusName = 'CalculateCitizenStanding';
  const { currentReputationScore, impactEvent, correlationIdentifier } = parameters;

  try {
    // 1. Validação de Integridade de Entrada
    const validatedEvent = ImpactEventSchema.parse(impactEvent);

    // 2. Processamento Cinético do Delta
    const baseWeight = BASE_IMPACT_WEIGHTS[validatedEvent.impactType];
    const calculatedDelta = baseWeight * validatedEvent.neuralMultiplier;
    
    // 3. Aritmética de Evolução e Clamping (Soberania de Fronteira)
    // Impede que o score transborde os limites [-1000, 10000] definidos no UserIdentitySchema.
    const rawNewScore = currentReputationScore + calculatedDelta;
    const clampedScore = Math.min(Math.max(rawNewScore, -1000), 10000);

    // 4. Validação de Saída (Branded Type Enforcement)
    const newReputationScore = ReputationScoreSchema.parse(clampedScore);

    // 5. Telemetria Forense (OEDP-V5.5 Compliant)
    SovereignLogger({
      severity: calculatedDelta < 0 ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'REPUTATION_PULSE_PROCESSED',
      message: `Standing evoluiu de ${currentReputationScore} para ${newReputationScore} (Delta: ${calculatedDelta}).`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        impactType: validatedEvent.impactType,
        appliedMultiplier: validatedEvent.neuralMultiplier,
        isEntropyDetected: calculatedDelta < 0
      }
    });

    return newReputationScore;

  } catch (error) {
    /**
     * @section Resiliência e Transmutação de Erro
     * Falhas no cálculo de reputação são HIGH severity pois afetam o motor de autoridade.
     */
    throw SovereignError.transmute(error, {
      code: 'OS-APP-5002',
      apparatus: apparatusName,
      location: 'libs/realms/identity-domain/src/lib/calculators/CalculateCitizenStanding.ts',
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
};