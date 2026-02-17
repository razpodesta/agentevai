/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateSpatialContagion
 * @version 7.4.2
 * @protocol OEDP-V7.0 - High Performance Spatiotemporal Physics
 * @description Unidade inalterável que calcula a dissipação térmica entre células.
 */

import { gridDistance } from 'h3-js';
import {
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema
} from '@agentevai/apparatus-metadata-registry';

/** @section Sincronia de ADN Zenith */
import {
  CalculateSpatialContagionInputSchema,
  type ICalculateSpatialContagionInput
} from './schemas/CalculateSpatialContagion.schema.js';

/**
 * @name CalculateSpatialContagion
 * @function Pura
 */
export const CalculateSpatialContagion = (
  parameters: ICalculateSpatialContagionInput
): number => {
  const apparatusName = 'CalculateSpatialContagion';

  // 1. ADUANA DE ADN
  const data = CalculateSpatialContagionInputSchema.parse(parameters);

  // 2. REGISTRO TÉCNICO (Pilar I - SSOT)
  SovereignApparatusRegistry.registerApparatus({
    identifier: ApparatusIdentifierSchema.parse(apparatusName),
    authorName: 'Raz Podestá',
    semanticVersion: '7.4.2',
    complexityTier: 'REALM_LOGIC',
    stabilityScore: StabilityScoreSchema.parse(100),
    isSealedForProduction: true,
    registeredAt: new Date().toISOString()
  }, data["correlationIdentifier"]);

  // 3. ARITMÉTICA ESPACIAL
  const distanceBetweenHexagons = gridDistance(
    data["originatingHexagonIndex"] as unknown as string,
    data["neighborHexagonIndex"] as unknown as string
  );

  /**
   * @formula Dissipação Termodinâmica
   * Quanto maior a distância, menor a influência (Dissipação de Elite).
   */
  const dissipationFactor = 1 / (Math.pow(distanceBetweenHexagons, 2) + 1);

  return data["neighborEntropyScore"] * dissipationFactor;
};
