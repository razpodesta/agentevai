/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReaction.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN mestre para interações sociais soberanas. Sincronizado para Zod V4.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded) 
 */
export const ReactionTypeSchema = z.enum([
  'SUPPORT',    // Fé Pública
  'REJECT',     // Flag de Entropia
  'APPRECIATE'  // Afinidade
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
    .describe('Volume consolidado de interações no território.'),

  isUserActivelyEngaged: z.boolean()
    .describe('Estado de engajamento do cidadão logado.'),

  /** Sincronia Zod v4: Definição estrutural de função */
  onInteractionIgnition: z.function({
    input: z.tuple([ReactionTypeSchema]),
    output: z.void()
  }).describe('Callback de alta prioridade para selagem da vontade.'),

  /** Silo linguístico tipado para o aparato */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Fragmento de dicionário validado.'),

  /** Identificador Zenith para correlação forense total */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'SovereignReactionTriggerInput'>()
.readonly();

export type ISovereignReactionTrigger = z.infer<typeof SovereignReactionTriggerInputSchema>;