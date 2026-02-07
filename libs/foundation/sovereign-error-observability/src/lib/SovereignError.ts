// libs/foundation/sovereign-error-observability/src/lib/SovereignError.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignError
 * @version 2.3.0
 * @description Motor operativo de transmutação de falhas e diagnósticos.
 * Converte entropia sistêmica em Pacotes de Dados Soberanos (ADN v2.1.0) 
 * com captura de metadados de telemetria de alta precisão.
 * @protocol OEDP-V5.5 - High Resilience & Neural Visibility.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import {
  SovereignErrorSchema,
  ISovereignError,
  SovereignErrorCodeSchema
} from './schemas/SovereignError.schema';

/**
 * @class SovereignError
 * @extends Error
 * @description Unidade fundamental de observabilidade de falhas.
 * Projetado para ser processado pelo AI-Neural-Auditor e persistido em rastro forense.
 */
export class SovereignError extends Error {
  /** O ADN purificado e imutável da falha */
  public readonly packet: ISovereignError;

  constructor(payload: ISovereignError) {
    // 1. Validação Aduaneira (Zod 1000% Mastery)
    // Garante que o pacote de erro não contém dados corrompidos antes da emissão.
    const validatedPacket = SovereignErrorSchema.parse(payload);

    // 2. Invocação do Constructor Nativo
    // Formatação semântica para logs de console tradicionais (Legacy Support).
    super(`[${validatedPacket.uniqueErrorCode}] ${validatedPacket.apparatusMetadata.name} v${validatedPacket.apparatusMetadata.version}: ${validatedPacket.i18nMappingKey}`);

    this.name = 'SovereignError';
    this.packet = validatedPacket;

    // 3. Captura Forense de Pilha (V8 Integration)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SovereignError);
    }
  }

  /**
   * @method transmute
   * @static
   * @description Fábrica de elite para converter exceções nativas ou objetos desconhecidos
   * em erros soberanos estruturados. Ideal para capturar falhas em APIs de Terceiros.
   */
  public static transmute(
    nativeError: unknown,
    context: {
      code: string;
      apparatus: string;
      location: string;
      correlationIdentifier: string;
      severity?: ISovereignError['severity'];
      recoverySuggestion?: string;
    }
  ): SovereignError {
    const errorInstance = nativeError instanceof Error 
      ? nativeError 
      : new Error(typeof nativeError === 'object' ? JSON.stringify(nativeError) : String(nativeError));

    // Captura proativa de uso de memória (Node.js fallback)
    const memoryUsageSnapshot = typeof process !== 'undefined' 
      ? Math.round(process.memoryUsage().heapUsed / 1024 / 1024) 
      : undefined;

    return new SovereignError({
      uniqueErrorCode: SovereignErrorCodeSchema.parse(context.code),
      i18nMappingKey: 'GENERIC_INFRASTRUCTURE_FAILURE',
      severity: context.severity || 'HIGH',
      apparatusMetadata: {
        name: context.apparatus,
        version: '2.3.0',
        fileLocation: context.location
      },
      runtimeSnapshot: {
        inputPayload: { 
          originalMessage: errorInstance.message,
          errorType: errorInstance.name,
          platform: typeof window === 'undefined' ? 'SERVER/EDGE' : 'BROWSER'
        },
        correlationIdentifier: context.correlationIdentifier,
        memoryUsage: memoryUsageSnapshot
      },
      forensicTrace: {
        timestamp: new Date().toISOString(),
        stack: errorInstance.stack || 'STACK_UNAVAILABLE'
      },
      recoverySuggestion: context.recoverySuggestion || 'Acionar o AI-Neural-Auditor para análise de rastro de IP e estado do Monorepo.'
    });
  }

  /**
   * @method capture
   * @static
   * @description Atalho de elite para criação rápida de erros com ADN validado.
   */
  public static capture(payload: ISovereignError): SovereignError {
    return new SovereignError(payload);
  }

  /**
   * @method getDiagnosticReport
   * @description Gera um relatório técnico denso para o AI-Neural-Auditor.
   * Utiliza um sumário neural para facilitar o reconhecimento de padrões.
   */
  public getDiagnosticReport(): string {
    const reportPayload = {
      fingerprint: `F-${this.packet.uniqueErrorCode}-${this.packet.runtimeSnapshot.correlationIdentifier}`,
      neuralSummary: {
        errorCode: this.packet.uniqueErrorCode,
        apparatus: `${this.packet.apparatusMetadata.name}@${this.packet.apparatusMetadata.version}`,
        location: this.packet.apparatusMetadata.fileLocation,
        severity: this.packet.severity
      },
      diagnosticContext: {
        issues: this.packet.runtimeSnapshot.validationIssues || [],
        memory: this.packet.runtimeSnapshot.memoryUsage ? `${this.packet.runtimeSnapshot.memoryUsage}MB` : 'N/A',
        timestamp: this.packet.forensicTrace.timestamp
      },
      recoveryDirective: this.packet.recoverySuggestion || 'CONSULT_SOVEREIGN_ARCHITECT'
    };

    return JSON.stringify(reportPayload);
  }

  /**
   * @method toJSON
   * @description Garante que ao serializar o erro, o pacote ADN seja o output primário,
   * facilitando o transporte via HTTP/JSON para o admin-cms.
   */
  public toJSON(): ISovereignError {
    return this.packet;
  }
}