/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ViralContentSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Precision Virality
 * @description ADN que define a Cápsula de Mídia Soberana para difusão massiva.
 */

import { z } from 'zod';

export const ViralPlatformSchema = z.enum([
  'X_COM',
  'META_FACEBOOK',
  'META_INSTAGRAM',
  'META_THREADS',
  'TIKTOK',
  'WHATSAPP'
]).describe('Plataformas homologadas para difusão de denúncias.');

/**
 * @name ViralCapsuleSchema
 * @description Define a integridade do rastro que será injetado nas redes sociais.
 */
export const ViralCapsuleSchema = z.object({
  title: z.string()
    .min(10).max(100)
    .describe('Título otimizado para engajamento social.'),

  sourceUrl: z.string().url()
    .describe('Link canônico da notícia no portal Agentevai.'),

  shareMessage: z.string().max(280)
    .describe('Texto curto contendo hashtags e call-to-action.'),

  mediaAssets: z.array(z.object({
    url: z.string().url(),
    type: z.enum(['IMAGE', 'VIDEO']),
    dimensions: z.object({ width: z.number(), height: z.number() }).optional()
  })).min(1).describe('Recursos multimídia integrados ao Frame.'),

  merkleRootProof: z.string().length(64)
    .describe('Prova de imutabilidade blockchain para garantir a veracidade do rastro.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type IViralCapsule = z.infer<typeof ViralCapsuleSchema>;
