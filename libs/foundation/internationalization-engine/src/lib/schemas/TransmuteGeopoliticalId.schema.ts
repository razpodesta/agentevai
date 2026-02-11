/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalIdSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de fronteira para transmutação de identificadores territoriais.
 */

import { z } from 'zod';

/**
 * @name TransmutationInputSchema
 * @description Aduana para entrada bruta de identificadores (slugs, locales ou códigos).
 */
export const TransmutationInputSchema = z.object({
  rawInput: z.string()
    .min(2)
    .trim()
    .describe('Entrada bruta para transmutação (ex: "br", "pt-BR", "BR").'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'TransmutationInput'>()
.readonly();

export type ITransmutationInput = z.infer<typeof TransmutationInputSchema>;