/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus MediaSovereigntyNormalizer
 * @description Motor de cálculo geométrico para ajuste de mídia às normas das redes sociais.
 */

import { IVisualPrescription, VisualPrescriptionSchema } from './schemas/MediaNormalizer.schema.js';

export const MediaSovereigntyNormalizer = (
  platform: string,
  rawWidth: number,
  rawHeight: number
): IVisualPrescription => {
  // Mobile-First: Priorizamos a proporção vertical (9:16) ou retrato (4:5)

  if (platform === 'TIKTOK' || platform === 'META_INSTAGRAM_STORIES') {
    return VisualPrescriptionSchema.parse({
      targetWidth: 1080,
      targetHeight: 1920,
      aspectRatioLabel: '9:16',
      adjustmentDirective: rawHeight > rawWidth ? 'SCALE_ONLY' : 'LETTERBOX_FILL'
    });
  }

  if (platform === 'META_INSTAGRAM' || platform === 'META_THREADS') {
    return VisualPrescriptionSchema.parse({
      targetWidth: 1080,
      targetHeight: 1350,
      aspectRatioLabel: '4:5',
      adjustmentDirective: 'CROP_CENTER'
    });
  }

  // Padrão X.com (16:9 ou 1:1)
  return VisualPrescriptionSchema.parse({
    targetWidth: 1200,
    targetHeight: 675,
    aspectRatioLabel: '16:9',
    adjustmentDirective: 'CROP_CENTER'
  });
};
