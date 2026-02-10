/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslateIdentityRole
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance Semantics
 * @description Handler especializado na humanização de papéis sociais.
 * Erradica TS7053 através de uma Aduana de Indexação Controlada.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  TranslateIdentityRoleInputSchema,
  type ITranslateIdentityRoleInput
} from './schemas/TranslateIdentityRole.schema.js';
import { IDENTITY_ROLE_LEXICON } from './constants/IdentityRoleLexicon.js';

/**
 * @name TranslateIdentityRole
 * @function
 * @description Transmuta um papel técnico em um rótulo humanizado regional.
 */
export const TranslateIdentityRole = (
  parameters: ITranslateIdentityRoleInput
): string => {
  const apparatusName = 'TranslateIdentityRole';
  const fileLocation = 'libs/realms/identity-domain/src/lib/handlers/TranslateIdentityRole.ts';

  try {
    // 1. ADUANA DE ADN (Validando a entrada e fixando o rastro)
    const {
      targetIdentityRole,
      activeSovereignLocale,
      correlationIdentifier
    } = TranslateIdentityRoleInputSchema.parse(parameters);

    /**
     * @section PONTE DE INDEXAÇÃO SOBERANA (Cura TS7053)
     * Para indexar um objeto estático com tipos Branded, realizamos o
     * un-branding controlado. Isso mantém a tipagem forte na entrada
     * e garante a performance O(1) na busca.
     */
    const localeKey = activeSovereignLocale as unknown as string;
    const roleKey = targetIdentityRole as unknown as string;

    const localeDictionary = IDENTITY_ROLE_LEXICON[localeKey];

    if (!localeDictionary) {
      throw new Error(`GEOPOLITICAL_VOID: Locale [${localeKey}] not mapped.`);
    }

    const humanizedRoleLabel = localeDictionary[roleKey];

    if (!humanizedRoleLabel) {
      throw new Error(`SEMANTIC_VOID: Role [${roleKey}] missing in [${localeKey}].`);
    }

    // 2. TELEMETRIA NEURAL
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'IDENTITY_HUMANIZED',
      message: `Identidade transmutada: ${roleKey} -> ${humanizedRoleLabel}`,
      correlationIdentifier: correlationIdentifier,
      metadata: { role: roleKey, locale: localeKey }
    });

    return humanizedRoleLabel;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ID-3001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: parameters?.correlationIdentifier || 'NO_TRACE',
      severity: 'HIGH'
    });
  }
};
