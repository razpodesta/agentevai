/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SignaturePoolingSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN mestre para orquestração de lotes de assinaturas.
 */

import { z } from 'zod';
import { PopularSupportSignatureSchema } from '../../../schemas/PopularSupportSignature.schema.js';

export const WeightedImpactSchema = z.number()
  .min(1)
  .describe('Pontuação de impacto social baseada no Nível de Garantia (IAL).')
  .brand<'WeightedImpact'>();

export type WeightedImpact = z.infer<typeof WeightedImpactSchema>;

/**
 * @name SignatureIngestionInputSchema
 * @description Aduana de entrada estrita para a malha de pooling.
 */
export const SignatureIngestionInputSchema = z.object({
  signature: PopularSupportSignatureSchema
    .describe('Snapshot da assinatura individual capturada na interface.'),

  regionalSlug: z.string()
    .min(2)
    .describe('Âncora geográfica da manifestação de vontade.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'SignatureIngestionInput'>()
.readonly();

export type ISignatureIngestionInput = z.infer<typeof SignatureIngestionInputSchema>;