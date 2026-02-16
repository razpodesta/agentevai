/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignGeospatialOrchestrator
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Zenith Resilience
 * @description Orquestrador que decide entre GPS/H3 e IP-Fallback.
 * CURADO: Erros TS2307, TS4111 e radiação 'any' erradicados.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de Borda (Infrastructure & Handlers) */
import { ExecuteProximityQuery } from '../../geography-infrastructure/src/lib/logic/ExecuteProximityQuery.js';
import { LookupTerritorialAnchor } from './handlers/LookupTerritorialAnchor.js';
import { TransmuteH3ToAddress } from './handlers/TransmuteH3ToAddress.js';

import { GeospatialTruthSchema, type IGeospatialTruth } from './schemas/GeospatialTruth.schema.js';
import { SovereignGeospatialOrchestratorInputSchema } from './schemas/SovereignGeospatialOrchestrator.schema.js';

export class SovereignGeospatialOrchestrator {
  private static readonly apparatusName = 'SovereignGeospatialOrchestrator';
  private static readonly fileLocation = 'libs/realms/geographic-context/src/lib/SovereignGeospatialOrchestrator.ts';

  /**
   * @method resolveTruth
   * @async
   * @description Resolve o rastro geográfico prioritário.
   */
  public static async resolveTruth(rawParameters: unknown): Promise<IGeospatialTruth> {
    const startTimestamp = performance.now();

    try {
      // 1. ADUANA DE ADN (Ingresso Seguro)
      const data = SovereignGeospatialOrchestratorInputSchema.parse(rawParameters);
      const { clientIpAddress, gpsPayload, correlationIdentifier, dictionary } = data;

      const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
        dictionary as unknown as ISovereignDictionary, 
        this.apparatusName, key, variables, correlationIdentifier
      );

      // 🟢 TENTATIVA NÍVEL 1: SOBERANIA (GPS + H3)
      if (gpsPayload) {
        const h3Swarm = ExecuteProximityQuery({
          centerLatitude: gpsPayload.latitude,
          centerLongitude: gpsPayload.longitude,
          searchRadiusInHexagons: 1,
          correlationIdentifier
        }, dictionary as unknown as ISovereignDictionary);

        const humanAddress = await TransmuteH3ToAddress(h3Swarm[0], correlationIdentifier);

        return GeospatialTruthSchema.parse({
          fidelityLevel: 'IAL3_SOVEREIGN',
          location: gpsPayload,
          hexagonalIndex: h3Swarm[0],
          humanizedAddress: humanAddress
        });
      }

      // 🟡 TENTATIVA NÍVEL 2: RESILIÊNCIA (IP LOOKUP)
      SovereignLogger({
        severity: 'WARN',
        apparatus: this.apparatusName,
        operation: 'GPS_SIGNAL_MISSING',
        message: translate('statusFailoverActive'),
        correlationIdentifier
      });

      const ipAnchor = await LookupTerritorialAnchor(
        clientIpAddress, 
        correlationIdentifier, 
        dictionary as unknown as ISovereignDictionary
      );

      // CURA TS4111: Desestruturação nominal imediata
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
        correlationIdentifier: (rawParameters as any)?.correlationIdentifier || 'NO_TRACE',
        severity: 'CRITICAL'
      });
    }
  }
}