/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceAuditorFactory
 * @version 1.1.0
 * @protocol OEDP-V5.5.1 - Institutional Authority
 * @description Fábrica atômica para resolução de privilégios de auditores.
 */

import {
  IdentityAttributesSchema,
  IIdentityAttributes
} from '../../schemas/UserIdentity.schema.js';
import {
  GovernanceAuditorFactoryParametersSchema
} from './schemas/GovernanceAuditorFactory.schema.js';

export const GovernanceAuditorFactory = (
  parameters: unknown // Recebe unknown para forçar a aduana
): IIdentityAttributes => {
  const { reputationStanding, identityAssuranceLevel } =
    GovernanceAuditorFactoryParametersSchema.parse(parameters);

  const isIntegrityMaintained = reputationStanding >= 500;
  const isSovereignVerified = identityAssuranceLevel === 'IAL3_SOVEREIGN';

  return IdentityAttributesSchema.parse({
    canPublishOriginalContent: isIntegrityMaintained,
    canEndorsePublicComplaints: isIntegrityMaintained,
    canModerateRegionalEntropy: isSovereignVerified && isIntegrityMaintained,
    isImmuneToAutoModeration: isSovereignVerified && reputationStanding > 1000,
    votingWeightMultiplier: isSovereignVerified ? 5 : 3,
    isOperatingInDegradedPrivilegeMode: reputationStanding < 0
  });
};
