/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteErrorToDiagnosticPacket
 * @description Função atômica que encapsula erros nativos em contratos soberanos para IA.
 * Rota Relativa: libs/orchestration/sovereign-error-observability/src/lib/TransmuteErrorToDiagnosticPacket.ts
 */

import { SovereignErrorSchema, ISovereignError, SovereignErrorCode } from './schemas/SovereignError.schema';
import { SovereignLogger } from '@agentevai/sovereign-logger';

/**
 * Interface para os parâmetros de transmutação.
 */
export interface TransmuteErrorParameters {
  readonly errorCode: SovereignErrorCode;
  readonly severity: ISovereignError['severity'];
  readonly nativeError: Error;
  readonly apparatusName: string;
  readonly inputData: unknown;
  readonly fileLocation: string;
}

/**
 * @name TransmuteErrorToDiagnosticPacket
 * @function
 * @description Converte exceções em pacotes de dados estruturados para o AI-Neural-Auditor.
 */
export const TransmuteErrorToDiagnosticPacket = (
  parameters: TransmuteErrorParameters
): ISovereignError => {
  const { errorCode, severity, nativeError, apparatusName, inputData, fileLocation } = parameters;

  // 1. Construção do ADN do Erro
  const errorPacket: ISovereignError = {
    uniqueErrorCode: errorCode,
    severity,
    apparatusMetadata: {
      name: apparatusName,
      version: '1.0.0', // Em produção, isto é injetado via Environment
      fileLocation,
    },
    runtimeSnapshot: {
      inputPayload: inputData,
      systemState: {
        nodeVersion: process.version,
        environment: process.env['NODE_ENV'] || 'production',
      },
    },
    forensicTrace: {
      traceId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      stack: nativeError.stack || 'NO_STACK_TRACE_AVAILABLE',
    },
  };

  // 2. Validação de Saída (Self-Audit)
  const validatedError = SovereignErrorSchema.parse(errorPacket);

  // 3. Telemetria Automática Integrada
  SovereignLogger({
    severity: severity === 'FATAL' || severity === 'CRITICAL' ? 'CRITICAL' : 'ERROR',
    apparatus: apparatusName,
    operation: 'ERROR_GENERATION',
    message: `Falha Crítica Registrada: ${validatedError.uniqueErrorCode}`,
    metadata: { 
      traceId: validatedError.forensicTrace.traceId,
      errorType: nativeError.name 
    }
  });

  return validatedError;
};