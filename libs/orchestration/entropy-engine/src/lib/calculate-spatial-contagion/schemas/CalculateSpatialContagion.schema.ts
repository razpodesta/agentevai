/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateSpatialContagionSchema
 * @version 7.4.2
 * @protocol OEDP-V7.0 - Pure Mathematics DNA
 */

import { z } from 'zod';
import { H3IndexSchema } from '@agentevai/types-common';

/** @name CalculateSpatialContagionInputSchema */
export const CalculateSpatialContagionInputSchema = z.object({
  originatingHexagonIndex: H3IndexSchema
    .describe('Índice H3 da célula onde a dor foi detectada.'),

  neighborHexagonIndex: H3IndexSchema
    .describe('Índice H3 da célula vizinha sob análise.'),

  neighborEntropyScore: z.number()
    .min(0)
    .describe('Pontuação bruta de entropia do vizinho.'),

  correlationIdentifier: z.uuid()
})
.brand<'CalculateSpatialContagionInput'>()
.readonly();

export type ICalculateSpatialContagionInput = z.infer<typeof CalculateSpatialContagionInputSchema>;
