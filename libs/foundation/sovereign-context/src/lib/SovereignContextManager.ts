/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextManager
 * @version 2.5.0
 * @protocol OEDP-V5.5 - High Precision & Neural Integrity
 * @description Fábrica imutável de elite para ignição da consciência sistêmica.
 * Integra a Trindade Geopolítica (Manifesto 0018) e sela o rastro forense de borda.
 */

import { z } from 'zod';
import {
  SovereignContextSchema,
  type ISovereignContext
} from './schemas/SovereignContext.schema.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  TransmuteGeopoliticalId
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
 * @description Ponto de ignição mestre. Valida o ADN territorial e estabelece a Soberania.
 *
 * @param {unknown} infrastructureSnapshot - Dados brutos (Request, Geo, Headers).
 * @param {ISovereignConsciousnessPacket['ignitionPoint']} origin - Contexto de nascimento.
 * @returns {ISovereignConsciousnessPacket} Realidade purificada e ancorada.
 */
export const CreateSovereignContext = (
  infrastructureSnapshot: unknown,
  origin: ISovereignConsciousnessPacket['ignitionPoint'] = 'EDGE_RUNTIME'
): ISovereignConsciousnessPacket => {
  const startTimestamp = performance.now();
  const apparatusName = 'SovereignContextManager';
  const apparatusVersion = '2.5.0';
  const fileLocation = 'libs/foundation/sovereign-context/src/lib/SovereignContextManager.ts';

  // 1. Geração de Ancoragem Forense
  const correlationIdentifier = crypto.randomUUID();

  // 2. Aduana de ADN (Sincronia com Manifesto 0018)
  const validationResult = SovereignContextSchema.safeParse(infrastructureSnapshot);

  // 3. Protocolo de Resiliência: Tratamento de Colapso de Consciência
  if (!validationResult.success) {
    throw handleConsciousnessCollapse({
      snapshot: infrastructureSnapshot,
      errors: validationResult.error,
      origin,
      correlationIdentifier,
      apparatusName,
      fileLocation,
      version: apparatusVersion
    });
  }

  const contextData = validationResult.data;

  // 4. Sincronia de Soberania (Trindade Geopolítica)
  // Garante que o país (BR) e o locale (pt-BR) estão em ressonância harmônica.
  const countryCode = contextData.geography.countryCode;
  const activeLocale = SovereignTranslationEngine.resolveLocale(contextData.language.activeLocale);
  const routeSlug = TransmuteGeopoliticalId.countryToRoute(countryCode);

  // 5. Cálculo de Latência de Ignição (Swiss Precision)
  const endTimestamp = performance.now();
  const ignitionLatencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

  // 6. Telemetria de Sucesso Enriquecida para IA
  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'IGNITION_SUCCESS',
    message: `Soberania [${countryCode}] estabelecida em ${ignitionLatencyInMilliseconds}ms via ${routeSlug}.`,
    traceIdentifier: correlationIdentifier,
    metadata: {
      region: contextData.geography.regionName,
      city: contextData.geography.citySlug,
      locale: activeLocale,
      latency: ignitionLatencyInMilliseconds,
      healthScore: contextData.systemStatus.healthScore,
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
 * @name handleConsciousnessCollapse
 * @private
 */
function handleConsciousnessCollapse(parameters: {
  readonly snapshot: unknown;
  readonly errors: z.ZodError;
  readonly origin: string;
  readonly correlationIdentifier: string;
  readonly apparatusName: string;
  readonly fileLocation: string;
  readonly version: string;
}): SovereignError {
  const { snapshot, errors, origin, correlationIdentifier, apparatusName, fileLocation, version } = parameters;

  // Log de Pânico Técnico para o AI-Neural-Auditor
  SovereignLogger({
    severity: 'CRITICAL',
    apparatus: apparatusName,
    operation: 'IGNITION_FAILURE',
    message: `Violación de ADN: Colapso de consciência em ${origin}. Território ilegível.`,
    traceIdentifier: correlationIdentifier,
    metadata: {
      validationIssues: errors.flatten(),
      providedSnapshot: snapshot
    }
  });

  return new SovereignError({
    uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-CORE-0001'),
    i18nMappingKey: 'CONSCIOUSNESS_COLLAPSE',
    severity: 'FATAL',
    apparatusMetadata: { name: apparatusName, version, fileLocation },
    runtimeSnapshot: {
      inputPayload: snapshot,
      correlationIdentifier,
      validationIssues: errors.issues
    },
    forensicTrace: {
      timestamp: new Date().toISOString(),
      stack: new Error().stack || 'ST_UNAVAILABLE'
    },
    recoverySuggestion: 'Falha crítica na resolução geográfica. Verifique o rastro do TerritorialAnchor e os limites de Geofencing.'
  });
}
