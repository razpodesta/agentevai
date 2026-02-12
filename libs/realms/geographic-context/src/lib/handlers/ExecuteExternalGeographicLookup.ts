/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteExternalGeographicLookup
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Atomic I/O Sovereignty
 * @description Realiza a petição física ao cluster de geolocalização.
 * Erradicação de placeholders e injeção de rastro forense.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import {
  ExternalGeographicPulseSchema,
  type IExternalGeographicPulse
} from '../schemas/LookupTerritorialAnchor.schema.js';

/**
 * @interface INextFetchOptions
 * @description Configuração de cache para o motor Next.js 16.
 */
interface INextFetchOptions extends RequestInit {
  next?: { revalidate?: number | false };
}

/**
 * @name ExecuteExternalGeographicLookup
 * @function
 * @async
 * @description Captura o pulso geográfico via infraestrutura externa com auditoria de latência.
 */
export const ExecuteExternalGeographicLookup = async (
  internetProtocolAddress: string,
  correlationIdentifier: string
): Promise<IExternalGeographicPulse> => {
  const apparatusName = 'ExecuteExternalGeographicLookup';
  const fileLocation = 'libs/realms/geographic-context/src/lib/handlers/ExecuteExternalGeographicLookup.ts';
  const startTimestamp = performance.now();

  const requestOptions: INextFetchOptions = {
    next: { revalidate: 86400 }, // Selagem de Cache: 24h
    headers: { 'Accept': 'application/json' }
  };

  try {
    const infrastructureResponse = await fetch(
      `https://ipapi.co/${internetProtocolAddress}/json/`,
      requestOptions
    );

    if (!infrastructureResponse.ok) {
      throw new Error('EXTERNAL_GEO_INFRASTRUCTURE_UNAVAILABLE');
    }

    const rawSnapshot = await infrastructureResponse.json();
    
    // 1. ADUANA DE ADN (Validação Zod V4)
    const validatedPulse = ExternalGeographicPulseSchema.parse(rawSnapshot);

    // 2. TELEMETRIA DE PERFORMANCE
    const endTimestamp = performance.now();
    const executionLatencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'GEO_FETCH_SUCCESS',
      message: `Rastro geográfico recuperado em ${executionLatencyInMilliseconds}ms.`,
      correlationIdentifier,
      metadata: { 
        latency: executionLatencyInMilliseconds,
        provider: 'ipapi.co' 
      }
    });

    return validatedPulse;

  } catch (caughtError) {
    // 3. CAPTURA FORENSE DE FALHA
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GEO-5002'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Verificar status da IPAPI ou exaustão de quota do território.'
    });
  }
};