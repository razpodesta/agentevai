/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ResolveAuthorityHierarchy
 * @version 1.0.0
 * @protocol OEDP-V6.5 - High Performance Governance
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { SovereignAuthoritySchema, type ISovereignAuthority } from '../schemas/SovereignAuthority.schema.js';

export const ResolveAuthorityHierarchy = (
  rawAuthorityPayload: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): ISovereignAuthority => {
  const apparatusName = 'ResolveAuthorityHierarchy';

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro)
    const validatedAuthority = SovereignAuthoritySchema.parse(rawAuthorityPayload);

    // 2. TELEMETRIA DE SOBERANIA
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'AUTHORITY_ANCHORED',
      message: SovereignTranslationEngine.translate(
        dictionary, apparatusName, 'logAuthoritySealed', 
        { role: validatedAuthority.institutionalRole }, correlationIdentifier
      ),
      correlationIdentifier
    });

    return validatedAuthority;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GOV-5001'),
      apparatus: apparatusName,
      location: 'libs/realms/governance-domain/src/lib/handlers/ResolveAuthorityHierarchy.ts',
      correlationIdentifier,
      severity: 'CRITICAL'
    });
  }
};