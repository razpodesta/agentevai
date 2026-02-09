/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus MediaNormalizerSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Visual Sovereignty
 */

import { z } from 'zod';

export const VisualPrescriptionSchema = z.object({
  targetWidth: z.number().positive(),
  targetHeight: z.number().positive(),
  aspectRatioLabel: z.string(),
  adjustmentDirective: z.enum(['NONE', 'CROP_CENTER', 'LETTERBOX_FILL', 'SCALE_ONLY']),
  safeZonePaddingInPixels: z.number().default(40)
}).readonly();

export type IVisualPrescription = z.infer<typeof VisualPrescriptionSchema>;
