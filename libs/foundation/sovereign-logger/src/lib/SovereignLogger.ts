/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLogger
 * @version 7.0.0
 * @protocol OEDP-V7.0 - High Performance Intelligence
 * @description Motor de telemetria que integra o Cartório Técnico e mede latência.
 * CURADO: Nomenclatura unificada com o ADN e erradicação de abreviações.
 */

import pino from 'pino';
import { SovereignApparatusRegistry } from '@agentevai/apparatus-metadata-registry';
import { 
  SovereignLoggerSchema, 
  type ISovereignLogger 
} from './schemas/SovereignLogger.schema.js';

/** @type PinoLogMethodSignature */
type PinoLogMethodSignature = (meritObject: object, semanticMessage: string) => void;

const pinoEngine = pino({
  level: process.env['LOG_LEVEL'] || 'info',
  formatters: {
    level: (label: string) => ({ severityLevel: label.toUpperCase() })
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

/**
 * @name SovereignLogger
 * @function
 * @description Orquestrador de telemetria. Valida o ADN e anexa o rastro de versão.
 */
export const SovereignLogger = (payload: ISovereignLogger): void => {
  const apparatusName = 'SovereignLogger';

  try {
    // 1. ADUANA DE INTEGRIDADE (Zod Zenith V4)
    const validatedData = SovereignLoggerSchema.parse(payload);
    
    const { 
      apparatusIdentifier, 
      correlationIdentifier, 
      executionLatencyInMilliseconds 
    } = validatedData;

    // 2. RECUPERAÇÃO DE IDENTIDADE TÉCNICA (Sincronia com o Cartório)
    const versionFingerprint = SovereignApparatusRegistry.getApparatusFingerprint(
      apparatusIdentifier as any
    );

    // 3. COMPOSIÇÃO DO RASTRO FORENSE 360°
    const logEntry = {
      apparatus: apparatusIdentifier,
      fingerprint: versionFingerprint,
      operation: validatedData.operationCode,
      correlation: correlationIdentifier,
      latency: executionLatencyInMilliseconds || 0,
      ...validatedData.forensicMetadata
    };

    // 4. DESPACHO SEMÂNTICO (Otimizado com medição de latência visível)
    const latencyIndicator = executionLatencyInMilliseconds ? ` [⚡ ${executionLatencyInMilliseconds}ms]` : '';
    const logMessage = `[${versionFingerprint}:${validatedData.operationCode}] ${validatedData.semanticMessage}${latencyIndicator}`;

    const logMap: Record<string, PinoLogMethodSignature> = {
      INFO: pinoEngine.info.bind(pinoEngine),
      WARN: pinoEngine.warn.bind(pinoEngine),
      ERROR: pinoEngine.error.bind(pinoEngine),
      CRITICAL: pinoEngine.fatal.bind(pinoEngine)
    };

    logMap[validatedData.severity](logEntry, logMessage);

  } catch (caughtError) {
    pinoEngine.fatal({
      apparatus: apparatusName,
      error: caughtError,
      originalPayload: payload
    }, 'TELEMETRY_ADN_VIOLATION');
  }
};