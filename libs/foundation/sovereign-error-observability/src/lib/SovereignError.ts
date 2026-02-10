/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignError
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Resilience & Neural Resonance
 * @description Motor operativo que transmuta entropia sistêmica em Pacotes de Dados Soberanos.
 * @policy ESM-STRICT: Uso de extensões .js para conformidade NodeNext.
 */

import {
  SovereignErrorSchema,
  SovereignErrorCodeSchema,
  type ISovereignError
} from './schemas/SovereignError.schema.js';

/**
 * @class SovereignError
 * @extends Error
 * @description Unidade fundamental de observabilidade de falhas.
 * Projetada para ser o "Lego de Dor" consumido pelo AI-Neural-Auditor.
 */
export class SovereignError extends Error {
  /** O ADN purificado e imutável da falha */
  public readonly packet: ISovereignError;

  constructor(payload: ISovereignError) {
    // 1. Aduana de Integridade (Zod Enforcement)
    const validatedPacket = SovereignErrorSchema.parse(payload);

    // 2. Ignição do Constructor Nativo
    super(`[${validatedPacket.uniqueErrorCode}] ${validatedPacket.apparatusMetadata.name}: ${validatedPacket.i18nMappingKey}`);

    this.name = 'SovereignError';
    this.packet = validatedPacket;

    // 3. Captura Forense de Pilha (V8 Engine Integration)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SovereignError);
    }
  }

  /**
   * @method transmute
   * @static
   * @description Fábrica de elite que converte exceções genéricas em diagnósticos soberanos.
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
      : new Error(JSON.stringify(nativeError));

    const memorySnapshot = typeof process !== 'undefined'
      ? Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      : undefined;

    return new SovereignError({
      uniqueErrorCode: SovereignErrorCodeSchema.parse(context.code),
      i18nMappingKey: 'GENERIC_INFRASTRUCTURE_FAILURE',
      severity: context.severity || 'HIGH',
      apparatusMetadata: {
        name: context.apparatus,
        version: '3.0.0',
        fileLocation: context.location
      },
      runtimeSnapshot: {
        inputPayload: {
          originalMessage: errorInstance.message,
          errorType: errorInstance.name
        },
        correlationIdentifier: context.correlationIdentifier,
        memoryUsageInMegabytes: memorySnapshot
      },
      forensicTrace: {
        timestamp: new Date().toISOString(),
        stack: errorInstance.stack || 'STACK_TRACE_UNAVAILABLE'
      },
      recoverySuggestion: context.recoverySuggestion || 'Acionar Auditor Neural para análise de rastro.'
    });
  }

  /**
   * @method getDiagnosticReport
   * @description Gera rastro estruturado para consumo imediato por IAs de Manutenção.
   */
  public getDiagnosticReport(): string {
    return JSON.stringify({
      fingerprint: `F-${this.packet.uniqueErrorCode}-${this.packet.runtimeSnapshot.correlationIdentifier}`,
      neuralContext: {
        apparatus: this.packet.apparatusMetadata.name,
        severity: this.packet.severity,
        location: this.packet.apparatusMetadata.fileLocation
      },
      rastro: this.packet.forensicTrace.stack,
      suggestion: this.packet.recoverySuggestion
    });
  }

  public toJSON(): ISovereignError {
    return this.packet;
  }
}
