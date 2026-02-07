// libs/foundation/sovereign-context/src/lib/SovereignContextManager.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextManager
 * @version 2.4.0
 * @description Fábrica imutável de alta performance para ignição da consciência sistêmica.
 * Transmuta infraestrutura bruta em realidade operativa auditável com precisão nanométrica.
 * @protocol OEDP-V5.5 - High Precision & Forensic Integrity.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import {
  SovereignContextSchema,
  ISovereignContext
} from './schemas/SovereignContext.schema';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine } from '@agentevai/internationalization-engine';

/**
 * @interface ISovereignConsciousnessPacket
 * @description ADN de execução que ancora o estado global e o rastro forense.
 */
export interface ISovereignConsciousnessPacket extends ISovereignContext {
  /** Identificador único inalterável da jornada para correlação de eventos IA */
  readonly correlationIdentifier: string;
  /** Ponto de origem física da ignição do sistema */
  readonly ignitionPoint: 'EDGE_RUNTIME' | 'SERVER_CORE' | 'ADMIN_COCKPIT';
  /** Assinatura de integridade da versão do aparato de consciência */
  readonly apparatusFingerprint: string;
  /** Latência de inicialização em milissegundos para auditoria de performance */
  readonly ignitionLatencyInMilliseconds: number;
}

/**
 * @name CreateSovereignContext
 * @function
 * @description Realiza a ignição do sistema, validando o ADN e estabelecendo a Soberania Local.
 * 
 * @param {unknown} infrastructureSnapshot - Dados brutos (Request, Geo, Headers).
 * @param {ISovereignConsciousnessPacket['ignitionPoint']} origin - Contexto de nascimento.
 * @returns {ISovereignConsciousnessPacket} Realidade purificada e ancorada.
 * @throws {SovereignError} Se a integridade sistêmica for violada na partida.
 */
export const CreateSovereignContext = (
  infrastructureSnapshot: unknown,
  origin: ISovereignConsciousnessPacket['ignitionPoint'] = 'EDGE_RUNTIME'
): ISovereignConsciousnessPacket => {
  const startTimestamp = performance.now();
  const apparatusName = 'SovereignContextManager';
  const fileLocation = 'libs/foundation/sovereign-context/src/lib/SovereignContextManager.ts';
  const apparatusVersion = '2.4.0';

  // 1. Geração de Ancoragem (Correlation Identifier)
  const correlationIdentifier = crypto.randomUUID();

  // 2. Aduana de ADN (Safe Structural Validation)
  const validationResult = SovereignContextSchema.safeParse(infrastructureSnapshot);

  // 3. Protocolo de Resiliência: Colapso de Consciência (Atomizado)
  if (!validationResult.success) {
    const errorPacket = handleConsciousnessCollapse({
      snapshot: infrastructureSnapshot,
      errors: validationResult.error,
      origin,
      correlationIdentifier,
      apparatusName,
      fileLocation,
      version: apparatusVersion
    });

    throw errorPacket;
  }

  // 4. Extração e Sincronia de Localidade
  const contextData = validationResult.data;

  // 5. Normalização de Consciência Linguística
  const activeLocale = SovereignTranslationEngine.resolveLocale(contextData.language.activeLocale);

  // 6. Cálculo de Latência de Ignição (Swiss Precision)
  const endTimestamp = performance.now();
  const ignitionLatencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

  // 7. Telemetria de Sucesso Enriquecida
  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'IGNITION_SUCCESS',
    message: `Soberania Estabelecida em ${ignitionLatencyInMilliseconds}ms: [${activeLocale}] - ${contextData.geography.regionName}`,
    traceIdentifier: correlationIdentifier,
    metadata: {
      health: contextData.systemStatus.healthScore,
      isResilient: contextData.systemStatus.isDegradedModeActive,
      latency: ignitionLatencyInMilliseconds,
      origin
    }
  });

  return Object.freeze({
    ...contextData,
    correlationIdentifier,
    ignitionPoint: origin,
    apparatusFingerprint: `SH-${apparatusName}-${apparatusVersion}`,
    ignitionLatencyInMilliseconds
  });
};

/**
 * @name handleConsciousnessCollapse
 * @private
 * @description Helper atômico para processar falhas catastróficas de ADN na ignição.
 * @improvement Proativa: Isolamento da lógica de erro para manter o fluxo principal puro.
 */
function handleConsciousnessCollapse(parameters: {
  snapshot: unknown;
  errors: any;
  origin: string;
  correlationIdentifier: string;
  apparatusName: string;
  fileLocation: string;
  version: string;
}): SovereignError {
  const { snapshot, errors, origin, correlationIdentifier, apparatusName, fileLocation, version } = parameters;

  // Registro imediato de pânico sistêmico
  SovereignLogger({
    severity: 'CRITICAL',
    apparatus: apparatusName,
    operation: 'IGNITION_FAILURE',
    message: `Violación de ADN: Ignição via ${origin} abortada por inconsistência regional grave.`,
    traceIdentifier: correlationIdentifier,
    metadata: {
      zodError: errors.flatten(),
      origin
    }
  });

  return new SovereignError({
    uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-CORE-0001'),
    i18nMappingKey: 'CONSCIOUSNESS_COLLAPSE',
    severity: 'FATAL',
    apparatusMetadata: {
      name: apparatusName,
      version: version,
      fileLocation
    },
    runtimeSnapshot: {
      inputPayload: { snapshot, origin },
      correlationIdentifier,
      validationIssues: errors.issues
    },
    forensicTrace: {
      timestamp: new Date().toISOString(),
      stack: new Error().stack || 'ST_UNAVAILABLE'
    },
    recoverySuggestion: 'O ruteamento geográfico falhou em prover o país ou slug de cidade. Verifique o Middleware de Geofencing.'
  });
}