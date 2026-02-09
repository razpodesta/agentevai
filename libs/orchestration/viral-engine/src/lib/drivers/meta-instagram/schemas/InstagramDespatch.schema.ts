import { z } from 'zod';

export const InstagramConstraintsSchema = z.object({
  /** Resolução de Elite para denúncias (1080x1350) */
  targetWidth: z.literal(1080),
  targetHeight: z.literal(1350),
  /** Legenda: Limite técnico de 2200 caracteres */
  maxCaptionLength: z.literal(2200),
  /** Mídia obrigatória */
  contentType: z.enum(['IMAGE', 'VIDEO', 'CAROUSEL'])
}).readonly();

export const InstagramDespatchSchema = z.object({
  mediaUrl: z.string().url(),
  caption: z.string().max(2200),
  locationId: z.string().optional().describe('ID de geolocalização da Meta.'),
  correlationIdentifier: z.uuid()
}).readonly();
