/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SignaturePoolingSchema
 * @version 1.1.0
 */

import { z } from 'zod';
import { PopularSupportSignatureSchema } from '../../schemas/PopularSupportSignature.schema.js';

export const WeightedImpactSchema = z.number()
  .min(1)
  .describe('Pontuação de impacto social baseada no Nível de Garantia (IAL).')
  .brand<'WeightedImpact'>();

export type WeightedImpact = z.infer<typeof WeightedImpactSchema>;

/**
 * @name SignatureIngestionInputSchema
 * @description Aduana para entrada de novas assinaturas no pooling.
 */
export const SignatureIngestionInputSchema = z.object({
  signature: PopularSupportSignatureSchema,
  regionalSlug: z.string().min(2),
  correlationIdentifier: z.uuid()
}).readonly();

export type ISignatureIngestionInput = z.infer<typeof SignatureIngestionInputSchema>;