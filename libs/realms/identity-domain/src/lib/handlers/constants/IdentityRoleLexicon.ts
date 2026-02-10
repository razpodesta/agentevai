/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityRoleLexicon
 * @version 2.3.0
 * @protocol OEDP-V6.0 - Nominal Sovereignty SSOT
 * @description Repositório imutável para transmutação léxica de papéis.
 */

/**
 * @type IIdentityRoleLexicon
 * @description Define a matriz trilingue indexável.
 * Usamos chaves genéricas para permitir a indexação via Branded Types no Handler.
 */
export type IIdentityRoleLexicon = Readonly<
  Record<string, Readonly<Record<string, string>>>
>;

/**
 * @name IDENTITY_ROLE_LEXICON
 * @constant
 * @description Mapa mestre de humanização regionalizado.
 */
export const IDENTITY_ROLE_LEXICON: IIdentityRoleLexicon = Object.freeze({
  'pt-BR': {
    PLATFORM_ENGINEER: 'Engenheiro de Soberania',
    GOVERNANCE_AUDITOR: 'Auditor de Governança',
    REGIONAL_MODERATOR: 'Moderador Regional',
    INDEPENDENT_JOURNALIST: 'Jornalista Independente',
    VERIFIED_CITIZEN: 'Cidadão Verificado',
    ACTIVE_CITIZEN: 'Cidadão Ativo',
    ANONYMOUS_CITIZEN: 'Observador Anônimo'
  },
  'es-ES': {
    PLATFORM_ENGINEER: 'Ingeniero de Soberanía',
    GOVERNANCE_AUDITOR: 'Auditor de Gobernanza',
    REGIONAL_MODERATOR: 'Moderador Regional',
    INDEPENDENT_JOURNALIST: 'Periodista Independiente',
    VERIFIED_CITIZEN: 'Ciudadano Verificado',
    ACTIVE_CITIZEN: 'Ciudadano Activo',
    ANONYMOUS_CITIZEN: 'Observador Anónimo'
  },
  'en-US': {
    PLATFORM_ENGINEER: 'Sovereignty Engineer',
    GOVERNANCE_AUDITOR: 'Governance Auditor',
    REGIONAL_MODERATOR: 'Regional Moderator',
    INDEPENDENT_JOURNALIST: 'Independent Journalist',
    VERIFIED_CITIZEN: 'Verified Citizen',
    ACTIVE_CITIZEN: 'Active Citizen',
    ANONYMOUS_CITIZEN: 'Anonymous Observer'
  }
});
