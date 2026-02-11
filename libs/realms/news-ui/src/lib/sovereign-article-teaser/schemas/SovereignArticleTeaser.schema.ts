/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaserSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN mestre para teasers de notícias. Sincronizado para Zod V4.
 */

import { z } from 'zod';

/** @section Contratos Auxiliares */
export const TeaserMediaSchema = z.object({
  type: z.enum(['IMAGE', 'VIDEO', 'AUDIO']),
  url: z.string().url().describe('Localização canônica do recurso visual.'),
  blurDataUrl: z.string().optional().describe('Rastro para carregamento progressivo LCP.')
}).readonly();

/**
 * @name SovereignArticleTeaserInputSchema
 * @description Aduana de entrada estrita para o aparato de destaque editorial.
 */
export const SovereignArticleTeaserInputSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da notícia para rastro de soberania.'),

  categoryKey: z.enum(['INFRASTRUCTURE', 'SECURITY', 'HEALTH', 'ECONOMY', 'GOVERNANCE'])
    .describe('Domínio editorial validado para ruteamento cinético.'),

  title: z.string()
    .min(10)
    .max(100)
    .describe('Título de impacto visual em conformidade com o F-Pattern.'),

  excerpt: z.string()
    .min(20)
    .max(180)
    .describe('Narrativa resumida para engajamento imediato.'),

  media: TeaserMediaSchema,

  readingTimeInMinutes: z.number().int().positive(),

  publishedAt: z.string().datetime(),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para transmutação do aparato.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'SovereignArticleTeaserInput'>()
.readonly();

export type ISovereignArticleTeaserInput = z.infer<typeof SovereignArticleTeaserInputSchema>;