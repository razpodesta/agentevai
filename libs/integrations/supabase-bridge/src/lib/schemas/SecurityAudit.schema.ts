/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SecurityAuditSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Forensic Data Integrity
 * @description ADN que define a estrutura de persistência para eventos de segurança.
 */

import { z } from 'zod';

/**
 * @name SecurityAuditEntrySchema
 * @description Define o contrato para selagem de vereditos no banco de dados.
 */
export const SecurityAuditEntrySchema = z.object({
  auditIdentifier: z.uuid()
    .describe('Identificador único inalterável do registro de auditoria.'),

  internetProtocolAddress: z.ipv4()
    .describe('Endereço IP validado da origem do tráfego.'),

  userAgentFingerprint: z.string().length(64)
    .describe('Assinatura digital SHA-256 do agente detectado.'),

  botReputationScore: z.number().min(0).max(100),

  securityVerdict: z.enum(['ALLOWED', 'BLOCKED', 'THROTTLED'])
    .describe('Decisão final tomada pelos orquestradores de segurança.'),

  threatCategory: z.string().min(3)
    .describe('Classificação taxonômica da ameaça (ex: MALICIOUS_AUTOMATION).'),

  correlationIdentifier: z.uuid()
    .describe('Rastro de jornada para perícia cruzada com logs neurais.'),

  detectedAt: z.string().datetime()
    .describe('Timestamp preciso da detecção em conformidade ISO-8601.')
}).readonly();

export type ISecurityAuditEntry = z.infer<typeof SecurityAuditEntrySchema>;
