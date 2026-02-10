/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLogger
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Neural Pulse Engine
 * @description Motor de telemetria de alta performance.
 * Saneado para conformidade ESM e rastro forense inquebrável.
 */

import pino from 'pino';
import {
  SovereignLogSchema,
  type ISovereignLog
} from './schemas/SovereignLogger.schema.js';

/**
 * @section Configuração de Engine Soberana
 */
const engine = pino({
  level: process.env['LOG_LEVEL'] || 'info',
  formatters: {
    level: (label: string) => ({ severityLevel: label.toUpperCase() })
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

/**
 * @name SovereignLogger
 * @function
 * @description Orquestrador de telemetria. Valida o ADN antes da emissão.
 */
export const SovereignLogger = (payload: ISovereignLog): void => {
  const apparatusName = 'SovereignLogger';

  try {
    // 1. Aduana de Integridade (Zod Enforcement)
    const validatedData = SovereignLogSchema.parse(payload);

    // 2. Composição do Rastro Forense
    const logEntry = {
      apparatus: validatedData.apparatus,
      operation: validatedData.operation,
      trace: validatedData.correlationIdentifier || 'ORPHAN_TRACE',
      ...validatedData.metadata
    };

    // 3. Despacho Semântico Otimizado
    const logMessage = `[${validatedData.apparatus}:${validatedData.operation}] ${validatedData.message}`;

    const logMap: Record<string, Function> = {
      INFO: engine.info.bind(engine),
      WARN: engine.warn.bind(engine),
      ERROR: engine.error.bind(engine),
      CRITICAL: engine.fatal.bind(engine)
    };

    logMap[validatedData.severity](logEntry, logMessage);

  } catch (error) {
    // Fail-safe em caso de colapso da telemetria
    engine.fatal({
      apparatus: apparatusName,
      error,
      originalPayload: payload
    }, 'TELEMETRY_ADN_VIOLATION');
  }
};
