/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SecurityAuditSchema
 * @version 4.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 * @description ADN que define a estrutura de persistência para eventos de segurança.
 * Saneado: Erradicada a obsessão por primitivos e abreviações lexicais.
 */

import { z } from 'zod';

/**
 * @name SecurityAuditEntrySchema
 * @description Define o contrato para selagem de vereditos no cofre relacional.
 */
export const SecurityAuditEntrySchema = z.object({
  /** Identificador único inalterável do registro de auditoria. */
  auditIdentifier: z.uuid(),

  /** Endereço IP validado da origem do tráfego. */
  internetProtocolAddress: z.ipv4(),

  /** Assinatura digital SHA-256 do agente detectado. */
  userAgentFingerprint: z.string().length(64),

  /** Pontuação de 0 a 100 baseada no comportamento do agente. */
  botReputationScore: z.number().min(0).max(100),

  /** Decisão final tomada pelos orquestradores de segurança. */
  securityVerdict: z.enum(['ALLOWED', 'BLOCKED', 'THROTTLED']),

  /** Classificação taxonômica da ameaça identificada. */
  threatCategory: z.enum(['CLEAN_BROWSER', 'KNOWN_CRAWLER', 'MALICIOUS_AUTOMATION', 'HEADLESS_SNEAK']),

  /** Rastro de jornada para correlação cross-platform. */
  correlationIdentifier: z.uuid(),

  /** Timestamp preciso da detecção em conformidade ISO-8601. */
  detectedAt: z.string().datetime()
})
.brand<'SecurityAuditEntry'>()
.readonly();

export type ISecurityAuditEntry = z.infer<typeof SecurityAuditEntrySchema>;