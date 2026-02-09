/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationInputSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - Structural Integrity
 * @description ADN de entrada para o motor de criação de notícias.
 * Derivado da base de infraestrutura com selagem imutável tardia.
 */

import { z } from 'zod';
/** 
 * @section Sincronia de Borda
 * Importamos a BASE para permitir .omit() e .extend() antes do selo final.
 */
import { NewsArticleBaseSchema } from '../../../infrastructure/schemas/NewsArticle.schema.js';

/**
 * @name NewsCreationInputSchema
 * @description Aduana de entrada purificada. Remove campos de rastro automático 
 * e injeta diretivas de orquestração.
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
      .describe('Diretiva de comando para forçar a geração imediata da Merkle Root.'),
    
    internalSubmissionNote: z.string()
      .min(10)
      .optional()
      .describe('Nota técnica opcional para o Auditor Neural ou revisor humano.')
  })
  .brand<'NewsCreationInput'>() // Selo de Identidade Nominal
  .readonly(); // Selagem Final de Imutabilidade

/**
 * @interface INewsCreationInput
 * @description Interface estrita para consumo no NewsCreationService.
 */
export type INewsCreationInput = z.infer<typeof NewsCreationInputSchema>;