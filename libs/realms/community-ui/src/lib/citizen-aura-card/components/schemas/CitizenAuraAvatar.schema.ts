/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraAvatarSchema
 */
import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

export const CitizenAuraAvatarSchema = z.object({
  citizenName: z.string().min(2),
  profilePictureUrl: z.string().url().optional(),
  reputationScore: ReputationScoreSchema,
  isSuspended: z.boolean().default(false),
}).brand<'CitizenAuraAvatar'>().readonly();

export type ICitizenAuraAvatar = z.infer<typeof CitizenAuraAvatarSchema>;