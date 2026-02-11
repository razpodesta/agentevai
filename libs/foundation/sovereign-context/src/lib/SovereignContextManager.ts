/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextManager
 * @version 4.1.0
 * @protocol OEDP-V6.0 - High Performance & Neural Resilience
 * @description Fábrica de elite para ignição da consciência sistêmica.
 * Implementa Atuador de Degradação Graciosa e Selagem de ADN.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js).
 */

import {
  SovereignContextSchema,
  SovereignContextBaseSchema,
  type ISovereignContext,
  HealthScoreSchema
} from './schemas/SovereignContext.schema.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  TransmuteGeopoliticalId,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/**
 * @interface ISovereignConsciousnessPacket
 * @description ADN de execução que ancora o estado global e o rastro forense.
 */
export interface ISovereignConsciousnessPacket extends ISovereignContext {
  readonly correlationIdentifier: string;
  readonly ignitionPoint: 'EDGE_RUNTIME' | 'SERVER_CORE' | 'ADMIN_COCKPIT';
  readonly apparatusFingerprint: string;
  readonly ignitionLatencyInMilliseconds: number;
}

/**
 * @name CreateSovereignContext
 * @function
 * @description Ponto de ignição mestre. Orquestra a transmutação do rastro.
 */
export const CreateSovereignContext = (
  infrastructureSnapshot: unknown,
  correlationIdentifier: string,
  origin: ISovereignConsciousnessPacket['ignitionPoint'] = 'EDGE_RUNTIME',
  dictionary: ISovereignDictionary
): ISovereignConsciousnessPacket => {
  const startTimestamp = performance.now();
  const apparatusName = 'SovereignContextManager';
  const apparatusVersion = '4.1.0';

  // 1. ADUANA DE ADN (Validação Estrutural)
  const initialValidation = SovereignContextBaseSchema.safeParse(infrastructureSnapshot);

  if (!initialValidation.success) {
    throw new SovereignError({
      uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-CORE-0001'),
      i18nMappingKey: 'CONSCIOUSNESS_COLLAPSE',
      severity: 'FATAL',
      apparatusMetadata: {
        name: apparatusName,
        version: apparatusVersion,
        fileLocation: 'libs/foundation/sovereign-context/src/lib/SovereignContextManager.ts'
      },
      runtimeSnapshot: {
        inputPayload: infrastructureSnapshot,
        correlationIdentifier,
        validationIssues: initialValidation.error.issues
      },
      forensicTrace: {
        timestamp: new Date().toISOString(),
        stack: new Error().stack || 'ST_UNAVAILABLE'
      }
    });
  }

  // 2. ATUADOR DE DEGRADAÇÃO GRACIOSA (Manobra de Resiliência)
  const contextData = ExecuteGracefulDegradation(initialValidation.data, dictionary, correlationIdentifier);

  // 3. SINCRONIA GEOPOLÍTICA (Pilar 5)
  const countryCode = contextData.geography.countryCode;
  const routeSlug = TransmuteGeopoliticalId.countryToRoute(countryCode, correlationIdentifier, dictionary);

  // 4. CÁLCULO DE LATÊNCIA (Swiss Precision)
  const endTimestamp = performance.now();
  const ignitionLatencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

  // 5. TELEMETRIA DE SUCESSO
  SovereignLogger({
    severity: contextData.systemStatus.isDegradedModeActive ? 'WARN' : 'INFO',
    apparatus: apparatusName,
    operation: 'IGNITION_SUCCESS',
    message: `Consciência [${countryCode}] ancorada em ${ignitionLatencyInMilliseconds}ms.`,
    correlationIdentifier,
    metadata: {
      health: contextData.systemStatus.healthScore,
      isDegraded: contextData.systemStatus.isDegradedModeActive,
      origin
    }
  });

  return Object.freeze({
    ...contextData,
    correlationIdentifier,
    ignitionPoint: origin,
    apparatusFingerprint: `AGV-${apparatusName}-${apparatusVersion}-${routeSlug}`,
    ignitionLatencyInMilliseconds
  });
};

/**
 * @name ExecuteGracefulDegradation
 * @function
 * @private
 * @description Atuador ativo que protege o sistema sob estresse térmico/lógico.
 */
function ExecuteGracefulDegradation(
  context: ISovereignContext,
  dictionary: ISovereignDictionary,
  correlationIdentifier: string
): ISovereignContext {
  const apparatusName = 'SovereignContextManager';
  const CRITICAL_HEALTH_THRESHOLD = 40;

  if (context.systemStatus.healthScore < CRITICAL_HEALTH_THRESHOLD) {
    SovereignLogger({
      severity: 'CRITICAL',
      apparatus: apparatusName,
      operation: 'GRACEFUL_DEGRADATION_ACTIVE',
      message: SovereignTranslationEngine.translate(
        dictionary, apparatusName, 'degradedAlert', {}, correlationIdentifier
      ),
      correlationIdentifier,
      metadata: { health: context.systemStatus.healthScore }
    });

    // Mutação Segura: Desativa rastro cinético para preservar CPU
    return SovereignContextSchema.parse({
      ...context,
      appearance: {
        ...context.appearance,
        motionProfile: 'NONE'
      },
      systemStatus: {
        ...context.systemStatus,
        isDegradedModeActive: true
      }
    });
  }

  return context;
}
