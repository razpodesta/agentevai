/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationInputSchema
 * @version 5.4.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de entrada para a ignição de novas notícias.
 * CURA DEFINITIVA TS2322: Omissão realizada sobre a base unbranded.
 */

import { z } from 'zod';
import { NewsArticleBaseSchema } from '../../../infrastructure/schemas/NewsArticle.schema.js';

/**
 * @name NewsCreationInputSchema
 * @description Aduana de entrada para criação. Remove campos infraestruturais e injeta diretivas.
 */
export const NewsCreationInputSchema = NewsArticleBaseSchema
  .omit({
    updatedAt: true,
    editorialStatus: true,
    viewCount: true
    // Note: publishedAt não constava no Base, se existir no seu banco, adicione no Base primeiro.
  })
  .extend({
    forceBlockchainSealing: z.boolean()
      .default(false)
      .describe('Diretiva para forçar a selagem matemática imediata.'),

    internalSubmissionNote: z.string()
      .min(10)
      .optional()
      .describe('Nota técnica para auditoria neural.'),

    correlationIdentifier: z.uuid()
      .describe('Identificador exigido para rastro forense total.')
  })
  .brand<'NewsCreationInput'>()
  .readonly();

export type INewsCreationInput = z.infer<typeof NewsCreationInputSchema>;