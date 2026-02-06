/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignLogger
 * Descrição: Orquestrador de telemetria estruturada e rastro forense.
 * Rota Relativa: libs/orchestration/sovereign-logger/src/lib/SovereignLogger.ts
 */

import pino from 'pino';
import { SovereignLogSchema, ISovereignLog } from './schemas/SovereignLogger.schema';

const engine = pino({ 
  level: 'info',
  formatters: { level: (label) => ({ level: label.toUpperCase() }) }
});

export const SovereignLogger = (payload: ISovereignLog): void => {
  // Aduana de integridade do Log
  const data = SovereignLogSchema.parse(payload);

  const entry = {
    timestamp: new Date().toISOString(),
    apparatus: data.apparatus,
    operation: data.operation,
    ...data.metadata
  };

  if (data.severity === 'CRITICAL' || data.severity === 'ERROR') {
    engine.error(entry, data.message);
  } else {
    engine.info(entry, data.message);
  }
};