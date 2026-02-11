/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenFactory
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Performance & Zero-Entropy
 * @description Fábrica atômica que transmuta rastro de cidadania em atributos de autoridade.
 * Saneado contra radiação técnica, abreviações e silêncio de telemetria.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import {
  IdentityAttributesSchema,
  type IIdentityAttributes
} from '../../schemas/UserIdentity.schema.js';
import { 
  CitizenFactoryInputSchema, 
  type ICitizenFactoryInput 
} from './schemas/CitizenFactory.schema.js';

/**
 * @section Constantes Semânticas de Soberania
 */
const THRESHOLD_FOR_HOSTILE_BEHAVIOR = -100;
const THRESHOLD_FOR_CONTENT_CREATION = 100;
const WEIGHT_IAL1_ANONYMOUS = 1;
const WEIGHT_IAL2_VERIFIED = 2;
const WEIGHT_IAL3_SOVEREIGN = 3;

/**
 * @name CitizenFactory
 * @function
 * @description Orquestra a distribuição de poder baseada no mérito social e prova de identidade.
 * 
 * @param {ICitizenFactoryInput} parameters - O ADN de entrada validado.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria.
 * @returns {IIdentityAttributes} Matriz de privilégios selada.
 */
export const CitizenFactory = (
  parameters: ICitizenFactoryInput,
  dictionary: ISovereignDictionary
): IIdentityAttributes => {
  const apparatusName = 'CitizenFactory';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/privilege-factories/CitizenFactory.ts';

  try {
    // 1. ADUANA DE ADN (Validando integridade e rastro)
    const { reputationStanding, identityAssuranceLevel, correlationIdentifier } = CitizenFactoryInputSchema.parse(parameters);

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    // 2. LÓGICA DE DETERMINAÇÃO DE PODER
    const isHealthyStanding = reputationStanding >= 0;
    const isHostileStanding = reputationStanding < THRESHOLD_FOR_HOSTILE_BEHAVIOR;
    const isVerifiedAccount = identityAssuranceLevel !== 'IAL1_UNVERIFIED';
    const isSovereignAccount = identityAssuranceLevel === 'IAL3_SOVEREIGN';

    // 3. CÁLCULO DE PESO DE VOTO (Determinismo NIST)
    let calculatedVotingWeight = WEIGHT_IAL1_ANONYMOUS;
    if (isSovereignAccount) calculatedVotingWeight = WEIGHT_IAL3_SOVEREIGN;
    else if (isVerifiedAccount) calculatedVotingWeight = WEIGHT_IAL2_VERIFIED;

    /**
     * @section Selagem de Atributos
     * Utilizamos o Schema de Identidade para carimbar a imutabilidade.
     */
    const attributes = IdentityAttributesSchema.parse({
      canPublishOriginalContent: !isHostileStanding && isVerifiedAccount && reputationStanding > THRESHOLD_FOR_CONTENT_CREATION,
      canEndorsePublicComplaints: !isHostileStanding && isHealthyStanding,
      canModerateRegionalEntropy: false,
      isImmuneToAutoModeration: false,
      votingWeightMultiplier: isHostileStanding ? WEIGHT_IAL1_ANONYMOUS : calculatedVotingWeight,
      isOperatingInDegradedPrivilegeMode: isHostileStanding
    });

    // 4. TELEMETRIA SOBERANA (Protocolo V6.0)
    SovereignLogger({
      severity: isHostileStanding ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'CITIZEN_AUTHORITY_SEALED',
      message: isHostileStanding 
        ? translate('logHostileStatus', { standing: reputationStanding })
        : translate('logAuthorityResolved', { weight: attributes.votingWeightMultiplier }),
      correlationIdentifier,
      metadata: { 
        assurance: identityAssuranceLevel, 
        standing: reputationStanding,
        isDegraded: attributes.isOperatingInDegradedPrivilegeMode
      }
    });

    return attributes;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ID-4002'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: parameters.correlationIdentifier,
      severity: 'HIGH'
    });
  }
};