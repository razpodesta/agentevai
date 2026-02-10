/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticSheenBackdropSchema
 * @protocol OEDP-V5.5.2
 */
import { z } from 'zod';

export const KineticSheenBackdropSchema = z.object({
  isActive: z.boolean().default(true).describe('Activa la animación de barrido de luz.'),
}).readonly();

export type IKineticSheenBackdrop = z.infer<typeof KineticSheenBackdropSchema>;