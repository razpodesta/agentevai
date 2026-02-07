// libs/realms/identity-domain/src/index.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityDomainHub
 * @version 1.3.0
 * @protocol OEDP-V5.5 - Standard MetaShark
 * @description Ponto único de exposição e SSOT para o domínio de Identidade Soberana.
 * Centraliza a validação de ADN, motores de reputação algorítmica, níveis de garantia 
 * de identidade (IAL) e resolução de privilégios dinâmicos.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy ZERO-ABBREVIATIONS: Exportações nomeadas baseadas em prosa técnica.
 */

/**
 * @section Camada de Definição (ADN Estrutural)
 * Esquemas Zod para validação estrutural e Tipagem Nominal (Branded Types).
 */
export {
  // --- Esquemas de Validação (Aduanas de ADN) ---
  UserIdentitySchema,
  IdentityRoleSchema,
  ReputationScoreSchema,
  IdentityAttributesSchema,
  CitizenIdentifierSchema,
  IdentityAssuranceLevelSchema,
  DigitalPresenceFingerprintSchema,

  // --- Interfaces de Dados (Contratos de Elite) ---
  type IUserIdentity,
  type IIdentityRole,
  type IIdentityAttributes,
  type ReputationScore,
  type CitizenIdentifier,
  type IIdentityAssuranceLevel,
  type DigitalPresenceFingerprint
} from './lib/schemas/UserIdentity.schema';

/**
 * @section Camada Operativa (Motores Lógicos de Governança)
 * Algoritmos atômicos que processam a vida social e técnica do cidadão.
 */

/**
 * @apparatus CalculateCitizenStanding
 * @description Motor de alta precisão que transmuta interações em evolução de standing social.
 */
export {
  CalculateCitizenStanding,
  type CalculateCitizenStandingParameters,
  type IImpactEvent
} from './lib/calculators/CalculateCitizenStanding';

/**
 * @apparatus ResolveIdentityPrivileges
 * @description Cérebro de autoridade que resolve a tríade (Papel, Standing, Garantia) em permissões reais.
 */
export {
  ResolveIdentityPrivileges,
  type ResolveIdentityPrivilegesParameters
} from './lib/resolvers/ResolveIdentityPrivileges';

/**
 * @note Este Reino (Realm) é a fundação da confiança do ecossistema Agentevai.
 * Suas exportações alimentam:
 * 1. O Authority-Bridge: Para selagem de assinaturas eletrônicas com base no IAL.
 * 2. O AI-Neural-Auditor: Para detecção de anomalias via Digital Presence Fingerprint.
 * 3. O web-portal: Para orquestração cinética de UI baseada em mérito e reputação.
 * 
 * Auditoria Neural: Rastro forense e telemetria ativos em cada ponto de consumo.
 */