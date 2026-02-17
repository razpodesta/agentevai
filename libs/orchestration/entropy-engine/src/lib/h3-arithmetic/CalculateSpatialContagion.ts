/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateSpatialContagion
 * @protocol OEDP-V7.0 - Pure Mathematics
 * @description Unidade inalterável que utiliza o motor H3 para dissipação térmica.
 */

import { gridDistance } from 'h3-js';

/**
 * @name CalculateSpatialContagion
 * @function Pura
 */
export const CalculateSpatialContagion = (
  originHex: string,
  neighborHex: string,
  neighborScore: number
): number => {
  const distance = gridDistance(originHex, neighborHex);
  // Lei do Quadrado Inverso aplicada à desordem social
  const dissipationFactor = 1 / (Math.pow(distance, 2) + 1);

  return neighborScore * dissipationFactor;
};
