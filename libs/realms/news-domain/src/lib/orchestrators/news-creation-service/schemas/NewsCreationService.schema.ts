/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN mestre para ignição de rastro editorial. Sincronizado para Zod V4.
 */

import { z } from 'zod';
import { NewsArticleBaseSchema } from '../../../infrastructure/schemas/NewsArticle.schema.js';

/**
 * @name NewsCreationInputSchema
 * @description Aduana de entrada estrita para criação de notícias.
 * CURA TS2322: Omissão estratégica para permitir re-selagem nominal no orquestrador.
 */
export const NewsCreationInputSchema = NewsArticleBaseSchema
  .omit({
    updatedAt: true,
    editorialStatus: true,
    viewCount: true,
    merkleRootAnchor: true
  })
  .extend({
    forceBlockchainSealing: z.boolean()
      .default(false)
      .describe('Diretiva de comando para gerar prova matemática imediata.'),

    internalSubmissionNote: z.string()
      .min(10)
      .optional()
      .describe('Nota técnica para o rastro forense da auditoria neural.'),

    correlationIdentifier: z.uuid()
      .describe('Identificador Zenith exigido para rastro forense total.')
  })
  .brand<'NewsCreationInput'>()
  .readonly();

export type INewsCreationInput = z.infer<typeof NewsCreationInputSchema>;
