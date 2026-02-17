/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ActorPassport
 * @version 7.3.1
 * @protocol OEDP-V7.3 - Forensic Registry Actuator
 * @description Motor que transmuta dados brutos de atores em passaportes selados.
 * Integra-se ao SovereignDataVault para garantir a anonimização de rastro civil.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total via ADN nominal.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
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
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';
import { SovereignDataVault } from '@agentevai/sovereign-data-vault';

/** @section Sincronia de ADN Zenith */
import {
  ActorPassportSchema,
  type IActorPassport
} from './schemas/ActorPassport.schema.js';

/**
 * @name SealActorPassport
 * @function
 * @async
 * @description Valida, anonimiza rastro sensível e sela o passaporte no Cartório do Ser.
 *
 * @param {unknown} rawActorPayload - Dados brutos do ator (Cidadão, Órgão ou Empresa).
 * @param {string} correlationIdentifier - Identificador Zenith para rastro forense.
 * @param {ISovereignDictionary} dictionary - Silo linguístico regionalizado.
 * @returns {Promise<IActorPassport>} Passaporte selado e inalterável.
 */
export const SealActorPassport = async (
  rawActorPayload: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): Promise<IActorPassport> => {
  const apparatusName = 'ActorPassport';
  const fileLocation = 'libs/realms/actor-registry/src/lib/actor-passport/ActorPassport.ts';
  const startTimestamp = performance.now();

  // 1. REGISTRO TÉCNICO (Pilar I - SSOT)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.3.1',
    complexityTier: 'REALM_LOGIC',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  }, correlationIdentifier);

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 2. ADUANA DE ADN (Zenith V4 Verification)
    const validatedPassport = ActorPassportSchema.parse(rawActorPayload);

    /**
     * @section Proteção_de_Rastro_PII
     * Se for pessoa física, o identificador é anonimizado antes de qualquer telemetria.
     */
    if (validatedPassport["actorCategory"] === 'NATURAL_PERSON') {
       SovereignDataVault.anonymize(
         validatedPassport["identifier"] as unknown as string,
         correlationIdentifier,
         dictionary
       );
    }

    const endTimestamp = performance.now();
    const executionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    // 3. TELEMETRIA NEURAL (Selo Nominal V7)
    SovereignLogger(SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'PASSPORT_SEALED',
      semanticMessage: translate('logPassportSealed', {
        identifier: validatedPassport["identifier"],
        category: validatedPassport["actorCategory"]
      }),
      correlationIdentifier,
      executionLatencyInMilliseconds: executionLatency,
      forensicMetadata: {
        category: validatedPassport["actorCategory"],
        assurance: validatedPassport["assuranceLevel"]
      }
    }));

    return validatedPassport;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-REG-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'CRITICAL',
      recoverySuggestion: 'Validar integridade do rastro civil ou disponibilidade do Sovereign Data Vault.'
    });
  }
};
