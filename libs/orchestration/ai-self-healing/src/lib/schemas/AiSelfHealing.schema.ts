/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AiSelfHealingSchema
 * @version 1.2.0
 * @protocol OEDP-V5.5.1 - Physical Resilience
 * @description ADN para execução de patches. Sincronizado para produção real.
 */

import { z } from 'zod';

export const ImmunologicalProtocolSchema = z.enum([
  'CACHE_PURGE',          // Limpeza física no Upstash/Redis
  'CIRCUIT_BREAKER_TRIP', // Bloqueio de tráfego no Gateway
  'VAULT_KEY_ROTATION',   // Rotação de chaves no SovereignDataVault
  'SESSION_TERMINATION',  // Revogação de JWT no Supabase Auth
  'ENGINEER_ESCALATION'   // Despacho via Novu/PagerDuty
]).describe('Protocolos de intervenção física em infraestrutura.');

export const SelfHealingExecutionSchema = z.object({
  executionIdentifier: z.uuid(),
  auditIdentifier: z.uuid(),
  protocol: ImmunologicalProtocolSchema,
  targetApparatus: z.string().min(3),

  /** Rastro de produção: quanto tempo a infraestrutura demorou para responder ao patch */
  executionLatencyInMilliseconds: z.number().nonnegative(),

  /** Snapshot do estado da infraestrutura pós-intervenção */
  infrastructureReport: z.record(z.string(), z.unknown()).loose(),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISelfHealingExecution = z.infer<typeof SelfHealingExecutionSchema>;
