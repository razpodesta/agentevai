/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserAgentCollectorSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Intelligence Sourcing
 * @description ADN para a persistência de rastros de agentes de usuário.
 */

import { z } from 'zod';

/**
 * @name UserAgentTraceSchema
 * @description Define o contrato de persistência para o rastro capturado pelo Sentinel.
 */
export const UserAgentTraceSchema = z.object({
  fingerprint: z.string().length(64)
    .describe('Hash SHA-256 único da configuração do navegador/bot.'),

  userAgentRaw: z.string().min(1)
    .describe('Rastro textual bruto do User-Agent.'),

  isSuspicious: z.boolean()
    .describe('Sinalizador de ameaça detectada na borda.'),

  correlationIdentifier: z.uuid()
    .describe('UUID de jornada para vínculo com logs forenses.')
}).readonly();

export type IUserAgentTrace = z.infer<typeof UserAgentTraceSchema>;