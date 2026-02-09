/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsArticleSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Information Sovereignty
 * @description ADN que define a estrutura completa de uma notícia para persistência.
 */

import { z } from 'zod';
import { EditorialStateSchema, NewsClassificationSchema } from '../../orchestrators/schemas/EditorialWorkflow.schema.js';

/**
 * @name NewsArticleBaseSchema
 * @description Estrutura mestre do artigo jornalístico.
 */
export const NewsArticleBaseSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da notícia no banco de dados.'),

  authorIdentifier: z.uuid()
    .describe('ID do cidadão ou engenheiro autor (rastro forense).'),

  title: z.string().min(10).max(150),

  content: z.string().min(100)
    .describe('Corpo da notícia em formato rich-text ou markdown soberano.'),

  excerpt: z.string().max(300),

  category: NewsClassificationSchema,

  editorialStatus: EditorialStateSchema,

  regionalSlug: z.string().min(2)
    .describe('Âncora geográfica de ruteamento (ex: sao-paulo).'),

  merkleRootAnchor: z.string().length(64).optional()
    .describe('Hash da prova blockchain (ausente em rascunhos).'),

  viewCount: z.number().int().nonnegative().default(0),

  publishedAt: z.string().datetime().optional(),

  updatedAt: z.string().datetime(),

  correlationIdentifier: z.uuid()
}).loose();

/**
 * @name NewsArticleSchema
 * @description Contrato SELADO para operações de infraestrutura.
 */
export const NewsArticleSchema = NewsArticleBaseSchema.readonly();

export type INewsArticle = z.infer<typeof NewsArticleSchema>;
