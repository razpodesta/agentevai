/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaserSchema
 * @version 6.6.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN mestre para teasers com suporte a acessibilidade contextual e rastro forense.
 */

import { z } from 'zod';
import { CitizenAuraCardSchema } from '@agentevai/community-ui';

export const TeaserMediaSchema = z.object({
  resourceType: z.enum(['IMAGE', 'VIDEO', 'AUDIO']),
  resourceUniversalResourceLocator: z.string().url(),
  /** @section SEO_AUTHORITY_DIRECTIVE */
  contextualAccessibilityDescription: z.string()
    .min(10).max(250)
    .describe('Descrição detalhada do fato para indexação E-E-A-T.'),
  blurDataUrlSnapshot: z.string().optional()
}).readonly();

export const SovereignArticleTeaserSchema = z.object({
  identifier: z.uuid(),
  categoryIdentifier: z.enum(['INFRASTRUCTURE', 'SECURITY', 'HEALTH', 'ECONOMY', 'GOVERNANCE']),
  authorSnapshot: CitizenAuraCardSchema,
  title: z.string().min(10).max(120),
  narrativeExcerpt: z.string().min(20).max(180),
  mediaResource: TeaserMediaSchema,
  readingTimeInMinutes: z.number().int().positive(),
  publishedAt: z.string().datetime(),
  dictionary: z.record(z.string(), z.record(z.string(), z.string())),
  correlationIdentifier: z.uuid()
})
.brand<'SovereignArticleTeaser'>()
.readonly();

export type ISovereignArticleTeaser = z.infer<typeof SovereignArticleTeaserSchema>;