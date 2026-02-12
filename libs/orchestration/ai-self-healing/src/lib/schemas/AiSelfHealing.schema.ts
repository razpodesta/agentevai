/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AiSelfHealingSchema
 * @version 6.3.0
 * @protocol OEDP-V6.0 - Physical Resilience DNA
 */

import { z } from 'zod';

/** 
 * @section Taxonomia de Protocolos 
 */
export const ImmunologicalProtocolSchema = z.enum([
  'CACHE_PURGE',          
  'CIRCUIT_BREAKER_TRIP', 
  'VAULT_KEY_ROTATION',   
  'SESSION_TERMINATION',  
  'ENGINEER_ESCALATION'   
])
.describe('Protocolos de intervenção física controlados por IA.')
.brand<'ImmunologicalProtocol'>();

export type ImmunologicalProtocol = z.infer<typeof ImmunologicalProtocolSchema>;

/**
 * @name SelfHealingExecutionBaseSchema
 */
export const SelfHealingExecutionBaseSchema = z.object({
  executionIdentifier: z.uuid()
    .describe('Identificador inalterável da execução do patch.'),

  auditIdentifier: z.uuid()
    .describe('Vínculo forense com o veredito da IA.'),

  protocol: ImmunologicalProtocolSchema,

  targetApparatus: z.string()
    .min(3)
    .describe('Nome do aparato alvo da cura.'),

  executionLatencyInMilliseconds: z.number()
    .nonnegative()
    .describe('Latência física de resposta da infraestrutura.'),

  infrastructureReport: z.record(z.string(), z.unknown())
    .describe('Snapshot do estado da malha pós-intervenção.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
});

/**
 * @name SelfHealingExecutionSchema
 */
export const SelfHealingExecutionSchema = SelfHealingExecutionBaseSchema
  .brand<'SelfHealingExecution'>()
  .readonly();

export type ISelfHealingExecution = z.infer<typeof SelfHealingExecutionSchema>;