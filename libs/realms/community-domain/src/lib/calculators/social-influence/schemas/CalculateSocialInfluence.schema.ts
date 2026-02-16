import { z } from 'zod';
import { ReputationScoreSchema } from '@agentevai/identity-domain';

export const InfluenceMultiplierSchema = z.number().min(1).max(50).brand<'InfluenceMultiplier'>();

export const CalculateSocialInfluenceInputSchema = z.object({
  currentStanding: ReputationScoreSchema,
  isVerifiedIAL3: z.boolean(),
  totalEndorsementsInHexagon: z.number().nonnegative(),
  correlationIdentifier: z.uuid()
}).brand<'CalculateSocialInfluenceInput'>().readonly();

export type ICalculateSocialInfluenceInput = z.infer<typeof CalculateSocialInfluenceInputSchema>;