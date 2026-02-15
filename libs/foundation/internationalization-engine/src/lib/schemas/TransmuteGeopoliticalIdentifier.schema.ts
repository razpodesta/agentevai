/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalIdentifierSchema
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para validação de entradas geopolíticas.
 * CURADO: Selagem nominal estrita e descrições para auditoria neural.
 */

import { z } from 'zod';

/**
 * @name TransmutationInputBaseSchema
 * @description Estrutura fundamental permitindo transformações auditáveis.
 */
export const TransmutationInputBaseSchema = z.object({
  /** Entrada textual bruta (pode ser slug 'br', locale 'pt-BR' ou código 'BR') */
  rawInputPayload: z.string()
    .min(2)
    .trim()
    .describe('Entrada bruta para transmutação territorial (ex: "br", "pt-BR", "BR").'),

  /** Identificador Zenith para correlação total do rastro forense. */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada operativa para correlação de logs.')
});

/**
 * @name TransmutationInputSchema
 * @section Selagem Nominal Zenith
 */
export const TransmutationInputSchema = TransmutationInputBaseSchema
  .brand<'TransmutationInput'>()
  .readonly();

/**
 * @interface ITransmutationInput
 * @description Contrato imutável resultante da selagem de ADN.
 */
export type ITransmutationInput = z.infer<typeof TransmutationInputSchema>;