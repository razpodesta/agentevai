/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextManager
 * @version 5.0.0
 * @protocol OEDP-V6.0 - Zenith Orchestration
 * @description Ponto de ignição da consciência sistêmica. Orquestra a união de Reinos.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { TransmuteGeopoliticalId, type ISovereignDictionary } from '@agentevai/internationalization-engine';

import { 
  SovereignContextSchema, 
  SovereignContextBaseSchema, 
  type ISovereignContext 
} from './schemas/SovereignContext.schema.js';
import { ExecuteGracefulDegradation } from './actuators/DegradationActuator.js';

export interface ISovereignConsciousnessPacket extends ISovereignContext {
  readonly correlationIdentifier: string;
  readonly apparatusFingerprint: string;
  readonly ignitionLatencyInMilliseconds: number;
}

export const CreateSovereignContext = (
  infrastructureSnapshot: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): ISovereignConsciousnessPacket => {
  const startTimestamp = performance.now();
  const apparatusName = 'SovereignContextManager';

  try {
    // 1. ADUANA DE ADN
    const initialValidation = SovereignContextBaseSchema.parse(infrastructureSnapshot);
    const contextAsSovereign = SovereignContextSchema.parse(initialValidation);

    // 2. ATUADOR DE HOMEOSTASE (Atomizado)
    const processedContext = ExecuteGracefulDegradation(contextAsSovereign);

    // 3. SINCRONIA GEOPOLÍTICA (Pilar V)
    const routeSlug = TransmuteGeopoliticalId.countryToRoute(
      processedContext.geography.countryCode, 
      correlationIdentifier, 
      dictionary
    );

    const endTimestamp = performance.now();
    const ignitionLatencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 4. TELEMETRIA SINCRO
    SovereignLogger({
      severity: processedContext.systemStatus.isDegradedModeActive ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'IGNITION_SUCCESS',
      message: `Consciência ancorada via rota [${routeSlug}] em ${ignitionLatencyInMilliseconds}ms.`,
      correlationIdentifier
    });

    return Object.freeze({
      ...processedContext,
      correlationIdentifier,
      apparatusFingerprint: `AGV-CTX-5.0-${routeSlug}`,
      ignitionLatencyInMilliseconds
    });

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-CORE-0001'),
      apparatus: apparatusName,
      location: 'libs/foundation/sovereign-context/src/lib/SovereignContextManager.ts',
      correlationIdentifier,
      severity: 'FATAL'
    });
  }
};