/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextFacade
 * @version 7.0.1
 * @protocol OEDP-V7.0 - Zenith Runtime Orchestration
 * @description Fachada mestre de reconciliação. Une a Consciência Estática (Borda)
 * com o estado operacional da aplicação.
 * CURADO: Errado TS2345 erradicado via selagem nominal de telemetria.
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

/** @section Sincronia de Borda (Inter-Bunker) */
import { type ISovereignConsciousnessPacket } from '@agentevai/sovereign-consciousness';

/** @section ADN Local */
import {
  SovereignContextFacadeSchema, // CURADO: Nome sincronizado
  type ISovereignContext
} from './schemas/SovereignContextFacade.schema.js';
import { ExecuteGracefulDegradation } from '../../degradation-actuator/DegradationActuator.js';
import { DegradationActuatorInputSchema } from '../../degradation-actuator/schemas/DegradationActuator.schema.js';

/**
 * @name ReconcileSovereignContext
 * @function
 * @description Transmuta o pacote de consciência estática em um contexto operacional dinâmico.
 */
export const ReconcileSovereignContext = (
  consciousnessPacket: ISovereignConsciousnessPacket,
  dictionary: ISovereignDictionary
): ISovereignContext => {
  const apparatusName = 'SovereignContextFacade';
  const startTimestamp = performance.now();
  const { correlationIdentifier } = consciousnessPacket;

  // 1. REGISTRO TÉCNICO (Pilar I - SSOT)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.0.1',
    complexityTier: 'ORGANISM',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  }, correlationIdentifier);

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 2. COMPOSIÇÃO DE REALIDADE (Cura TS2724)
    const contextInitialSnapshot = {
      consciousnessSnapshot: consciousnessPacket,
      sessionMetadata: {
        isHandshakeComplete: true,
        lastInteractionTimestamp: new Date().toISOString()
      }
    };

    // 3. ADUANA DE ADN (Validando a reconciliação)
    const validatedContext = SovereignContextFacadeSchema.parse(contextInitialSnapshot);

    // 4. ATUADOR DE HOMEOSTASE (Injeção de Resiliência)
    const degradationInput = DegradationActuatorInputSchema.parse({
      activeContextSnapshot: validatedContext,
      healthCriticalThreshold: 40,
      correlationIdentifier
    });

    const finalSovereignContext = ExecuteGracefulDegradation(degradationInput, dictionary);

    const endTimestamp = performance.now();
    const executionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 5. TELEMETRIA ZENITH (Cura TS2345)
    /**
     * @section Selagem_de_Rastro
     * Aplicamos o parse do Schema para injetar o [$brand] exigido pelo Logger.
     */
    const telemetryPayload = SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'CONTEXT_RECONCILED',
      semanticMessage: translate('logReconciliationSuccess'),
      correlationIdentifier,
      executionLatencyInMilliseconds: executionLatency,
      forensicMetadata: {
        isDegraded: finalSovereignContext.consciousnessSnapshot.systemStatus.isDegradedModeActive
      }
    });

    SovereignLogger(telemetryPayload);

    return finalSovereignContext;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-CORE-0002'),
      apparatus: apparatusName,
      location: 'libs/foundation/sovereign-context/src/lib/facade/sovereign-context/SovereignContextFacade.ts',
      correlationIdentifier,
      severity: 'FATAL'
    });
  }
};
