/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EntropyGuardSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Precision Security
 * @description ADN para controle de cadência e mitigação de negação de serviço (DoS).
 */

import { z } from 'zod';
import { ThreatLevelSchema } from './SovereignShield.schema.js';

/**
 * @name EntropyAuditResultSchema
 * @description Veredito de permissão de tráfego com análise behaviorista.
 */
export const EntropyAuditResultSchema = z.object({
  isAllowed: z.boolean()
    .describe('Decisão final de bloqueio ou liberação baseada na entropia detectada.'),

  remainingRequestsCount: z.number().int().nonnegative()
    .describe('Saldo residual de petições para o ciclo ativo.'),

  behavioralRiskScore: z.number().min(0).max(100)
    .describe('Índice de periculosidade do ritmo de acesso atual.'),

  currentThreatLevel: ThreatLevelSchema,

  resetTimestamp: z.number()
    .describe('Marca temporal UNIX (ms) para renovação da cota.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type IEntropyAuditResult = z.infer<typeof EntropyAuditResultSchema>;
