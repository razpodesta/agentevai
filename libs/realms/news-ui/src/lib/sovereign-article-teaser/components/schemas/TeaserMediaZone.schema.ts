/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TeaserMediaZoneSchema
 * @version 1.0.0
 * @protocol OEDP-V6.0 - Visual Precision
 * @description ADN de fronteira para a zona de mídia editorial.
 */

import { z } from 'zod';

export const TeaserMediaZoneInputSchema = z.object({
  mediaType: z.enum(['IMAGE', 'VIDEO', 'AUDIO'])
    .describe('Taxonomia do recurso multimídia.'),

  mediaUrl: z.string().url()
    .describe('Localização canônica do rastro visual.'),

  categoryLabel: z.string().min(2)
    .describe('Rótulo humanizado da editoria.'),

  /** @section Cura TS2322 */
  themeClass: z.string()
    .describe('Assinatura cromática baseada na matriz de soberania.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para o componente.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense.')
})
.brand<'TeaserMediaZoneInput'>()
.readonly();

export type ITeaserMediaZoneInput = z.infer<typeof TeaserMediaZoneInputSchema>;