/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteH3ToAddress
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Forensic Humanization
 * @description Ponte de tradução: Transmuta o índice H3 em rastro textual de endereço.
 * @policy ZERO-COST: Integração com provedores OpenSource/FreeTier.
 */

import { cellToLatLng } from 'h3-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { type H3Index } from '../../../geography-infrastructure/src/lib/logic/schemas/ExecuteProximityQuery.schema.js';

/**
 * @name TransmuteH3ToAddress
 * @function
 * @async
 * @description Obtém as coordenadas do centro do hexágono e busca o rastro humano.
 */
export const TransmuteH3ToAddress = async (
  h3Identifier: H3Index,
  correlationIdentifier: string
): Promise<string> => {
  const apparatusName = 'TransmuteH3ToAddress';

  try {
    // 1. EXTRAÇÃO DE COORDENADAS DO CENTRO DA CÉLULA
    const [latitude, longitude] = cellToLatLng(h3Identifier as unknown as string);

    // 2. HANDSHAKE COM PROVEDOR DE GEOPROCESSAMENTO (Nominatim - Free Tier)
    const infrastructureResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      { headers: { 'User-Agent': 'Agentevai-Sovereign-Portal' } }
    );

    const addressSnapshot = await infrastructureResponse.json();

    // 3. TELEMETRIA DE SUCESSO
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'REVERSE_GEOCODING_SUCCESS',
      message: `Célula H3 ${h3Identifier} humanizada para: ${addressSnapshot.display_name}`,
      correlationIdentifier
    });

    return addressSnapshot.display_name || 'Território Não Identificado';

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GEO-8001'),
      apparatus: apparatusName,
      location: 'libs/realms/geographic-context/src/lib/handlers/TransmuteH3ToAddress.ts',
      correlationIdentifier,
      severity: 'LOW'
    });
  }
};