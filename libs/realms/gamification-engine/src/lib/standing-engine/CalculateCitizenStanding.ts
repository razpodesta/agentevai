/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateCitizenStanding
 * @version 7.0.0
 * @protocol OEDP-V7.0 - High Performance Merit Engine
 * @description Motor de transmutação de eventos sociais em Standing.
 * CURADO: Desacoplado do Identity-Domain e integrado ao Registry V7.
 */

import {
  SovereignLogger,
  SovereignLoggerSchema
} from '@agentevai/sovereign-logger';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Zenith */
import {
  CalculateCitizenStandingInputSchema,
  type ICalculateCitizenStandingInput
} from './schemas/CalculateCitizenStanding.schema.js';
import {
  ReputationScoreSchema,
  type ReputationScore
} from '@agentevai/types-common';

/**
 * @section Matriz de Pesos de Mérito (Soberania Matemática)
 */
const MERIT_WEIGHT_REGISTRY: Readonly<Record<string, number>> = Object.freeze({
  COMPLAINT_VERIFIED: 50,
  SUPPORT_RECEIVED: 5,
  SUPPORT_GIVEN: 1,
  SENIORITY_MILESTONE: 10,
  ENTROPY_DETECTED: -100,
  FAKE_NEWS_CONFIRMED: -500
});

/**
 * @name CalculateCitizenStanding
 * @function
 * @description Executa a evolução do standing social com auditoria neural integrada.
 */
export const CalculateCitizenStanding = (
  parametersPayload: ICalculateCitizenStandingInput,
  dictionary: ISovereignDictionary
): ReputationScore => {
  const apparatusName = 'CalculateCitizenStanding';
  const fileLocation = 'libs/realms/gamification-engine/src/lib/standing-engine/CalculateCitizenStanding.ts';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro)
    const data = CalculateCitizenStandingInputSchema.parse(parametersPayload);
    const { correlationIdentifier, impactType, currentReputationScore, neuralMultiplier } = data;

    // 2. REGISTRO TÉCNICO (Pilar I - SSOT)
    SovereignApparatusRegistry.registerApparatus({
      identifier: ApparatusIdentifierSchema.parse(apparatusName),
      authorName: 'Raz Podestá',
      semanticVersion: '7.0.0',
      complexityTier: 'REALM_LOGIC',
      stabilityScore: StabilityScoreSchema.parse(100),
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, correlationIdentifier);

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    // 3. PROCESSAMENTO ARITMÉTICO
    const baseWeight = MERIT_WEIGHT_REGISTRY[impactType as unknown as string] || 0;
    const calculatedDelta = baseWeight * neuralMultiplier;
    const finalCalculatedScore = currentReputationScore + calculatedDelta;

    // 4. SELAGEM DE SAÍDA (Branded Score)
    const evolvedStanding = ReputationScoreSchema.parse(finalCalculatedScore);

    const endTimestamp = performance.now();
    const executionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 5. TELEMETRIA ZENITH (Logger V7)
    const isSanction = calculatedDelta < 0;

    const telemetryPayload = SovereignLoggerSchema.parse({
      severity: isSanction ? 'WARN' : 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'STANDING_TRANSMUTED',
      semanticMessage: translate(isSanction ? 'logStandingDegraded' : 'logStandingEvolved', {
        current: currentReputationScore,
        final: evolvedStanding
      }),
      correlationIdentifier,
      executionLatencyInMilliseconds: executionLatency,
      forensicMetadata: {
        impactType,
        delta: calculatedDelta,
        multiplier: neuralMultiplier
      }
    });

    SovereignLogger(telemetryPayload);

    return evolvedStanding;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GAM-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: parametersPayload.correlationIdentifier,
      severity: 'HIGH'
    });
  }
};
