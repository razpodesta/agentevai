/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDiffusionGuardSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - User Sovereignty
 */

import { z } from 'zod';

export const SovereignDiffusionGuardSchema = z.object({
  isConfirmationRequired: z.boolean().default(true),

  /** Persistência de preferência via rastro de cookie */
  shouldBypassNextTime: z.boolean().default(false),

  targetPlatformName: z.string().min(2),

  onConfirm: z.function().args(z.boolean()).returns(z.void())
    .describe('Callback que recebe a decisão de bypass.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISovereignDiffusionGuard = z.infer<typeof SovereignDiffusionGuardSchema>;
