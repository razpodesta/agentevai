/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserIdentity
 * @version 7.3.1
 * @protocol OEDP-V7.0 - High Performance Aggregation
 * @description Orquestrador estratégico de identidade.
 * CURADO: Erradicado TS4111, TS7053 e radiação técnico 'any'.
 */

import { SovereignLogger, SovereignLoggerSchema } from '@agentevai/sovereign-logger';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN Local */
import {
  UserIdentitySchema,
  UserIdentityRecoverySchema,
  type IUserIdentity
} from './schemas/UserIdentity.schema.js';

/**
 * @name IgniteUserIdentity
 * @function
 * @description Transmuta os rastros de múltiplos búnqueres em uma identidade agregada selada.
 */
export const IgniteUserIdentity = (
  rawCompositionPayload: unknown
): IUserIdentity => {
  const apparatusName = 'UserIdentity';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Zenith V4 Aggregation)
    const validatedIdentity = UserIdentitySchema.parse(rawCompositionPayload);

    // 2. REGISTRO TÉCNICO (Pilar I - SSOT)
    SovereignApparatusRegistry.registerApparatus({
      identifier: ApparatusIdentifierSchema.parse(apparatusName),
      authorName: 'Raz Podestá',
      semanticVersion: '7.3.1',
      complexityTier: 'REALM_LOGIC',
      stabilityScore: StabilityScoreSchema.parse(100),
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, validatedIdentity["presence"]["consciousnessCorrelationIdentifier"]);

    const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

    // 3. TELEMETRIA NEURAL (Selo Nominal V7)
    SovereignLogger(SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'IDENTITY_AGGREGATED',
      semanticMessage: `Identidade Soberana ignificada para Ator: ${validatedIdentity["passport"]["identifier"]}.`,
      correlationIdentifier: validatedIdentity["presence"]["consciousnessCorrelationIdentifier"],
      executionLatencyInMilliseconds: executionLatency,
      forensicMetadata: {
        role: validatedIdentity["coreRole"],
        degraded: validatedIdentity["attributes"]["isOperatingInDegradedPrivilegeMode"]
      }
    }));

    return validatedIdentity;

  } catch (caughtError) {
    // 4. RECUPERAÇÃO DE RASTRO SANEADA (Cura Erro TS4111 e any)
    const recoveryResult = UserIdentityRecoverySchema.safeParse(rawCompositionPayload);
    const correlationIdentifierFallback = (recoveryResult.success && recoveryResult.data["presence"])
      ? recoveryResult.data["presence"]["consciousnessCorrelationIdentifier"]
      : crypto.randomUUID();

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ID-7001'),
      apparatus: apparatusName,
      location: 'libs/realms/identity-domain/src/lib/agregates/user-identity/UserIdentity.ts',
      correlationIdentifier: correlationIdentifierFallback as string,
      severity: 'FATAL'
    });
  }
};
