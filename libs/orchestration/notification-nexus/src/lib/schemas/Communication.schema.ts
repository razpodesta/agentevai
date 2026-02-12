/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CommunicationSchema
 * @version 4.0.0
 * @protocol OEDP-V6.0 - Zenith High Precision
 * @description ADN de orquestração para comunicações soberanas. 
 */

import { z } from 'zod';

export const MessageStatusSchema = z.enum([
  'SENT',
  'DELIVERED',
  'READ',
  'FAILED'
])
.describe('Reflete o estágio inalterável da mensagem.')
.brand<'MessageStatus'>();

export type MessageStatus = z.infer<typeof MessageStatusSchema>;

/** 
 * @section Contrato Base de Rastro 
 * Usado para recuperação segura no bloco catch.
 */
export const SovereignTraceInputSchema = z.object({
  correlationIdentifier: z.uuid()
}).passthrough();

export const SovereignMessageSchema = z.object({
  identifier: z.uuid(),
  senderIdentifier: z.uuid(),
  recipientIdentifier: z.uuid(),
  bodyContent: z.string().min(1).max(4096),
  status: MessageStatusSchema.default(MessageStatusSchema.parse('SENT')),
  mediaUniversalResourceLocator: z.string().url().optional(),
  emojiReactions: z.array(z.string()).default([]),
  correlationIdentifier: z.uuid()
})
.brand<'SovereignMessage'>()
.readonly();

export const PresencePulseSchema = z.object({
  userIdentifier: z.uuid(),
  targetConversationIdentifier: z.uuid(),
  isActivelyTyping: z.boolean(),
  lastSeenTimestamp: z.string().datetime(),
  correlationIdentifier: z.uuid()
})
.brand<'PresencePulse'>()
.readonly();

export type ISovereignMessage = z.infer<typeof SovereignMessageSchema>;
export type IPresencePulse = z.infer<typeof PresencePulseSchema>;