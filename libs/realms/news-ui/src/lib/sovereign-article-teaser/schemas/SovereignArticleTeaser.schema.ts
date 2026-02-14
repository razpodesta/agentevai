/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaser.schema
 * @version 6.5.8
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN mestre para teasers de notícias. Sincronizado para Zod V4 Zenith.
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';

/**
 * @name TeaserMediaSchema
 */
export const TeaserMediaSchema = z.object({
  resourceType: z.enum(['IMAGE', 'VIDEO', 'AUDIO'])
    .describe('Taxonomia do recurso visual para renderização de elite.'),

  resourceUniversalResourceLocator: z.string().url()
    .describe('Localização canônica da prova visual.'),

  blurDataUrlSnapshot: z.string().optional()
    .describe('Rastro binário Base64 para otimização de LCP (Largest Contentful Paint).')
}).readonly();

/**
 * @name SovereignArticleTeaserBaseSchema
 */
export const SovereignArticleTeaserBaseSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da notícia no rastro de soberania.'),

  categoryIdentifier: z.enum(['INFRASTRUCTURE', 'SECURITY', 'HEALTH', 'ECONOMY', 'GOVERNANCE'])
    .describe('Domínio editorial validado para ruteamento cinético.'),

  /** Identidade Soberana do Autor (Pilar I) */
  authorSnapshot: CitizenAuraCardSchema
    .describe('Rastro de identidade e prestígio de quem selou a notícia.'),

  title: z.string()
    .min(10).max(120)
    .describe('Título de impacto visual em conformidade com o F-Pattern.'),

  narrativeExcerpt: z.string()
    .min(20).max(180)
    .describe('Narrativa resumida para engajamento imediato no enxame regional.'),

  mediaResource: TeaserMediaSchema,

  readingTimeInMinutes: z.number().int().positive(),

  publishedAt: z.string().datetime(),

  /** Silo linguístico regionalizado */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Dicionário estruturado (Apparatus -> Key -> Value).'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação forense total.')
});

/**
 * @name SovereignArticleTeaserSchema
 */
export const SovereignArticleTeaserSchema = SovereignArticleTeaserBaseSchema
  .brand<'SovereignArticleTeaser'>()
  .readonly();

export type ISovereignArticleTeaser = z.infer<typeof SovereignArticleTeaserSchema>;
