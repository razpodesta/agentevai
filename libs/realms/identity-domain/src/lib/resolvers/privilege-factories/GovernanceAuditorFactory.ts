/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactory
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Institutional Sovereignty
 * @description Fábrica atômica para resolução de privilégios de auditores de governança.
 * CURA TS2322: Reconciliação nominal via re-selagem interna de ADN.
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
  GovernanceAuditorFactoryBaseSchema,
} from './schemas/GovernanceAuditorFactory.schema.ts';
import { type IPrivilegeFactoryParameters } from '../ResolveIdentityPrivileges.js';

/**
 * @section Constantes de Soberania Institucional
 */
const MINIMUM_STANDING_FOR_EDITORIAL_POWER = 500;
const MINIMUM_STANDING_FOR_ALGORITHMIC_IMMUNITY = 1000;
const VOTING_WEIGHT_STANDARD_AUDITOR = 3;
const VOTING_WEIGHT_SOVEREIGN_AUDITOR = 5;

/**
 * @name GovernanceAuditorFactory
 * @function
 * @description Transmuta o rastro institucional em uma matriz de privilégios de auditoria.
 * 
 * @param {IPrivilegeFactoryParameters} parameters - Parâmetros brutos da ponte (Pai).
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria de autoridade.
 * @returns {IIdentityAttributes} Matriz de atributos selada.
 */
export const GovernanceAuditorFactory = (
  parameters: IPrivilegeFactoryParameters,
  dictionary: ISovereignDictionary
): IIdentityAttributes => {
  const apparatusName = 'GovernanceAuditorFactory';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/privilege-factories/GovernanceAuditorFactory.ts';

  try {
    // 1. ADUANA DE ADN (CURA TS2322: Re-selagem interna injeta a marca nominal)
    const data = GovernanceAuditorFactoryBaseSchema.parse(parameters);

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, 
      apparatusName, 
      key, 
      variables, 
      data.correlationIdentifier
    );

    // 2. DETERMINAÇÃO DE PODER INSTITUCIONAL
    const isIntegrityMaintained = data.reputationStanding >= MINIMUM_STANDING_FOR_EDITORIAL_POWER;
    const isSovereignVerified = data.identityAssuranceLevel === 'IAL3_SOVEREIGN';
    const isImmune = isSovereignVerified && data.reputationStanding > MINIMUM_STANDING_FOR_ALGORITHMIC_IMMUNITY;

    /**
     * @section Selagem de Atributos
     * Retorno validado pelo ADN mestre de atributos de identidade.
     */
    const attributes = IdentityAttributesSchema.parse({
      canPublishOriginalContent: isIntegrityMaintained,
      canEndorsePublicComplaints: isIntegrityMaintained,
      canModerateRegionalEntropy: isSovereignVerified && isIntegrityMaintained,
      isImmuneToAutoModeration: isImmune,
      votingWeightMultiplier: isSovereignVerified ? VOTING_WEIGHT_SOVEREIGN_AUDITOR : VOTING_WEIGHT_STANDARD_AUDITOR,
      isOperatingInDegradedPrivilegeMode: data.reputationStanding < 0
    });

    // 3. TELEMETRIA SOBERANA (Protocolo V6.0: correlationIdentifier)
    const isSanctioned = attributes.isOperatingInDegradedPrivilegeMode;

    SovereignLogger({
      severity: isSanctioned ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'AUDITOR_AUTHORITY_SEALED',
      message: isSanctioned 
        ? translate('logIntegritySanction', { standing: data.reputationStanding })
        : translate('logAuditPrivilegesSealed', { 
            level: data.identityAssuranceLevel, 
            immunity: isImmune ? 'ACTIVE' : 'INACTIVE' 
          }),
      correlationIdentifier: data.correlationIdentifier,
      metadata: { 
        assurance: data.identityAssuranceLevel, 
        standing: data.reputationStanding,
        isImmune 
      }
    });

    return attributes;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ID-4003'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: parameters.correlationIdentifier,
      severity: 'CRITICAL'
    });
  }
};