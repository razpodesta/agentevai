/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLogger
 * @version 5.0.0
 * @protocol OEDP-V6.5 - High Performance Intelligence
 * @description Motor de telemetria que integra o Cartório Técnico e mede latência.
 * CURADO: Erradicado tipo 'Function' e injeção de Fingerprint automatizada.
 */

import pino from 'pino';
import { SovereignApparatusRegistry } from '@agentevai/apparatus-metadata-registry';
import { 
  SovereignLogInputSchema, 
  type ISovereignLogInput 
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
export const SovereignLogger = (payload: ISovereignLogInput): void => {
  const apparatusName = 'SovereignLogger';

  try {
    // 1. ADUANA DE INTEGRIDADE (Zod Zenith)
    const validatedData = SovereignLogInputSchema.parse(payload);
    const { apparatus, correlationIdentifier, latencyInMilliseconds } = validatedData;

    // 2. RECUPERAÇÃO DE IDENTIDADE TÉCNICA (Integração com Registry)
    // Buscamos o rastro de versão do aparato que está emitindo o log.
    const apparatusFingerprint = SovereignApparatusRegistry.getApparatusFingerprint(
      apparatus as any // Casting nominal para busca no Map
    );

    // 3. COMPOSIÇÃO DO RASTRO FORENSE 360°
    const logEntry = {
      apparatusIdentifier: apparatus,
      versionFingerprint: apparatusFingerprint,
      operationCode: validatedData.operation,
      correlationIdentifier,
      executionLatencyMs: latencyInMilliseconds || 0,
      ...validatedData.metadata
    };

    // 4. DESPACHO SEMÂNTICO (Otimizado com medição de latência visível)
    const latencyIndicator = latencyInMilliseconds ? ` [⚡ ${latencyInMilliseconds}ms]` : '';
    const logMessage = `[${apparatusFingerprint}:${validatedData.operation}] ${validatedData.message}${latencyIndicator}`;

    const logMap: Record<ISovereignLogInput['severity'], PinoLogMethodSignature> = {
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