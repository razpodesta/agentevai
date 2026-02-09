/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletterSchema
 * @version 2.1.0
 * @protocol OEDP-V5.5.1 - High Precision Audit
 * @description ADN de captura de e-mails institucionais saneado para Zod V4.
 */

import { z } from 'zod';

/**
 * @name SovereignNewsletterInputSchema
 * @description Aduana de entrada para o aparato de conversão.
 */
export const SovereignNewsletterInputSchema = z.object({
  /** Título editorial (Injetado via i18n ou override manual) */
  title: z.string().min(5).optional()
    .describe('Título de impacto visual para a seção de captura.'),

  /** 
   * @section Sincronia Zod V4 (Fix TS2339)
   * Substituído encadeamento .args() por definição estrutural de objeto.
   */
  onSubscribeIntent: z.function({
    input: z.tuple([
      z.string().email().describe('Endereço de e-mail institucional do cidadão.')
    ]),
    output: z.promise(z.void()).describe('Promessa de selagem no Vault.')
  }).describe('Gatilho de alta prioridade para o motor de conversão.'),

  /** Identificador de correlação para rastro forense */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')

}).readonly();

export type ISovereignNewsletterInput = z.infer<typeof SovereignNewsletterInputSchema>;