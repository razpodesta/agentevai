/**
 * @author Raz Podestá - MetaShark Tech
 */
import { z } from 'zod';

export const CitizenSovereignBadgeSchema = z.object({
  isVisible: z.boolean().default(true),
}).brand<'CitizenSovereignBadge'>().readonly();

export type ICitizenSovereignBadge = z.infer<typeof CitizenSovereignBadgeSchema>;