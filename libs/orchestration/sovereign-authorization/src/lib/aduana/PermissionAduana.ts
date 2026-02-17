/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PermissionAduana
 * @version 7.1.1
 * @protocol OEDP-V7.0 - Law Enforcement Actuator
 * @description Único juiz de autoridade.
 * CURADO: Erro TS2307 erradicado via sincronia de rastro com a célula identity-attributes.
 */

import { SovereignLogger, SovereignLoggerSchema } from '@agentevai/sovereign-logger';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';

/** @section Sincronia de ADN Zenith */
import {
  PermissionAduanaInputSchema,
  type IPermissionAduanaInput
} from './schemas/PermissionAduana.schema.js';

/**
 * @section CURA_TS2307
 * Rastro corrigido: Aponta para a localização atômica correta da definição de poder.
 */
import {
  IdentityAttributesSchema,
  VotingWeightMultiplierSchema,
  type IIdentityAttributes
} from '../identity-attributes/schemas/IdentityAttributes.schema.js';

/**
 * @name ResolveActorPower
 * @function
 * @description Analisa o rastro do ator e emite a matriz de privilégios selada.
 */
export const ResolveActorPower = (
  parametersPayload: IPermissionAduanaInput
): IIdentityAttributes => {
  const apparatusName = 'PermissionAduana';
  const startTimestamp = performance.now();

  // 1. ADUANA DE ADN (Ingresso Seguro)
  const data = PermissionAduanaInputSchema.parse(parametersPayload);
  const { actorPassport, currentReputationScore, requestedRole, correlationIdentifier } = data;

  // 2. REGISTRO TÉCNICO (Pilar I - SSOT)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.1.1',
    complexityTier: 'REALM_LOGIC',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  }, correlationIdentifier);

  // 3. ANÁLISE DE SOBERANIA (A LEI)
  const isSovereignLevel = actorPassport.assuranceLevel === 'IAL3_SOVEREIGN';
  const isHealthyStanding = currentReputationScore >= 0;
  const isEngineer = requestedRole === 'PLATFORM_ENGINEER';

  // 4. DETERMINAÇÃO DE PESO
  let rawWeight = 1;
  if (isSovereignLevel && isHealthyStanding) rawWeight = 3;
  if (isEngineer) rawWeight = 20;

  const weightMultiplier = VotingWeightMultiplierSchema.parse(rawWeight);

  // 5. SELAGEM DA MATRIZ DE PODER
  const attributes = IdentityAttributesSchema.parse({
    canPublishOriginalContent: (isSovereignLevel && isHealthyStanding) || isEngineer,
    canEndorsePublicComplaints: isHealthyStanding || isEngineer,
    canModerateRegionalEntropy: (isSovereignLevel && currentReputationScore > 1000) || isEngineer,
    isImmuneToAutoModeration: isEngineer,
    votingWeightMultiplier: weightMultiplier,
    isOperatingInDegradedPrivilegeMode: !isHealthyStanding && !isEngineer
  });

  const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

  // 6. TELEMETRIA SELADA
  SovereignLogger(SovereignLoggerSchema.parse({
    severity: attributes.isOperatingInDegradedPrivilegeMode ? 'WARN' : 'INFO',
    apparatusIdentifier: apparatusName,
    operationCode: 'POWER_VERDICT_ISSUED',
    semanticMessage: `Veredito de autoridade selado para Ator: ${actorPassport.identifier}.`,
    correlationIdentifier,
    executionLatencyInMilliseconds: executionLatency,
    forensicMetadata: {
      weight: weightMultiplier,
      category: actorPassport.actorCategory,
      degraded: attributes.isOperatingInDegradedPrivilegeMode
    }
  }));

  return attributes;
};
