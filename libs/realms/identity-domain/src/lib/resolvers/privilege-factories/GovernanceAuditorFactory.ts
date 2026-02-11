/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactory
 * @version 3.1.0
 * @protocol OEDP-V6.0 - Institutional Sovereignty
 * @description Fábrica atômica para resolução de privilégios de auditores.
 * CURA TS5097: Sincronização de extensões ESM para .js.
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

/** 
 * @section CURA TS5097
 * Transmutado de .ts para .js para conformidade com moduleResolution: NodeNext.
 */
import { 
  GovernanceAuditorFactoryBaseSchema,
} from './schemas/GovernanceAuditorFactory.schema.js';

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
 */
export const GovernanceAuditorFactory = (
  parameters: IPrivilegeFactoryParameters,
  dictionary: ISovereignDictionary
): IIdentityAttributes => {
  const apparatusName = 'GovernanceAuditorFactory';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/privilege-factories/GovernanceAuditorFactory.ts';

  try {
    // 1. ADUANA DE ADN (Re-selagem interna injeta a marca nominal)
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
     */
    const attributes = IdentityAttributesSchema.parse({
      canPublishOriginalContent: isIntegrityMaintained,
      canEndorsePublicComplaints: isIntegrityMaintained,
      canModerateRegionalEntropy: isSovereignVerified && isIntegrityMaintained,
      isImmuneToAutoModeration: isImmune,
      votingWeightMultiplier: isSovereignVerified ? VOTING_WEIGHT_SOVEREIGN_AUDITOR : VOTING_WEIGHT_STANDARD_AUDITOR,
      isOperatingInDegradedPrivilegeMode: data.reputationStanding < 0
    });

    // 3. TELEMETRIA SOBERANA
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