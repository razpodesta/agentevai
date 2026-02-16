/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NotificationNexusSchema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para orquestração de comunicações e pulsos de presença.
 * CURADO: Unificação nominal e selagem de tipos Branded.
 */

import { z } from 'zod';

/** @section Dimensões Nominais (Branded Types) */
export const MessageStatusSchema = z.enum([
  'SENT',
  'DELIVERED',
  'READ',
  'FAILED'
])
.describe('Reflete o estágio inalterável da mensagem no rastro de soberania.')
.brand<'MessageStatus'>();

export type MessageStatus = z.infer<typeof MessageStatusSchema>;

/** 
 * @name NotificationNexusInputBaseSchema 
 * @description Estrutura para recuperação de rastro em caso de colapso.
 */
export const NotificationNexusTraceSchema = z.object({
  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
}).passthrough();

/** @name SovereignMessageSchema */
export const SovereignMessageSchema = z.object({
  identifier: z.uuid(),
  senderIdentifier: z.uuid(),
  recipientIdentifier: z.uuid(),
  bodyContent: z.string().min(1).max(4096),
  status: MessageStatusSchema.default('SENT' as MessageStatus),
  mediaUniversalResourceLocator: z.string().url().optional(),
  emojiReactions: z.array(z.string()).default([]),
  correlationIdentifier: z.uuid()
})
.brand<'SovereignMessage'>()
.readonly();

export type ISovereignMessage = z.infer<typeof SovereignMessageSchema>;