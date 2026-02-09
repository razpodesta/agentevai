import { z } from 'zod';

export const XComConstraintsSchema = z.object({
  /** Limite estrito de 280 caracteres */
  maxCharacterCount: z.literal(280),
  /** Formatos de imagem aceitos pela X Corp */
  allowedMediaFormats: z.enum(['image/png', 'image/jpeg', 'image/webp', 'video/mp4']),
  /** Proporção recomendada para Cards de denúncia (1.91:1) */
  recommendedAspectRatio: z.literal('1.91:1')
}).readonly();

export const XComDespatchSchema = z.object({
  status: z.string().min(1).max(280),
  mediaIdentifiers: z.array(z.string()).max(4),
  correlationIdentifier: z.uuid()
}).readonly();
