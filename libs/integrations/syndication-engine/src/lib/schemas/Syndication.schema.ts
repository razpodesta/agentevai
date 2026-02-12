/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SyndicationSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Master DNA Integrity
 * @description ADN que governa a transmutação editorial para o padrão XML/RSS.
 */

import { z } from 'zod';
import { SovereignLocaleSchema, SovereignCountrySchema } from '@agentevai/types-common';

/** @section Dimensão de Saída (Branded) */
export const SyndicationXmlRastroSchema = z.string()
  .describe('Documento XML selado em conformidade com RSS 2.0.')
  .brand<'SyndicationXmlRastro'>();

export type SyndicationXmlRastro = z.infer<typeof SyndicationXmlRastroSchema>;

/** @name SyndicationArticleSchema */
export const SyndicationArticleSchema = z.object({
  identifier: z.uuid(),
  title: z.string().min(10).max(120),
  excerpt: z.string().min(20).max(300),
  authorName: z.string().min(2),
  publishedAt: z.string().datetime(),
  merkleRootAnchor: z.string().length(64).optional()
    .describe('Âncora matemática de veracidade injetada no rastro XML.'),
  categoryLabel: z.string().min(2)
}).readonly();

export type ISyndicationArticle = z.infer<typeof SyndicationArticleSchema>;

/** @name SyndicationFeedInputSchema */
export const SyndicationFeedInputSchema = z.object({
  channelMetadata: z.object({
    title: z.string().min(10),
    description: z.string().min(20),
    siteUniversalResourceLocator: z.string().url(),
    feedUniversalResourceLocator: z.string().url(),
    activeLocale: SovereignLocaleSchema,
    countryCode: SovereignCountrySchema,
  }).readonly(),

  articles: z.array(SyndicationArticleSchema).min(1).readonly(),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
})
.brand<'SyndicationFeedInput'>()
.readonly();

export type ISyndicationFeedInput = z.infer<typeof SyndicationFeedInputSchema>;