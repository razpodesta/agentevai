/**
 * @author Raz Podestá - MetaShark Tech
 */
import { z } from 'zod';

export const SovereignTrustFooterSchema = z.object({
  isSovereign: z.boolean(),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
}).readonly();

export type ISovereignTrustFooter = z.infer<typeof SovereignTrustFooterSchema>;