/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus JournalLayoutSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1
 */

import { z } from 'zod';
import { SovereignLocaleSchema } from '@agentevai/types-common';

export const JournalLayoutSchema = z.object({
  activeSovereignLocale: SovereignLocaleSchema,
  isUserAuthenticated: z.boolean().default(false),
  systemThemeMode: z.enum(['OBSIDIAN', 'MILK']).default('OBSIDIAN'),
  correlationIdentifier: z.uuid()
}).readonly();

export type IJournalLayout = z.infer<typeof JournalLayoutSchema>;
