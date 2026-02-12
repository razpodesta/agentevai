/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Master DNA Integrity
 */

import { z } from 'zod';
import { NewsArticleBaseSchema } from '../../../infrastructure/schemas/NewsArticle.schema.js';

/**
 * @name NewsCreationInputSchema
 * @description Aduana de entrada para ignição de notícias.
 * CURA TS2322: Omissão realizada sobre a estrutura unbranded para permitir re-selagem nominal.
 */
export const NewsCreationInputSchema = NewsArticleBaseSchema
  .omit({
    updatedAt: true,
    editorialStatus: true,
    viewCount: true,
    merkleRootAnchor: true // Removido do input para ser gerado pelo orquestrador
  })
  .extend({
    forceBlockchainSealing: z.boolean()
      .default(false)
      .describe('Diretiva de comando para forçar a geração imediata de prova matemática.'),

    internalSubmissionNote: z.string()
      .min(10)
      .optional()
      .describe('Nota técnica opcional para o Auditor Neural ou revisores de elite.'),

    correlationIdentifier: z.uuid()
      .describe('Identificador Zenith exigido para rastro forense total.')
  })
  .brand<'NewsCreationInput'>()
  .readonly();

export type INewsCreationInput = z.infer<typeof NewsCreationInputSchema>;