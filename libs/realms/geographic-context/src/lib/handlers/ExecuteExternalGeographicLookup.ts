/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteExternalGeographicLookup
 * @version 1.0.0
 * @protocol OEDP-V6.0 - Atomic I/O
 * @description Realiza a petição física ao provedor de geolocalização.
 */

import { 
  ExternalGeographicPulseSchema, 
  type IExternalGeographicPulse 
} from '../schemas/LookupTerritorialAnchor.schema.js';

interface INextFetchRequestInit extends RequestInit {
  next?: { revalidate?: number | false };
}

/**
 * @name ExecuteExternalGeographicLookup
 * @function
 * @async
 */
export const ExecuteExternalGeographicLookup = async (
  internetProtocolAddress: string
): Promise<IExternalGeographicPulse> => {
  const requestOptions: INextFetchRequestInit = {
    next: { revalidate: 86400 } // Cache de 24h conforme Manifesto 0013
  };

  const infrastructureResponse = await fetch(
    `https://ipapi.co/${internetProtocolAddress}/json/`, 
    requestOptions
  );

  if (!infrastructureResponse.ok) {
    throw new Error('EXTERNAL_GEO_INFRASTRUCTURE_UNAVAILABLE');
  }

  const rawSnapshot = await infrastructureResponse.json();
  return ExternalGeographicPulseSchema.parse(rawSnapshot);
};