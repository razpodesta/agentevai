/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TeaserMediaZoneSchema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN para unidade visual de mídia com suporte a SEO Authority.
 */

import { z } from 'zod';

export const TeaserMediaZoneInputSchema = z.object({
  resourceType: z.enum(['IMAGE', 'VIDEO', 'AUDIO'])
    .describe('Taxonomia do recurso multimídia para decisão de renderização.'),

  resourceUniversalResourceLocator: z.string().url()
    .describe('Localização canônica da prova visual.'),

  /** @section SEO_AUTHORITY_DIRECTIVE */
  contextualAccessibilityDescription: z.string()
    .min(10).max(250)
    .describe('Descrição detalhada do fato visual para indexação e fé pública.'),

  categoryLabel: z.string()
    .min(2)
    .describe('Rótulo da editoria resolvido pelo orquestrador pai.'),

  themeClass: z.string()
    .describe('Assinatura cromática baseada na matriz de soberania visual.'),

  blurDataUrlSnapshot: z.string().optional()
    .describe('Rastro binário Base64 para otimização de LCP.'),

  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Silo linguístico regionalizado.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação forense total.')
})
.brand<'TeaserMediaZoneInput'>()
.readonly();

export type ITeaserMediaZoneInput = z.infer<typeof TeaserMediaZoneInputSchema>;