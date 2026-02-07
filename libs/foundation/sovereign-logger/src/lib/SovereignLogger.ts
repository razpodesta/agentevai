// libs/foundation/sovereign-logger/src/lib/SovereignLogger.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLogger
 * @version 2.0.0
 * @protocol OEDP-V5.5 - Standard MetaShark
 * @description Motor de telemetria estruturada legível por Inteligência Artificial.
 * Implementa rastro forense síncrono e assíncrono com blindagem de ADN (Zod).
 * @policy ZERO-ANY: Erradicação total de tipagem anárquica.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import pino from 'pino';
import { 
  SovereignLogSchema, 
  ISovereignLog 
} from './schemas/SovereignLogger.schema';

/**
 * @section Configuração de Engine (Performance de Elite 2026)
 * Instância isolada do motor Pino. Otimizada para latência sub-milissegundo.
 */
const engine = pino({
  level: process.env['LOG_LEVEL'] || 'info',
  base: {
    environment: process.env['NODE_ENV'],
    system: 'AGENTEVAI_CORE',
    architecture: 'LEGO_MATRIX_V5'
  },
  formatters: {
    /** 
     * Transmuta o nível numérico para texto em caixa alta 
     * para facilitar o parsing por auditores externos. 
     */
    level: (label: string) => ({ severityLevel: label.toUpperCase() })
  },
  timestamp: pino.stdTimeFunctions.isoTime
});

/**
 * @name SovereignLogger
 * @function
 * @description Orquestrador de telemetria estruturada. 
 * Valida a integridade do rastro antes do despacho para o stream de saída.
 * 
 * @param {ISovereignLog} payload - Dados estruturados conforme o ADN SovereignLogSchema.
 */
export const SovereignLogger = (payload: ISovereignLog): void => {
  const apparatusName = 'SovereignLogger';

  try {
    // 1. Validação Aduaneira (Aduana Zod)
    // Garante que o log possui os metadados necessários para a IA reconstruir o erro.
    const validatedData = SovereignLogSchema.parse(payload);

    // 2. Composição do Rastro Forense (Imutabilidade Garantida)
    const logEntry = Object.freeze({
      apparatus: validatedData.apparatus,
      operation: validatedData.operation,
      traceIdentifier: validatedData.traceIdentifier || 'NO_TRACE_CONTEXT',
      ...validatedData.metadata
    });

    // 3. Despacho Semântico por Severidade
    const messageTemplate = `[${validatedData.apparatus}:${validatedData.operation}] ${validatedData.message}`;

    switch (validatedData.severity) {
      case 'CRITICAL':
        engine.fatal(logEntry, messageTemplate);
        break;
      case 'ERROR':
        engine.error(logEntry, messageTemplate);
        break;
      case 'WARN':
        engine.warn(logEntry, messageTemplate);
        break;
      default:
        engine.info(logEntry, messageTemplate);
    }
  } catch (validationEntropyError) {
    /**
     * @section Protocolo de Fail-Safe
     * Se a telemetria falhar, o sistema emite um sinal de pânico técnico 
     * sem interromper o fluxo vital da aplicação.
     */
    engine.fatal({
      apparatus: apparatusName,
      operation: 'TELEMETRY_ADN_CORRUPTION',
      originalPayload: payload,
      error: validationEntropyError
    }, 'ERRO_CRÍTICO_NA_VALIDAÇÃO_DE_TELEMETRIA');
  }
};