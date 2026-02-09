/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletterSchema
 * @version 2.2.0
 * @protocol OEDP-V5.5.2 - High Precision & Conversional Integrity
 * @description ADN mestre para o aparato de captura de e-mails. 
 * Sincronizado para Zod V4 com suporte total a rastro forense e internacionalização.
 */

import { z } from 'zod';

/**
 * @name SovereignNewsletterInputSchema
 * @description Aduana de entrada estrita. Define a estrutura de dados, 
 * comportamentos de callback e rastro linguístico para a conversão.
 */
export const SovereignNewsletterInputSchema = z.object({
  /** 
   * Título de impacto visual. 
   * Caso ausente, o componente utilizará a chave 'mainTitle' do dicionário.
   */
  title: z.string()
    .min(5)
    .optional()
    .describe('Título editorial customizado para a seção de captura.'),

  /** 
   * @section Sincronia Zod V4 
   * Definição estrutural de função para orquestração de subscrição.
   */
  onSubscribeIntent: z.function({
    input: z.tuple([
      z.string().email().describe('Endereço de e-mail institucional validado do cidadão.')
    ]),
    output: z.promise(z.void()).describe('Promessa de conclusão da selagem no Data Vault.')
  }).describe('Gatilho de alta prioridade invocado após a manifestação de vontade do usuário.'),

  /** 
   * @section Soberania Linguística
   * Cura do erro TS2339: Injeção do rastro de dicionário regional.
   */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Fragmento de dicionário regional injetado para humanização da interface.'),

  /** Identificador único da jornada para correlação com o SovereignLogger */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')

})
.brand<'SovereignNewsletterInput'>() // Selo de Identidade de Elite
.readonly(); // Imutabilidade forçada para proteção de rastro

/**
 * @interface ISovereignNewsletterInput
 * @description Contrato imutável resultante da selagem de ADN.
 */
export type ISovereignNewsletterInput = z.infer<typeof SovereignNewsletterInputSchema>;