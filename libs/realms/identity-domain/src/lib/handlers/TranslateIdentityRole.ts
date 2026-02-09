/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslateIdentityRole
 * @version 1.2.0
 * @protocol OEDP-V5.5.1 - High Performance & Zero-Any
 * @description Handler atômico especializado na tradução trilingue de papéis sociais.
 * Resolve conflitos de indexação de Branded Types via normalização de rastro.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy PERFORMANCE-FIRST: Acesso O(1) com rastro de auditoria.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  TranslateIdentityRoleInputSchema,
  ITranslateIdentityRoleInput
} from './schemas/TranslateIdentityRole.schema.js';

/**
 * @section Registro de Tradução (Imutável)
 * @description Mapa de transmutação léxica.
 * Usamos tipos base para evitar a colisão de branding no indexador.
 */
const ROLE_LÉXICO: Record<string, Record<string, string>> = {
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
};

/**
 * @name TranslateIdentityRole
 * @function
 * @description Transmuta um papel técnico em uma identidade legível.
 *
 * @param {ITranslateIdentityRoleInput} parameters - O par Role + Locale + Correlation.
 * @returns {string} Rótulo humanizado.
 */
export const TranslateIdentityRole = (
  parameters: ITranslateIdentityRoleInput
): string => {
  const apparatusName = 'TranslateIdentityRole';
  const fileLocation = 'libs/realms/identity-domain/src/lib/handlers/TranslateIdentityRole.ts';

  try {
    // 1. Aduana de ADN (Garante que o Branded Type é válido)
    const { targetIdentityRole, activeSovereignLocale, correlationIdentifier } =
      TranslateIdentityRoleInputSchema.parse(parameters);

    /**
     * @section Resolução Semântica (Fix TS7053)
     * Normalizamos a chave para string durante o acesso para satisfazer o compilador,
     * mantendo a segurança via Zod no passo anterior.
     */
    const localeKey = activeSovereignLocale.toString();
    const roleKey = targetIdentityRole.toString();

    const translatedLabel = ROLE_LÉXICO[localeKey]?.[roleKey];

    if (!translatedLabel) {
      throw new Error(`MISSING_ROLE_TRANSLATION: ${roleKey} for ${localeKey}`);
    }

    // 2. Telemetria de Sucesso
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TRANSLATION_SUCCESS',
      message: `Papel [${roleKey}] transmutado com sucesso para [${localeKey}].`,
      traceIdentifier: correlationIdentifier
    });

    return translatedLabel;

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-ID-3001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: parameters?.correlationIdentifier || 'NO_TRACE',
      severity: 'HIGH',
      recoverySuggestion: 'Verificar se o papel social está registrado no ROLE_LÉXICO do handler.'
    });
  }
};
