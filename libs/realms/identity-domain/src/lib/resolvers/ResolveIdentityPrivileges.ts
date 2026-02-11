/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveIdentityPrivileges
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Precision & Zero-Any
 * @description Orquestrador de autoridade regional. 
 * CURA TS2322: Reconciliação de contratos nominais entre orquestrador e fábricas.
 * CURA TS2353: Unificação definitiva para correlationIdentifier.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import {
  type IIdentityAttributes,
  type IIdentityAssuranceLevel,
  type ReputationScore,
  IdentityAttributesSchema
} from '../schemas/UserIdentity.schema.js';

/** @section Sincronia de ADN Local */
import {
  ResolveIdentityPrivilegesInputSchema,
  type IResolveIdentityPrivilegesInput
} from './schemas/ResolveIdentityPrivileges.schema.js';

/** @section Fábricas Lego */
import { PlatformEngineerFactory } from './privilege-factories/PlatformEngineerFactory.js';
import { GovernanceAuditorFactory } from './privilege-factories/GovernanceAuditorFactory.js';
import { CitizenFactory } from './privilege-factories/CitizenFactory.js';

/**
 * @section Contrato de Fábrica (Registry Bridge)
 * @description Define a assinatura comum para todas as fábricas de autoridade.
 */
export interface IPrivilegeFactoryParameters {
  readonly reputationStanding: ReputationScore;
  readonly identityAssuranceLevel: IIdentityAssuranceLevel;
  readonly correlationIdentifier: string;
}

/** 
 * @type PrivilegeFactory
 * CURA TS2322: O tipo aceita um objeto que será validado internamente pelas fábricas.
 */
type PrivilegeFactory = (
  parameters: IPrivilegeFactoryParameters, 
  dictionary: ISovereignDictionary
) => IIdentityAttributes;

/**
 * @section Matriz de Autoridade (Registry)
 * CURA TS7053: Mapeamento determinístico via chaves de papel social.
 */
const PRIVILEGE_REGISTRY: Record<string, PrivilegeFactory> = {
  PLATFORM_ENGINEER: PlatformEngineerFactory,
  GOVERNANCE_AUDITOR: GovernanceAuditorFactory,
  REGIONAL_MODERATOR: CitizenFactory,
  INDEPENDENT_JOURNALIST: CitizenFactory,
  VERIFIED_CITIZEN: CitizenFactory,
  ACTIVE_CITIZEN: CitizenFactory,
  ANONYMOUS_CITIZEN: CitizenFactory,
};

/**
 * @name ResolveIdentityPrivileges
 * @function
 * @description Transmuta o rastro de identidade em uma matriz de atributos soberanos.
 * 
 * @param {unknown} rawParameters - Parâmetros brutos para aduana de entrada.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria regional.
 * @returns {IIdentityAttributes} Matriz de atributos selada.
 */
export const ResolveIdentityPrivileges = (
  rawParameters: unknown,
  dictionary: ISovereignDictionary
): IIdentityAttributes => {
  const apparatusName = 'ResolveIdentityPrivileges';
  const fileLocation = 'libs/realms/identity-domain/src/lib/resolvers/ResolveIdentityPrivileges.ts';

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro)
    const validatedData = ResolveIdentityPrivilegesInputSchema.parse(rawParameters);
    const {
      coreRole,
      reputationStanding,
      identityAssuranceLevel,
      correlationIdentifier
    } = validatedData;

    // Pilar 5: Soberania Linguística
    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    // 2. RESOLUÇÃO DINÂMICA
    const rawRoleKey = coreRole as unknown as string;
    const resolvePrivileges = PRIVILEGE_REGISTRY[rawRoleKey] || CitizenFactory;

    // 3. EXECUÇÃO DA FÁBRICA
    /**
     * @note Para sanar o TS2322, as fábricas devem agora realizar o seu próprio 
     * .parse() sobre os parâmetros recebidos para injetar a marca nominal.
     */
    let attributesSnapshot = resolvePrivileges({
      reputationStanding,
      identityAssuranceLevel,
      correlationIdentifier
    }, dictionary);

    // 4. PROTOCOLO DE SANÇÃO DE ENTROPIA
    const isDegraded = reputationStanding < 0 && coreRole !== 'PLATFORM_ENGINEER';

    if (isDegraded) {
      attributesSnapshot = IdentityAttributesSchema.parse({
        ...attributesSnapshot,
        canPublishOriginalContent: false,
        canEndorsePublicComplaints: false,
        isOperatingInDegradedPrivilegeMode: true,
        votingWeightMultiplier: 1
      });
    }

    // 5. TELEMETRIA SINCRO (Protocolo V6.0: correlationIdentifier)
    SovereignLogger({
      severity: isDegraded ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'AUTHORITY_SEALED',
      message: translate(isDegraded ? 'logEntropySanction' : 'logAuthorityConsolidated', {
        role: rawRoleKey
      }),
      correlationIdentifier,
      metadata: { role: rawRoleKey, standing: reputationStanding, isDegraded }
    });

    return attributesSnapshot;

  } catch (caughtError) {
    /** 
     * @section Saneamento Dios Tier (Zero Any)
     * Extração resiliente do rastro de correlação.
     */
    const fallbackCorrelationId = (rawParameters as IResolveIdentityPrivilegesInput)?.correlationIdentifier || 'ORPHAN_TRACE';

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ID-5003'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: fallbackCorrelationId,
      severity: 'CRITICAL'
    });
  }
};