/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityAttributesSchema
 * @version 7.0.1
 * @protocol OEDP-V7.0 - Law Enforcement SSOT
 * @description Define as capacidades físicas resultantes do mérito social.
 * CURADO: Erradicada radiação técnica 'any' (Erro ESLint Severidade 8).
 */

import { z } from 'zod';

export const VotingWeightMultiplierSchema = z.number()
  .min(1).max(20)
  .brand<'VotingWeightMultiplier'>();

export type VotingWeightMultiplier = z.infer<typeof VotingWeightMultiplierSchema>;

export const IdentityAttributesSchema = z.object({
  canPublishOriginalContent: z.boolean().default(false),
  canEndorsePublicComplaints: z.boolean().default(false),
  canModerateRegionalEntropy: z.boolean().default(false),
  isImmuneToAutoModeration: z.boolean().default(false),

  /** @section CURA_RADIAÇÃO_ANY (Casting via unknown) */
  votingWeightMultiplier: VotingWeightMultiplierSchema
    .default(1 as unknown as VotingWeightMultiplier),

  isOperatingInDegradedPrivilegeMode: z.boolean().default(false)
})
.brand<'IdentityAttributes'>()
.readonly();

export type IIdentityAttributes = z.infer<typeof IdentityAttributesSchema>;
