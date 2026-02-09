/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Kinetic Engagement
 * @description ADN para reações semânticas. Define o peso e a intenção do engajamento.
 */

import { z } from 'zod';

export const ReactionTypeSchema = z.enum([
  'SUPPORT',    // Investimento de reputação (Apoio Popular)
  'REJECT',     // Sinalização de falsidade ou má conduta
  'APPRECIATE'  // Engajamento leve (Like tradicional)
]).describe('A natureza semântica da reação do cidadão.');

export const SovereignReactionTriggerSchema = z.object({
  reactionType: ReactionTypeSchema,

  interactionCount: z.number().int().nonnegative()
    .describe('Volume total de vozes registradas para esta categoria.'),

  isUserActivelyEngaged: z.boolean()
    .describe('Sinaliza se o cidadão logado já selou sua vontade neste conteúdo.'),

  onInteractionIgnition: z.function().args(ReactionTypeSchema).returns(z.void())
    .describe('Callback de alta prioridade para o motor de reputação.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISovereignReactionTrigger = z.infer<typeof SovereignReactionTriggerSchema>;
