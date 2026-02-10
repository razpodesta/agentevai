/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenStandingDisplaySchema
 */
import { z } from 'zod';

export const CitizenStandingDisplaySchema = z.object({
  citizenName: z.string().min(2),
  humanizedRole: z.string().min(3),
  reputationScore: z.number(),
  isSuspended: z.boolean(),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid(),
}).brand<'CitizenStandingDisplay'>().readonly();

export type ICitizenStandingDisplay = z.infer<typeof CitizenStandingDisplaySchema>;