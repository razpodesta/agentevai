/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaserSchema
 * @version 2.2.0
 */

import { z } from 'zod';

export const TeaserMediaSchema = z.object({
  type: z.enum(['IMAGE', 'VIDEO', 'AUDIO']),
  url: z.string().url().describe('URL canônica do recurso visual.'),
  blurDataUrl: z.string().optional().describe('Lógica LCP: Placeholder para carregamento suave.')
}).readonly();

export const SovereignArticleTeaserInputSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da notícia no rastro de soberania.'),

  categoryKey: z.string().min(2)
    .describe('Chave semântica para tradução da editoria (ex: category_INFRASTRUCTURE).'),

  title: z.string().min(10).max(100),

  excerpt: z.string().min(20).max(180),

  media: TeaserMediaSchema,

  readingTimeInMinutes: z.number().int().positive(),

  publishedAt: z.string().datetime(),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Fragmento de dicionário regional para o teaser.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISovereignArticleTeaserInput = z.infer<typeof SovereignArticleTeaserInputSchema>;