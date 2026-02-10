/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SupportActionContentSchema
 */
import { z } from 'zod';
import { SupportStatusSchema } from './PopularSupportTrigger.schema.js';

export const SupportActionContentInputSchema = z.object({
  status: SupportStatusSchema,
  isSovereign: z.boolean(),
  dictionary: z.record(z.string(), z.unknown()),
  correlationIdentifier: z.uuid()
}).readonly();

export type ISupportActionContentInput = z.infer<typeof SupportActionContentInputSchema>;