/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PreferenceVault
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Forensic Registry Actuator
 */

import { SovereignLogger, SovereignLoggerSchema } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  PreferenceVaultSchema,
  type IPreferenceVault
} from './schemas/PreferenceVault.schema.js';

/**
 * @name SealUserPreferences
 * @function
 * @description Valida e sela as preferências de interface no búnquer de dados.
 */
export const SealUserPreferences = (
  rawPreferenceData: unknown
): IPreferenceVault => {
  const apparatusName = 'PreferenceVault';

  try {
    // 1. ADUANA DE ADN (Zenith V4)
    const validatedPreferences = PreferenceVaultSchema.parse(rawPreferenceData);

    // 2. SELAGEM DE TELEMETRIA (Cura TS2345)
    const logPayload = SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'PREFERENCES_SEALED',
      semanticMessage: `Preferências do ator [${validatedPreferences.actorIdentifier}] sincronizadas no cofre.`,
      correlationIdentifier: validatedPreferences.correlationIdentifier,
      forensicMetadata: {
        theme: validatedPreferences.appearance.themeMode,
        locale: validatedPreferences.language.preferredLocale
      }
    });

    SovereignLogger(logPayload);

    return validatedPreferences;

  } catch (caughtError) {
    const getCorrelationTrace = (input: unknown): string => {
      if (typeof input === 'object' && input !== null && 'correlationIdentifier' in input) {
        return (input as { correlationIdentifier: string }).correlationIdentifier;
      }
      return crypto.randomUUID();
    };

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-REG-1002'),
      apparatus: apparatusName,
      location: 'libs/realms/registry-vault/src/lib/preference-vault/PreferenceVault.ts',
      correlationIdentifier: getCorrelationTrace(rawPreferenceData),
      severity: 'MEDIUM'
    });
  }
};
