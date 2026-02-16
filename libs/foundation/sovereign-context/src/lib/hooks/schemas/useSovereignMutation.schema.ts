/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus useSovereignMutationSchema
 * @version 1.0.0
 * @protocol OEDP-V6.5
 */

import { z } from 'zod';

export const MutationIdentifierSchema = z.string()
  .min(5)
  .brand<'MutationIdentifier'>();

export type MutationIdentifier = z.infer<typeof MutationIdentifierSchema>;

/** @name SovereignMutationInputSchema */
export const SovereignMutationInputSchema = z.object({
  identifier: MutationIdentifierSchema,

  mutationExecutor: z.function({
    input: z.tuple([z.unknown()]),
    output: z.promise(z.unknown())
  }).describe('Função física que executa a mudança no servidor.'),

  optimisticUpdateHandler: z.function({
    input: z.tuple([z.unknown()]),
    output: z.void()
  }).optional().describe('Reflexo visual imediato no enxame de UI.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
}).readonly();

export type ISovereignMutationInput = z.infer<typeof SovereignMutationInputSchema>;