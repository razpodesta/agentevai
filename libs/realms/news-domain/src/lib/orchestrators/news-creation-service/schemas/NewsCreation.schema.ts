/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationInputSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Structural Integrity
 * @description ADN de entrada para o motor de criação de notícias.
 */

import { z } from 'zod';
import { NewsArticleBaseSchema } from '../../../infrastructure/schemas/NewsArticle.schema.js';

/**
 * @name NewsCreationInputSchema
 * @description Aduana de entrada purificada. Remove campos automáticos e injeta diretivas.
 * Sincronizado para Zod V4 com descrições densas para o Auditor Neural.
 */
export const NewsCreationInputSchema = NewsArticleBaseSchema
  .omit({
    updatedAt: true,
    editorialStatus: true,
    publishedAt: true,
    viewCount: true
  })
  .extend({
    forceBlockchainSealing: z.boolean()
      .default(false)
      .describe('Diretiva de comando para forçar a geração imediata da prova de imutabilidade.'),

    internalSubmissionNote: z.string()
      .min(10)
      .optional()
      .describe('Nota técnica opcional para o rastro de auditoria neural.')
  })
  .brand<'NewsCreationInput'>()
  .readonly();

export type INewsCreationInput = z.infer<typeof NewsCreationInputSchema>;
