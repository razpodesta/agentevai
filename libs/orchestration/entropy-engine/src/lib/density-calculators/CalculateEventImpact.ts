/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateEventImpact
 * @version 1.0.0
 * @protocol OEDP-V7.0 - Pure Mathematics
 * @description Unidade aritmética inalterável para cálculo de impacto por fé pública.
 */

import { z } from 'zod';

const ImpactParametersSchema = z.object({
  assuranceLevel: z.enum(['IAL1_UNVERIFIED', 'IAL2_VERIFIED', 'IAL3_SOVEREIGN']),
  neuralSeverity: z.number().min(1).max(10),
  isPending: z.boolean()
}).readonly();

/**
 * @name CalculateEventImpact
 * @function Pura
 */
export const CalculateEventImpact = (parameters: z.infer<typeof ImpactParametersSchema>): number => {
  const data = ImpactParametersSchema.parse(parameters);

  const IAL_WEIGHTS = { IAL1_UNVERIFIED: 1, IAL2_VERIFIED: 10, IAL3_SOVEREIGN: 60 };
  const baseImpact = data.neuralSeverity * (IAL_WEIGHTS[data.assuranceLevel] || 1);
  const inertiaCoefficient = data.isPending ? 2.0 : 0.1;

  return baseImpact * inertiaCoefficient;
};
