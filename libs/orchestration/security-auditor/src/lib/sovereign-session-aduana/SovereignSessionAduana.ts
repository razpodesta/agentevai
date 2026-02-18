/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSessionAduana
 * @version 7.8.0
 * @protocol OEDP-V7.0 - Zenith Security Gate
 * @description Fiscal de borda. Analisa o búnquer de cookies para extrair a consciência.
 * CURADO: Erradicados erros TS2554 e radiação de pastas internas.
 */

import { type RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { SovereignLogger, SovereignLoggerSchema } from '@agentevai/sovereign-logger';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Local */
import {
  SovereignSessionAduanaInputSchema,
  type ISovereignSessionAduanaInput
} from './schemas/SovereignSessionAduana.schema.js';

/**
 * @name SovereignSessionAduana
 * @function
 * @description Transmuta o pote de cookies de borda em um snapshot de sessão selado.
 */
export const SovereignSessionAduana = (
  cookieJarBucket: RequestCookies,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): ISovereignSessionAduanaInput => {
  const apparatusName = 'SovereignSessionAduana';
  const startTimestamp = performance.now();

  // 1. REGISTRO TÉCNICO (Cura TS2554: 1 argumento)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.8.0',
    complexityTier: 'INTEGRATION_DRIVER',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  });

  const translateLabel = (key: string, variables = {}) => SovereignTranslationEngine.translate({
    dictionary,
    apparatusIdentifier: apparatusName,
    semanticKey: key,
    variables,
    correlationIdentifier
  });

  try {
    // 2. EXTRAÇÃO DE RASTRO (Higiene Lexical Total)
    const authenticationTokenTrace = cookieJarBucket.get('agv_auth_token');
    const geospatialVaultTrace = cookieJarBucket.get('agv_geo_vault');

    // 3. ADUANA DE ADN (Zenith V4 Verification)
    const validatedSession = SovereignSessionAduanaInputSchema.parse({
      isUserAuthenticated: !!authenticationTokenTrace,
      hasStoredConsciousness: !!geospatialVaultTrace,
      vaultedGeospatialData: geospatialVaultTrace?.value,
      correlationIdentifier
    });

    const executionLatencyInMilliseconds = parseFloat((performance.now() - startTimestamp).toFixed(4));

    // 4. TELEMETRIA SOBERANA (Protocolo V7.0)
    SovereignLogger(SovereignLoggerSchema.parse({
      severity: 'INFO',
      apparatusIdentifier: apparatusName,
      operationCode: 'SESSION_TRACE_CLEARED',
      semanticMessage: translateLabel('logAduanaCleared'),
      correlationIdentifier,
      executionLatencyInMilliseconds
    }));

    return validatedSession;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-4002'),
      apparatus: apparatusName,
      location: 'libs/orchestration/security-auditor/src/lib/sovereign-session-aduana/SovereignSessionAduana.ts',
      correlationIdentifier,
      severity: 'CRITICAL',
      recoverySuggestion: 'O búnquer de cookies portava radiação técnica inaceitável.'
    });
  }
};