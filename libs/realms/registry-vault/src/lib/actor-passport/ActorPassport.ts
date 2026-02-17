/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ActorPassport
 * @version 7.0.2
 * @protocol OEDP-V7.0 - Forensic Registry Actuator
 */

import { SovereignLogger, SovereignLoggerSchema } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  ActorPassportSchema,
  type IActorPassport
} from './schemas/ActorPassport.schema.js';

/**
 * @name SealActorPassport
 * @function
 * @description Realiza a purificação e selagem dos dados brutos de um ator no Cartório.
 */
export const SealActorPassport = (
  rawPassportData: unknown
): IActorPassport => {
  const apparatusName = 'ActorPassport';

  try {
    // 1. ADUANA DE ADN (Zenith V4)
    const validatedPassport = ActorPassportSchema.parse(rawPassportData);

    /**
     * @section CURA_TS2345 (Branding Seal)
     * O SovereignLogger exige um tipo Branded. Selamos o payload via Schema
     * para injetar o símbolo [$brand] antes do despacho.
     */
    const logPayload = SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'PASSPORT_SEALED',
      semanticMessage: `Rastro de identidade [${validatedPassport.actorCategory}] selado com integridade.`,
      correlationIdentifier: validatedPassport.correlationIdentifier,
      forensicMetadata: {
        actorIdentifier: validatedPassport.identifier,
        category: validatedPassport.actorCategory
      }
    });

    // 2. TELEMETRIA DE REGISTRO
    SovereignLogger(logPayload);

    return validatedPassport;

  } catch (caughtError) {
    const getCorrelationTrace = (input: unknown): string => {
      if (typeof input === 'object' && input !== null && 'correlationIdentifier' in input) {
        return (input as { correlationIdentifier: string }).correlationIdentifier;
      }
      return crypto.randomUUID();
    };

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-REG-1001'),
      apparatus: apparatusName,
      location: 'libs/realms/registry-vault/src/lib/actor-passport/ActorPassport.ts',
      correlationIdentifier: getCorrelationTrace(rawPassportData),
      severity: 'CRITICAL'
    });
  }
};