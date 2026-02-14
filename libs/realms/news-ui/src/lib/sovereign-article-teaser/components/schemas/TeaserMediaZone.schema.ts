/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TeaserMediaZone.schema
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para a zona de mídia editorial. Sincronizado para Zod V4.
 */

import { z } from 'zod';

/**
 * @name TeaserMediaZoneInputSchema
 * @description Aduana de entrada estrita para a unidade visual.
 */
export const TeaserMediaZoneInputSchema = z.object({
  resourceType: z.enum(['IMAGE', 'VIDEO', 'AUDIO'])
    .describe('Taxonomia do recurso multimídia para decisão de renderização.'),

  resourceUniversalResourceLocator: z.string().url()
    .describe('Localização canônica da prova visual no storage soberano.'),

  blurDataUrlSnapshot: z.string().optional()
    .describe('Rastro binário Base64 para carregamento progressivo LCP.'),

  categoryLabel: z.string()
    .min(2)
    .describe('Rótulo humanizado da editoria resolvido pelo orquestrador pai.'),

  themeClass: z.string()
    .describe('Assinatura cromática baseada na matriz de soberania visual.'),

  /** Silo linguístico tipado para o aparato */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Dicionário estruturado (Apparatus -> Key -> Value).'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
})
.brand<'TeaserMediaZoneInput'>()
.readonly();

export type ITeaserMediaZoneInput = z.infer<typeof TeaserMediaZoneInputSchema>;
