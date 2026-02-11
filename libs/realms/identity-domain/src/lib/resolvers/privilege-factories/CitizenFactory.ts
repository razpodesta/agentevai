/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenFactory
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance & Nominal Integrity
 * @description Fábrica atômica que transmuta rastro de cidadania em atributos de autoridade.
 * CURA TS2322: Reconciliação de contratos nominais via re-selagem interna de ADN.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Domínio */
import {
  IdentityAttributesSchema,
  IIdentityAttributes
} from '../../schemas/UserIdentity.schema.js';
import { 
  CitizenFactoryBaseSchema,
} from './schemas/CitizenFactory.schema.js';
import { type IPrivilegeFactoryParameters } from '../ResolveIdentityPrivileges.js';

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
 * @param {IPrivilegeFactoryParameters} parameters - Parâmetros brutos do orquestrador (Ponte).
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria de autoridade.
 * @returns {IIdentityAttributes} Matriz de atributos selada e imutável.
 */
export const CitizenFactory = (
  parameters: IPrivilegeFactoryParameters,
  dictionary: ISovereignDictionary
): IIdentityAttributes => {
  const apparatusName = 'CitizenFactory';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/privilege-factories/CitizenFactory.ts';

  try {
    // 1. ADUANA DE ADN (CURA TS2322: Re-selagem interna injeta a marca nominal)
    const data = CitizenFactoryBaseSchema.parse(parameters);

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, 
      apparatusName, 
      key, 
      variables, 
      data.correlationIdentifier
    );

    // 2. LÓGICA DE DETERMINAÇÃO DE PODER (Sincronia NIST)
    const isHealthyStanding = data.reputationStanding >= 0;
    const isHostileStanding = data.reputationStanding < THRESHOLD_FOR_HOSTILE_BEHAVIOR;
    const isVerifiedAccount = data.identityAssuranceLevel !== 'IAL1_UNVERIFIED';
    const isSovereignAccount = data.identityAssuranceLevel === 'IAL3_SOVEREIGN';

    // 3. CÁLCULO DE PESO DE VOTO (Determinismo NIST 800-63A)
    let calculatedVotingWeight = WEIGHT_IAL1_ANONYMOUS;
    if (isSovereignAccount) calculatedVotingWeight = WEIGHT_IAL3_SOVEREIGN;
    else if (isVerifiedAccount) calculatedVotingWeight = WEIGHT_IAL2_VERIFIED;

    /**
     * @section Selagem de Atributos
     * Retorno validado pelo ADN mestre de atributos de identidade.
     */
    const attributes = IdentityAttributesSchema.parse({
      canPublishOriginalContent: !isHostileStanding && isVerifiedAccount && data.reputationStanding > THRESHOLD_FOR_CONTENT_CREATION,
      canEndorsePublicComplaints: !isHostileStanding && isHealthyStanding,
      canModerateRegionalEntropy: false,
      isImmuneToAutoModeration: false,
      votingWeightMultiplier: isHostileStanding ? WEIGHT_IAL1_ANONYMOUS : calculatedVotingWeight,
      isOperatingInDegradedPrivilegeMode: isHostileStanding
    });

    // 4. TELEMETRIA NEURAL SINCRO (Protocolo V6.0: correlationIdentifier)
    SovereignLogger({
      severity: isHostileStanding ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'CITIZEN_AUTHORITY_SEALED',
      message: isHostileStanding 
        ? translate('logHostileStatus', { standing: data.reputationStanding })
        : translate('logAuthorityResolved', { weight: attributes.votingWeightMultiplier }),
      correlationIdentifier: data.correlationIdentifier,
      metadata: { 
        assurance: data.identityAssuranceLevel, 
        standing: data.reputationStanding,
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