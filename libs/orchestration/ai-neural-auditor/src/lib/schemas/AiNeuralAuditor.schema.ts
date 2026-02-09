/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AiNeuralAuditorSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - Neural Resonance & High Precision
 * @description ADN para o veredito de auditoria neural. 
 * Implementa a separação Base/Sealed para suporte total à Autocura.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy FORENSIC-TRACE: Registro de latência e persona auditora.
 */

import { z } from 'zod';
import { AuditorPersonaSchema } from './NeuralPromptRegistry.schema.js';

/**
 * @name NeuralDiagnosisResultSchema
 * @description Classificação semântica do estado do aparato auditado.
 */
export const NeuralDiagnosisResultSchema = z.enum([
  'STABLE_NOMINAL',       // Operação normal detectada após falso alarme.
  'TRANSIENT_ENTROPY',   // Falha de rede ou recurso temporário (Intervenção leve).
  'STRUCTURAL_COLLAPSE', // Falha de lógica ou quebra de contrato ADN (Intervenção severa).
  'HOSTILE_INTERVENTION' // Suspeita de manipulação, injeção ou ataque de força bruta.
]).describe('Veredito da IA sobre a natureza taxonômica da falha.');

/**
 * @name SystemAuditVerdictBaseSchema
 * @description Estrutura fundamental da sentença técnica.
 * Aberta para mutações durante o processo de inferência da IA.
 */
export const SystemAuditVerdictBaseSchema = z.object({
  auditIdentifier: z.uuid()
    .describe('Identificador único e inalterável do processo de auditoria.'),

  targetApparatus: z.string().min(3)
    .describe('Nome PascalCase do componente ou função que sofreu a falha.'),

  auditorPersona: AuditorPersonaSchema
    .describe('A persona de IA que realizou a análise (ex: SECURITY_SENTINEL).'),

  diagnosis: NeuralDiagnosisResultSchema,

  confidenceScore: z.number().min(0).max(1)
    .describe('Nível de certeza estatística da IA sobre o diagnóstico (0.0 a 1.0).'),

  reconciliationDirective: z.string().min(10)
    .describe('Instrução técnica em prosa para o braço de Self-Healing.'),

  requiresHumanOverseer: z.boolean()
    .default(false)
    .describe('Bloqueia a autocura se a criticidade exigir supervisão de um Engenheiro.'),

  latencyInMilliseconds: z.number().nonnegative()
    .describe('Tempo total de processamento da inferência neural.'),

  forensicTraceId: z.uuid()
    .describe('Link de correlação para o rastro original que disparou a auditoria.')
}).loose();

/**
 * @name SystemAuditVerdictSchema
 * @description O contrato SELADO e IMUTÁVEL para despacho institucional.
 */
export const SystemAuditVerdictSchema = SystemAuditVerdictBaseSchema.readonly();

export type ISystemAuditVerdict = z.infer<typeof SystemAuditVerdictSchema>;