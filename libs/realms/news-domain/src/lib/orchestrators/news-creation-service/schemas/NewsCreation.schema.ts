import { z } from 'zod';
import { NewsArticleSchema } from '../../../infrastructure/schemas/NewsArticle.schema.js';

/**
 * @name NewsCreationInputSchema
 * @description Aduana de entrada para criação de notícias.
 */
export const NewsCreationInputSchema = NewsArticleSchema
  .omit({
    updatedAt: true,
    editorialStatus: true
  })
  .extend({
    forceBlockchainSealing: z.boolean().default(false).describe('Diretiva para forçar selagem imediata.')
  })
  .readonly();

export type INewsCreationInput = z.infer<typeof NewsCreationInputSchema>;
