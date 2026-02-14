/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EntropyGuard.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN para controle de cadência e mitigação de entropia de rede.
 */

import { z } from 'zod';
import { ThreatLevelSchema } from './SovereignShield.schema.js';

/**
 * @name EntropyAuditResultSchema
 * @section Selagem Nominal Zenith
 */
export const EntropyAuditResultSchema = z.object({
  isAllowed: z.boolean()
    .describe('Decisão soberana de liberação baseada na cota de entropia.'),

  remainingRequestsCount: z.number()
    .int().nonnegative()
    .describe('Saldo residual de petições para a janela ativa.'),

  behavioralRiskScore: z.number()
    .min(0).max(100)
    .describe('Índice de periculosidade rítmica detectada.'),

  currentThreatLevel: ThreatLevelSchema,

  resetTimestampInMilliseconds: z.number()
    .describe('Marca temporal UNIX para renovação da cota de acesso.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
})
.brand<'EntropyAuditResult'>()
.readonly();

export type IEntropyAuditResult = z.infer<typeof EntropyAuditResultSchema>;
