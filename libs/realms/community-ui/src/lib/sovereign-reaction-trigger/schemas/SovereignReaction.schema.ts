/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionSchema
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN mestre para interações sociais. Sincronizado para Zod V4.
 */

import { z } from 'zod';

export const ReactionTypeSchema = z.enum([
  'SUPPORT',
  'REJECT',
  'APPRECIATE'
])
.describe('Identificador nominal da natureza semântica do engajamento.')
.brand<'ReactionType'>();

export type ReactionType = z.infer<typeof ReactionTypeSchema>;

/**
 * @name SovereignReactionTriggerInputSchema
 * @description Aduana de entrada estrita para o atuador de reações.
 */
export const SovereignReactionTriggerInputSchema = z.object({
  reactionType: ReactionTypeSchema,

  interactionCount: z.number()
    .int()
    .nonnegative()
    .describe('Volume total de interações detectadas no enxame regional.'),

  isUserActivelyEngaged: z.boolean()
    .describe('Indica se o cidadão logado já emitiu este sinal de vontade.'),

  /** Sincronia Zod v4: Definição estrutural de função */
  onInteractionIgnition: z.function({
    input: z.tuple([ReactionTypeSchema]),
    output: z.void()
  }).describe('Callback de alta prioridade para selagem da vontade no cofre.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para transmutação do aparato.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'SovereignReactionTriggerInput'>()
.readonly();

export type ISovereignReactionTrigger = z.infer<typeof SovereignReactionTriggerInputSchema>;