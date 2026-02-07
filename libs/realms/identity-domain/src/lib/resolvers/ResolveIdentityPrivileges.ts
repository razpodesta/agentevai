// libs/realms/identity-domain/src/lib/resolvers/ResolveIdentityPrivileges.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveIdentityPrivileges
 * @version 1.3.0
 * @protocol OEDP-V5.5 - High Precision & Zero-Any
 * @description Motor de resolução de privilégios e autoridade regional.
 * Mapeia a tríade (Papel, Reputação, Garantia) para um conjunto imutável de
 * capacidades funcionais, gerenciando estados de degradação proativa.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  IIdentityRole,
  IIdentityAttributes,
  ReputationScore,
  IdentityAttributesSchema,
  IIdentityAssuranceLevel
} from '../schemas/UserIdentity.schema';

/**
 * @section Configuração de Thresholds de Elite
 * Define os marcos regulatórios para acionamento de privilégios.
 */
const STANDING_LIMITS = {
  ZENITH: 5000,
  ELITE: 1000,
  NEUTRAL: 0,
  ABYSSAL_BOUNDARY: -1
} as const;

export interface ResolveIdentityPrivilegesParameters {
  readonly coreRole: IIdentityRole;
  readonly reputationStanding: ReputationScore;
  readonly identityAssuranceLevel: IIdentityAssuranceLevel;
  readonly correlationIdentifier: string;
}

/**
 * @name ResolveIdentityPrivileges
 * @function
 * @description Transmuta o status do cidadão em autoridade técnica de interface.
 * 
 * @param {ResolveIdentityPrivilegesParameters} parameters - Snapshot de identidade e contexto.
 * @returns {IIdentityAttributes} Atributos purificados pelo ADN estrutural.
 */
export const ResolveIdentityPrivileges = (
  parameters: ResolveIdentityPrivilegesParameters
): IIdentityAttributes => {
  const apparatusName = 'ResolveIdentityPrivileges';
  const { coreRole, reputationStanding, identityAssuranceLevel, correlationIdentifier } = parameters;

  try {
    // 1. Diagnóstico de Estado de Degradação
    const isUnderSanction = reputationStanding <= STANDING_LIMITS.ABYSSAL_BOUNDARY;
    const hasSovereignAssurance = identityAssuranceLevel === 'IAL3_SOVEREIGN';

    // 2. Inicialização de Atributos (Safe Default)
    let calculatedAttributes: IIdentityAttributes = {
      canPublishOriginalContent: false,
      canEndorsePublicComplaints: false,
      canModerateRegionalEntropy: false,
      isImmuneToAutoModeration: false,
      votingWeightMultiplier: 1,
      isOperatingInDegradedPrivilegeMode: isUnderSanction
    };

    // 3. Orquestração de Privilégios por Papel (Core Logic)
    switch (coreRole) {
      case 'PLATFORM_ENGINEER':
        calculatedAttributes = {
          canPublishOriginalContent: true,
          canEndorsePublicComplaints: true,
          canModerateRegionalEntropy: true,
          isImmuneToAutoModeration: true,
          votingWeightMultiplier: 5,
          isOperatingInDegradedPrivilegeMode: false // Engenheiros são imunes à degradação automática.
        };
        break;

      case 'GOVERNANCE_AUDITOR':
        calculatedAttributes = {
          ...calculatedAttributes,
          canPublishOriginalContent: true,
          canEndorsePublicComplaints: true,
          canModerateRegionalEntropy: true,
          votingWeightMultiplier: hasSovereignAssurance ? 4 : 3
        };
        break;

      case 'REGIONAL_MODERATOR':
        calculatedAttributes = {
          ...calculatedAttributes,
          canEndorsePublicComplaints: true,
          canModerateRegionalEntropy: true,
          votingWeightMultiplier: reputationStanding >= STANDING_LIMITS.ZENITH ? 3 : 2
        };
        break;

      case 'INDEPENDENT_JOURNALIST':
        calculatedAttributes = {
          ...calculatedAttributes,
          canPublishOriginalContent: true,
          canEndorsePublicComplaints: true,
          isImmuneToAutoModeration: reputationStanding >= STANDING_LIMITS.ELITE,
          votingWeightMultiplier: 2
        };
        break;

      case 'VERIFIED_CITIZEN':
      case 'ACTIVE_CITIZEN':
        if (!isUnderSanction) {
          calculatedAttributes = {
            ...calculatedAttributes,
            canEndorsePublicComplaints: true,
            votingWeightMultiplier: hasSovereignAssurance ? 2 : 1
          };
        }
        break;
    }

    // 4. Protocolo de Bloqueio por Entropia (Override de Segurança)
    if (isUnderSanction && coreRole !== 'PLATFORM_ENGINEER') {
      calculatedAttributes = {
        ...calculatedAttributes,
        canPublishOriginalContent: false,
        canEndorsePublicComplaints: false,
        votingWeightMultiplier: 1,
        isOperatingInDegradedPrivilegeMode: true
      };
    }

    // 5. Validação Aduaneira de ADN (Correção Erro TS2741)
    const validatedAttributes = IdentityAttributesSchema.parse(calculatedAttributes);

    // 6. Telemetria de Autoridade
    SovereignLogger({
      severity: isUnderSanction ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'PRIVILEGE_RESOLUTION_SUCCESS',
      message: `Privilégios consolidados para [${coreRole}] com nível [${identityAssuranceLevel}].`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        standing: reputationStanding,
        assurance: identityAssuranceLevel,
        isDegraded: validatedAttributes.isOperatingInDegradedPrivilegeMode
      }
    });

    return validatedAttributes;

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-APP-5003',
      apparatus: apparatusName,
      location: 'libs/realms/identity-domain/src/lib/resolvers/ResolveIdentityPrivileges.ts',
      correlationIdentifier,
      severity: 'CRITICAL'
    });
  }
};