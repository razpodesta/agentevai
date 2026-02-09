/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NeuralPromptRegistrySchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Cognitive Sovereignty
 * @description Define o ADN para prompts dinâmicos que podem ser atualizados via UI.
 */

import { z } from 'zod';

export const AuditorPersonaSchema = z.enum([
  'FORENSIC_EXAMINER',  // Foco em rastro e stack trace
  'SECURITY_SENTINEL',  // Foco em ameaças e invasão
  'UX_STABILITY_JUDGE', // Foco em quebra de interface
  'ARCHITECT_ELITE'     // Foco em SOLID/DRY e refatoração
]);

export const MasterPromptSchema = z.object({
  identifier: z.uuid(),
  persona: AuditorPersonaSchema,
  directiveTemplate: z.string().min(100).describe('O corpo do prompt com placeholders {error} e {context}.'),
  targetModelTier: z.string().default('latest'),
  version: z.number().int().positive(),
  updatedAt: z.string().datetime()
}).readonly();

export type IMasterPrompt = z.infer<typeof MasterPromptSchema>;