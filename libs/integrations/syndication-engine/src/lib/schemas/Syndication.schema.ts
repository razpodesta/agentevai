/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SyndicationSchema
 * @version 1.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN mestre para o motor de sindicação. 
 * Garante que o rastro XML porte a âncora de veracidade matemática.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 */

import { z } from 'zod';
import { 
  SovereignLocaleSchema, 
  SovereignCountrySchema 
} from '@agentevai/types-common';

/** @section Tipagem Nominal (Branded) */
export const SyndicationXmlRastroSchema = z.string()
  .describe('Carga bruta em formato XML versionado.')
  .brand<'SyndicationXmlRastro'>();

export type SyndicationXmlRastro = z.infer<typeof SyndicationXmlRastroSchema>;

/** @name SyndicationArticleSchema */
export const SyndicationArticleSchema = z.object({
  identifier: z.uuid().describe('ID inalterável da notícia.'),
  title: z.string().min(10).describe('Título editorial.'),
  excerpt: z.string().min(20).describe('Resumo jornalístico.'),
  content: z.string().describe('Corpo completo para leitores de RSS full-text.'),
  authorName: z.string().describe('Nome do autor ou auditoria social.'),
  publishedAt: z.string().datetime().describe('Timestamp de ignição.'),
  merkleRootAnchor: z.string().length(64).optional().describe('Âncora de imutabilidade Blockchain.'),
  categoryLabel: z.string().describe('Editoria regionalizada.')
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

  /** Silo linguístico para telemetria semântica */
  dictionary: z.record(z.string(), z.unknown()),

  correlationIdentifier: z.uuid()
})
.brand<'SyndicationFeedInput'>()
.readonly();

export type ISyndicationFeedInput = z.infer<typeof SyndicationFeedInputSchema>;