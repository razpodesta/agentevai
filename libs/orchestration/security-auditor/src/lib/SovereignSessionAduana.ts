/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSessionAduana
 * @version 2.0.0
 * @protocol OEDP-V5.5 - High Precision Security
 * @description Monitor de estado de sessão e consciência regional.
 * Erradica radiação técnica (any) e sela a aduana de cookies de borda.
 * @policy ZERO-ANY: Tipagem estrita via Next.js RequestCookies.
 */

import { type RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignSessionSchema,
  type ISovereignSession
} from './schemas/SovereignSession.schema.js';

/**
 * @name SovereignSessionAduana
 * @function
 * @description Realiza a inspeção profunda dos cookies de borda para extrair o snapshot de sessão.
 *
 * @param {RequestCookies} cookieJar - O pote de cookies capturado na Request.
 * @param {string} correlationIdentifier - ID de correlação para rastro forense.
 * @returns {ISovereignSession} Snapshot validado pela Aduana.
 */
export const SovereignSessionAduana = (
  cookieJar: RequestCookies,
  correlationIdentifier: string
): ISovereignSession => {
  const apparatusName = 'SovereignSessionAduana';

  // 1. Extração de Rastro (Zero Any Policy)
  const authToken = cookieJar.get('agv_auth_token');
  const geoVault = cookieJar.get('agv_geo_vault');

  /**
   * @section Composição de Snapshot
   * Mapeamos os dados brutos para o formato exigido pelo nosso ADN de Sessão.
   */
  const rawSessionSnapshot = {
    isAuthenticated: !!authToken,
    hasStoredConsciousness: !!geoVault,
    vaultedData: geoVault?.value,
    correlationIdentifier // UUID de jornada
  };

  // 2. Aduana de ADN (Zod Enforcement)
  // Aqui aplicamos o novo padrão z.uuid() definido no esquema.
  const validatedSession = SovereignSessionSchema.parse(rawSessionSnapshot);

  // 3. Telemetria de Monitoramento
  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'SESSION_ADUANA_CLEARED',
    message: `Aduana concluída. Autenticado: ${validatedSession.isAuthenticated} | Consciência: ${validatedSession.hasStoredConsciousness}`,
    traceIdentifier: validatedSession.correlationIdentifier
  });

  return validatedSession;
};
