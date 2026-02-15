/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteProximityQuery
 * @version 6.6.1
 * @protocol OEDP-V6.5 - High Performance Spatial Engine
 * @description Motor de busca regional baseado no rastro hexagonal H3.
 * CURADO: Erro TS4111 resolvido via Desestruturação Nominal Imediata.
 */

import { latLngToCell, gridDisk } from 'h3-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
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

    /**
     * @section CURA_TS4111
     * Extraímos os valores para constantes locais. Isso remove a assinatura de índice
     * do Zod e permite acesso direto às propriedades.
     */
    const {
      centerLatitude,
      centerLongitude,
      searchRadiusInHexagons,
      correlationIdentifier
    } = validatedData;

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    // 2. TRANSMUTAÇÃO PARA ESPAÇO H3 (Uber Engine)
    // Resolução 9: Células de ~0.1km² (Precisão "Mira o Dor")
    const centerHexagon = latLngToCell(
      centerLatitude as unknown as number,
      centerLongitude as unknown as number,
      9
    );

    // 3. GERAÇÃO DO ENXAME DE BUSCA (k-ring)
    const hexagonSwarm = gridDisk(centerHexagon, searchRadiusInHexagons);

    // 4. SELAGEM NOMINAL E PERFORMANCE
    const validatedSwarm = hexagonSwarm.map(hex => H3IndexSchema.parse(hex));

    const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'SPATIAL_INDEX_GENERATED',
      message: translate('logIndexGenerated', { count: validatedSwarm.length }),
      correlationIdentifier,
      metadata: { latencyMs: executionLatency, radius: searchRadiusInHexagons }
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
