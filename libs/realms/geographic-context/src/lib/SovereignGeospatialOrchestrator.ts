/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignGeospatialOrchestrator
 * @version 2.0.0
 * @protocol OEDP-V6.5 - Zenith Resilience
 * @description Orquestrador que decide entre GPS/H3 e IP-Fallback.
 * CURADO: Erradicado erro TS2307, TS4111 e radiação 'any' no gpsPayload.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de Reinos e ADN */
// CURA TS2307: Rastro de importação sincronizado com o Monorepo
import { ExecuteProximityQuery } from '../../../geography-infrastructure/src/lib/logic/ExecuteProximityQuery.js';
import { LookupTerritorialAnchor } from './handlers/LookupTerritorialAnchor.js';
import { TransmuteH3ToAddress } from './handlers/TransmuteH3ToAddress.js';

import {
  GeospatialTruthSchema,
  type IGeospatialTruth
} from './schemas/GeospatialTruth.schema.js';
import {
  HighFidelityLocationSchema,
  type IHighFidelityLocation
} from '../../../../foundation/ui-kit-atoms/src/lib/sovereign-location-handshake/schemas/SovereignLocationHandshake.schema.js';

export class SovereignGeospatialOrchestrator {
  private static readonly apparatusName = 'SovereignGeospatialOrchestrator';
  private static readonly fileLocation = 'libs/realms/geographic-context/src/lib/SovereignGeospatialOrchestrator.ts';

  /**
   * @method resolveTruth
   * @async
   * @description Tenta a fidelidade máxima (GPS), com fallback para infraestrutura de IP.
   */
  public static async resolveTruth(
    clientIpAddress: string,
    gpsPayload: IHighFidelityLocation | null, // CURA ANY: Agora tipado via ADN de Handshake
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<IGeospatialTruth> {

    try {
      // 🟢 TENTATIVA NÍVEL 1: SOBERANIA (GPS + H3)
      if (gpsPayload) {
        // CURA ANY: Validamos o payload antes da ignição
        const validatedGps = HighFidelityLocationSchema.parse(gpsPayload);

        const h3Swarm = ExecuteProximityQuery({
          centerLatitude: validatedGps.latitude,
          centerLongitude: validatedGps.longitude,
          searchRadiusInHexagons: 1,
          correlationIdentifier
        }, dictionary);

        const humanAddress = await TransmuteH3ToAddress(h3Swarm[0], correlationIdentifier);

        return GeospatialTruthSchema.parse({
          fidelityLevel: 'IAL3_SOVEREIGN',
          location: validatedGps,
          hexagonalIndex: h3Swarm[0],
          humanizedAddress: humanAddress
        });
      }

      // 🟡 TENTATIVA NÍVEL 2: RESILIÊNCIA (IP LOOKUP)
      SovereignLogger({
        severity: 'WARN',
        apparatus: this.apparatusName,
        operation: 'GPS_NOT_AVAILABLE',
        message: 'Aperto de mão geográfico ausente. Ativando failover para IP.',
        correlationIdentifier
      });

      const ipAnchor = await LookupTerritorialAnchor(clientIpAddress, correlationIdentifier, dictionary);

      /**
       * @section CURA_TS4111
       * Desestruturação imediata do rastro de âncora para evitar acesso via índice.
       */
      const { territoryName, stateCode } = ipAnchor;

      return GeospatialTruthSchema.parse({
        fidelityLevel: 'IAL2_VERIFIED',
        internetProtocolAddress: clientIpAddress,
        regionName: territoryName,
        stateCode: stateCode
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-GEO-9001'),
        apparatus: this.apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'CRITICAL'
      });
    }
  }
}
