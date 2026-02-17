/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateEventImpact
 * @version 7.4.3
 * @description Unidade aritmética inalterável. Calcula a massa térmica local.
 */

import { CalculateEventImpactInputSchema, type ICalculateEventImpactInput } from './schemas/CalculateEventImpact.schema.js';

/**
 * @name CalculateEventImpact
 * @function Pura
 * @description Executa o cálculo de impacto local baseado na soberania do rastro.
 */
export const CalculateEventImpact = (parameters: ICalculateEventImpactInput): number => {
  // O parâmetro já chega validado e com a marca nominal do orquestrador
  const assuranceWeights = { IAL1_UNVERIFIED: 1, IAL2_VERIFIED: 10, IAL3_SOVEREIGN: 60 };
  const baseImpact = parameters.neuralSeverityScore * (assuranceWeights[parameters.assuranceLevel] || 1);
  const inertiaCoefficient = parameters.isInstitutionalResponsePending ? 2.0 : 0.1;

  return baseImpact * inertiaCoefficient;
};
