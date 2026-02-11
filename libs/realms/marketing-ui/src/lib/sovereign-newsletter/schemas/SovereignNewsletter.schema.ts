/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletterSchema
 * @version 4.3.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN mestre estabilizado. Erradicados erros TS2769/TS2339 via Object Pattern.
 * Sincronizado para Zod V4 com selagem nominal e imutabilidade total.
 */

import { z } from 'zod';

/** 
 * @section Contrato de Subscrição 
 * Define o rastro de e-mail institucional validado.
 */
export const SubscriberEmailSchema = z.string()
  .email({ message: 'INVALID_EMAIL_FORMAT' })
  .toLowerCase()
  .trim()
  .describe('Endereço de e-mail institucional do cidadão para selagem de rastro.')
  .brand<'SubscriberEmail'>();

export type SubscriberEmail = z.infer<typeof SubscriberEmailSchema>;

/** 
 * @section Zonas de Responsabilidade Atômica 
 */

/** @name NewsletterEditorialInputSchema */
export const NewsletterEditorialInputSchema = z.object({
  title: z.string().min(5).describe('Título de impacto narrativo para o broadcast.'),
  actionSuffix: z.string().describe('Sufixo regionalizado (ex: em ação).'),
  bodyText: z.string().min(20).describe('Corpo semântico do convite editorial.'),
  correlationIdentifier: z.uuid().describe('Identificador inalterável da jornada operativa.')
}).readonly();

/** @name NewsletterFormInputSchema */
export const NewsletterFormInputSchema = z.object({
  placeholder: z.string().describe('Rótulo de instrução para entrada de dados.'),
  submitLabel: z.string().describe('Comando de ativação da vontade de subscrição.'),
  isLoading: z.boolean().describe('Sinalizador de estado cinético de processamento.'),
  
  /** 
   * @section CURA_TS2769_TS2339 
   * Zod V4 Object Pattern: Definição atômica de Entrada e Saída.
   */
  onSubscribe: z.function({
    input: z.tuple([z.string().email()]),
    output: z.promise(z.void())
  }).describe('Callback atômico para persistência do rastro de e-mail.'),

  correlationIdentifier: z.uuid()
    .describe('Vínculo forense com o SovereignLogger.')
}).readonly();

/** @name SovereignNewsletterInputSchema - O Orquestrador */
export const SovereignNewsletterInputSchema = z.object({
  /** Título opcional para sobrescrever o padrão determinado pelo território */
  titleOverride: z.string()
    .min(5)
    .optional()
    .describe('Sobrescrita editorial do título principal.'),

  /** 
   * @section CURA_TS2769_TS2339 
   * Interface agnóstica configurada via Object Pattern para máxima resiliência.
   */
  onSubscribeIntent: z.function({
    input: z.tuple([z.string().email()]),
    output: z.promise(z.void())
  }).describe('Gatilho de intenção de subscrição agnóstico ao provedor de transporte.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para o aparato de marketing.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'SovereignNewsletterInput'>()
.readonly();

export type ISovereignNewsletterInput = z.infer<typeof SovereignNewsletterInputSchema>;