/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleSchema
 * @version 4.1.0
 * @protocol OEDP-V6.0 - Structural Integrity SSOT
 * @description Única Fonte de Verdade para o rastro editorial de notícias.
 */

import { z } from 'zod';
import { SovereignCountrySchema } from '@agentevai/types-common';
import { 
  EditorialStateSchema, 
  NewsClassificationSchema 
} from '../../orchestrators/schemas/EditorialWorkflow.schema.js';

/**
 * @name NewsArticleBaseSchema
 * @description Estrutura pura para permitir extensibilidade e omissão em outros aparatos de Reino.
 */
export const NewsArticleBaseSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador universal inalterável da notícia no cofre relacional.'),

  authorIdentifier: z.uuid()
    .describe('Identificador único da identidade autora do rastro.'),

  title: z.string()
    .min(10)
    .max(150)
    .describe('Título editorial em conformidade com o padrão de legibilidade.'),

  content: z.string()
    .min(100)
    .describe('Corpo textual soberano (Markdown/RichText).'),

  excerpt: z.string()
    .max(300)
    .describe('Resumo editorial para sindicação e feeds.'),

  category: NewsClassificationSchema
    .describe('Domínio temático da notícia.'),

  editorialStatus: EditorialStateSchema
    .describe('Estágio inalterável da notícia no ciclo de vida editorial.'),

  regionalSlug: z.string()
    .min(2)
    .describe('Âncora geográfica para ruteamento dinâmico.'),

  countryCode: SovereignCountrySchema
    .describe('Código de soberania nacional ativa.'),

  merkleRootAnchor: z.string()
    .length(64)
    .optional()
    .describe('Âncora SHA-256 de imutabilidade matemática.'),

  viewCount: z.number()
    .int()
    .nonnegative()
    .default(0),

  updatedAt: z.string()
    .datetime()
    .describe('Marca temporal da última transmutação.'),

  correlationIdentifier: z.uuid()
    .describe('Vínculo forense para correlação de telemetria.')
});

/**
 * @name NewsArticleSchema
 * @description Contrato SELADO e NOMINAL para uso em objetos de domínio NewsArticle.
 */
export const NewsArticleSchema = NewsArticleBaseSchema
  .brand<'NewsArticle'>()
  .readonly();

export type INewsArticle = z.infer<typeof NewsArticleSchema>;