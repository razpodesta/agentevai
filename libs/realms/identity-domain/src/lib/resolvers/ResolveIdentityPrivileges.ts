/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveIdentityPrivileges
 * @version 2.2.0
 * @protocol OEDP-V5.5.1 - High Precision & Zero-Any
 * @description Orquestrador de autoridade regional.
 * Sincronizado para suportar Branded Types e rastro forense em todas as fábricas.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  type IIdentityAttributes,
  type IIdentityRole,
  type IIdentityAssuranceLevel,
  type ReputationScore,
  IdentityAttributesSchema
} from '../schemas/UserIdentity.schema.js';

// ADN e Fábricas Lego
import {
  ResolveIdentityPrivilegesInputSchema,
  type IResolveIdentityPrivilegesInput
} from './schemas/ResolveIdentityPrivileges.schema.js';
import { PlatformEngineerFactory } from './privilege-factories/PlatformEngineerFactory.js';
import { GovernanceAuditorFactory } from './privilege-factories/GovernanceAuditorFactory.js';
import { CitizenFactory } from './privilege-factories/CitizenFactory.js';

/**
 * @section Contrato de Fábrica (Registry Bridge)
 * Sincronizado com o ADN Branded para erradicar o erro TS2322.
 */
export interface IPrivilegeFactoryParameters {
  readonly reputationStanding: ReputationScore;
  readonly identityAssuranceLevel: IIdentityAssuranceLevel;
  readonly correlationIdentifier: string;
}

type PrivilegeFactory = (parameters: IPrivilegeFactoryParameters) => IIdentityAttributes;

/**
 * @section Matriz de Autoridade (Registry)
 * Mapeamento O(1) estritamente tipado.
 */
const PRIVILEGE_REGISTRY: Record<IIdentityRole, PrivilegeFactory> = {
  PLATFORM_ENGINEER: PlatformEngineerFactory,
  GOVERNANCE_AUDITOR: GovernanceAuditorFactory,
  REGIONAL_MODERATOR: CitizenFactory,
  INDEPENDENT_JOURNALIST: CitizenFactory,
  VERIFIED_CITIZEN: CitizenFactory,
  ACTIVE_CITIZEN: CitizenFactory,
  ANONYMOUS_CITIZEN: CitizenFactory,
};

export const ResolveIdentityPrivileges = (
  rawParameters: unknown
): IIdentityAttributes => {
  const apparatusName = 'ResolveIdentityPrivileges';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/ResolveIdentityPrivileges.ts';

  try {
    // 1. Aduana de ADN (Aqui o 'number' vira 'ReputationScore')
    const validated = ResolveIdentityPrivilegesInputSchema.parse(rawParameters);
    const {
      coreRole,
      reputationStanding,
      identityAssuranceLevel,
      correlationIdentifier
    } = validated;

    // 2. Resolução Dinâmica
    const resolvePrivileges = PRIVILEGE_REGISTRY[coreRole];

    // 3. Execução da Fábrica com rastro forense
    let attributesSnapshot = resolvePrivileges({
      reputationStanding,
      identityAssuranceLevel,
      correlationIdentifier
    });

    // 4. Protocolo de Sanção de Entropia
    if (reputationStanding < 0 && coreRole !== 'PLATFORM_ENGINEER') {
      attributesSnapshot = IdentityAttributesSchema.parse({
        ...attributesSnapshot,
        canPublishOriginalContent: false,
        canEndorsePublicComplaints: false,
        isOperatingInDegradedPrivilegeMode: true,
        votingWeightMultiplier: 1
      });
    }

    // 5. Telemetria Forense
    SovereignLogger({
      severity: attributesSnapshot.isOperatingInDegradedPrivilegeMode ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'AUTHORITY_RESOLVED',
      message: `Matriz de privilégios selada para [${coreRole}].`,
      traceIdentifier: correlationIdentifier,
      metadata: { role: coreRole, isDegraded: attributesSnapshot.isOperatingInDegradedPrivilegeMode }
    });

    return attributesSnapshot;

  } catch (error) {
    const correlationId = (rawParameters as IResolveIdentityPrivilegesInput)?.correlationIdentifier ?? 'NO_TRACE';

    throw SovereignError.transmute(error, {
      code: 'OS-ID-5003',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: correlationId,
      severity: 'CRITICAL'
    });
  }
};
