/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactory
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Institutional Sovereignty
 * @description Fábrica atômica para resolução de privilégios de auditores de governança.
 * Saneado contra radiação técnica, abreviações e números mágicos.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import {
  IdentityAttributesSchema,
  IIdentityAttributes
} from '../../schemas/UserIdentity.schema.js';
import { 
  GovernanceAuditorFactoryInputSchema,
  type IGovernanceAuditorFactoryInput
} from './schemas/GovernanceAuditorFactory.schema.js';

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
 * @param {unknown} parameters - Parâmetros brutos para aduana.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria.
 * @returns {IIdentityAttributes} Matriz de atributos selada.
 */
export const GovernanceAuditorFactory = (
  parameters: unknown,
  dictionary: ISovereignDictionary
): IIdentityAttributes => {
  const apparatusName = 'GovernanceAuditorFactory';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/privilege-factories/GovernanceAuditorFactory.ts';

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro)
    const data = GovernanceAuditorFactoryInputSchema.parse(parameters);

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, data.correlationIdentifier
    );

    // 2. DETERMINAÇÃO DE PODER INSTITUCIONAL
    const isIntegrityMaintained = data.reputationStanding >= MINIMUM_STANDING_FOR_EDITORIAL_POWER;
    const isSovereignVerified = data.identityAssuranceLevel === 'IAL3_SOVEREIGN';
    const isImmune = isSovereignVerified && data.reputationStanding > MINIMUM_STANDING_FOR_ALGORITHMIC_IMMUNITY;

    /**
     * @section Selagem de Atributos
     * Retorno estritamente tipado e validado pelo ADN mestre.
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
        : translate('logAuditPrivilegesSealed', { level: data.identityAssuranceLevel, immunity: isImmune }),
      correlationIdentifier: data.correlationIdentifier,
      metadata: { 
        assurance: data.identityAssuranceLevel, 
        standing: data.reputationStanding,
        isImmune 
      }
    });

    return attributes;

  } catch (caughtError) {
    /** 
     * @section Cura de Rastro Forense 
     * Extração resiliente do correlationIdentifier para o erro.
     */
    const fallbackCorrelationIdentifier = (parameters as IGovernanceAuditorFactoryInput)?.correlationIdentifier || 'ORPHAN_TRACE';

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ID-4003'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: fallbackCorrelationIdentifier,
      severity: 'CRITICAL'
    });
  }
};