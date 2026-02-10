/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalIdSchema
 * @version 1.5.0
 * @protocol OEDP-V5.5.2 - Forensic Precision
 * @description ADN de entrada para o motor de transmutação geopolítica.
 * Saneado: Erradicada a radiação de importações não utilizadas (Cura de Erros ESLint).
 */

import { z } from 'zod';

/**
 * @name TransmutationInputSchema
 * @description Aduana para a entrada bruta de identificadores territoriais.
 */
export const TransmutationInputSchema = z.object({
  /** 
   * Entrada textual bruta (pode ser slug, locale ou country code).
   * Transformação proativa: Trim e normalização básica.
   */
  rawInput: z.string()
    .min(2)
    .trim()
    .describe('Entrada bruta para transmutação (ex: "br", "pt-BR", "BR").'),

  /** 
   * Identificador inalterável da jornada para correlação de logs neurais.
   * Zod v4 Sync: Uso do construtor de topo z.uuid().
   */
  correlationIdentifier: z.uuid()
    .describe('Rastro forense para vínculo com o SovereignLogger.')

}).readonly();

/**
 * @interface ITransmutationInput
 * @description Contrato imutável resultante da selagem de ADN.
 */
export type ITransmutationInput = z.infer<typeof TransmutationInputSchema>;