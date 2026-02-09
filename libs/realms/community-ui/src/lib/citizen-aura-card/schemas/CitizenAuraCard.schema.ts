/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCardSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Visual Authority
 * @description ADN que define a representação visual da identidade na comunidade.
 */

import { z } from 'zod';
import {
  IdentityRoleSchema,
  IdentityAssuranceLevelSchema,
  ReputationScoreSchema
} from '@agentevai/identity-domain';

export const CitizenAuraCardSchema = z.object({
  citizenName: z.string().min(2).max(50),

  profilePictureUrl: z.string().url().optional(),

  identityRole: IdentityRoleSchema,

  assuranceLevel: IdentityAssuranceLevelSchema,

  reputationStandingScore: ReputationScoreSchema,

  isProfileSuspended: z.boolean().default(false),

  correlationIdentifier: z.uuid()
}).readonly();

export type ICitizenAuraCard = z.infer<typeof CitizenAuraCardSchema>;
