/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignError
 * @version 6.5.1
 * @protocol OEDP-V6.5 - High Performance Resonance
 * @description Motor que transmuta exceções em Pacotes de Dados Soberanos.
 * CURADO: Implementado o método getDiagnosticReport para análise do Auditor Neural.
 */

import { SovereignApparatusRegistry } from '@agentevai/apparatus-metadata-registry';
import {
  SovereignErrorSchema,
  SovereignErrorCodeSchema,
  type ISovereignError
} from './schemas/SovereignError.schema.js';

export class SovereignError extends Error {
  /** O ADN purificado e imutável da falha */
  public readonly packet: ISovereignError;

  constructor(payload: ISovereignError) {
    const validatedPacket = SovereignErrorSchema.parse(payload);

    super(`[${validatedPacket.uniqueErrorCode}] ${validatedPacket.apparatusMetadata.fingerprint}: ${validatedPacket.i18nMappingKey}`);

    this.name = 'SovereignError';
    this.packet = validatedPacket;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SovereignError);
    }
  }

  /**
   * @method transmute
   * @static
   * @description Fábrica de elite que converte falhas genéricas em rastro técnico, injetando genealogia técnica.
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
      : new Error(typeof nativeError === 'string' ? nativeError : JSON.stringify(nativeError));

    // 1. CONSULTA AO CARTÓRIO (Genealogia Automática)
    const apparatusFingerprint = SovereignApparatusRegistry.getApparatusFingerprint(context.apparatus as any);
    const inventory = SovereignApparatusRegistry.getTechnicalInventory();
    const passport = inventory.find(p => p.identifier === context.apparatus);

    const memorySnapshot = typeof process !== 'undefined'
      ? Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
      : undefined;

    // 2. CONSTRUÇÃO DO PACOTE SOBERANO
    return new SovereignError({
      uniqueErrorCode: SovereignErrorCodeSchema.parse(context.code),
      i18nMappingKey: 'GENERIC_INFRASTRUCTURE_FAILURE',
      severity: context.severity || 'HIGH',
      apparatusMetadata: {
        name: context.apparatus,
        version: passport?.semanticVersion || '0.0.0',
        fileLocation: context.location,
        fingerprint: apparatusFingerprint
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
        stackTrace: errorInstance.stack || 'NO_STACK_AVAILABLE'
      },
      recoverySuggestion: context.recoverySuggestion || 'Acionar Auditor Neural para análise de rastro de versão.'
    });
  }

  /**
   * @method getDiagnosticReport
   * @description Gera rastro estruturado para consumo imediato por IAs de Manutenção.
   * CURA TS2339: Método agora presente na estrutura física da classe.
   */
  public getDiagnosticReport(): string {
    return JSON.stringify({
      fingerprint: this.packet.apparatusMetadata.fingerprint,
      errorCode: this.packet.uniqueErrorCode,
      severity: this.packet.severity,
      trace: this.packet.runtimeSnapshot.correlationIdentifier,
      reconciliationSuggestion: this.packet.recoverySuggestion,
      forensicStack: this.packet.forensicTrace.stackTrace
    });
  }

  public toJSON(): ISovereignError {
    return this.packet;
  }
}
