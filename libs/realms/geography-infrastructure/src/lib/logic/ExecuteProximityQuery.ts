/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteProximityQuery
 * @version 6.6.2
 * @protocol OEDP-V6.5 - High Performance Spatial Engine
 * @description Motor de busca regional baseado no rastro hexagonal H3.
 * CURADO: Handshake com Cartório Técnico e erradicação de radiação de índice.
 */

import { latLngToCell, gridDisk } from 'h3-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
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
  ProximityQueryInputSchema,
  H3IndexSchema,
  type IProximityQueryInput,
  type H3Index
} from './schemas/ExecuteProximityQuery.schema.js';

/**
 * @name ExecuteProximityQuery
 * @function
 * @description Transmuta coordenadas em uma malha de hexágonos para consulta no cofre relacional.
 */
export const ExecuteProximityQuery = (
  rawParameters: unknown,
  dictionary: ISovereignDictionary
): H3Index[] => {
  const apparatusName = 'ExecuteProximityQuery';
  const fileLocation = 'libs/realms/geography-infrastructure/src/lib/logic/ExecuteProximityQuery.ts';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro)
    const validatedData = ProximityQueryInputSchema.parse(rawParameters);

    /** @section CURA_TS4111: Desestruturação Nominal */
    const {
      centerLatitude,
      centerLongitude,
      searchRadiusInHexagons,
      correlationIdentifier
    } = validatedData;

    // 2. REGISTRO TÉCNICO (Manifesto 0027)
    SovereignApparatusRegistry.registerApparatus({
      identifier: ApparatusIdentifierSchema.parse(apparatusName),
      authorName: 'Raz Podestá',
      semanticVersion: '6.6.2',
      complexityTier: 'INTEGRATION_DRIVER',
      stabilityScore: StabilityScoreSchema.parse(100),
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, correlationIdentifier);

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    // 3. TRANSMUTAÇÃO PARA ESPAÇO H3 (Uber Engine)
    // Resolução 9: Precisão "Mira o Dor" (~0.1km²)
    const centerHexagon = latLngToCell(
      centerLatitude as unknown as number,
      centerLongitude as unknown as number,
      9
    );

    // 4. GERAÇÃO DO ENXAME DE BUSCA (k-ring)
    const hexagonSwarm = gridDisk(centerHexagon, searchRadiusInHexagons);

    // 5. SELAGEM NOMINAL DO RESULTADO
    const validatedSwarm = hexagonSwarm.map(hex => H3IndexSchema.parse(hex));

    const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

    // 6. TELEMETRIA ZENITH
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'SPATIAL_INDEX_GENERATED',
      message: translate('logIndexGenerated', { count: validatedSwarm.length }),
      correlationIdentifier,
      latencyInMilliseconds: executionLatency,
      metadata: { resolution: 9, radius: searchRadiusInHexagons }
    });

    return validatedSwarm;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GEO-7001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: (rawParameters as IProximityQueryInput)?.correlationIdentifier || 'NO_TRACE',
      severity: 'HIGH'
    });
  }
};