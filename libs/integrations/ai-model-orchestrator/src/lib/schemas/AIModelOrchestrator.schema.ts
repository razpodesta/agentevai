/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AIModelOrchestratorSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - Neural Diplomacy
 * @description ADN para tarefas de diagnóstico sistêmico via IA.
 */

import { z } from 'zod';

export const AIProviderSchema = z.enum([
  'GOOGLE_GEMINI', 
  'ANTHROPIC_CLAUDE', 
  'OPENAI_GPT'
]).describe('Provedores homologados para manutenção sistêmica.');

/**
 * @name HealthTaskBaseSchema
 * @description Estrutura fundamental para processamento cognitivo de falhas.
 */
export const HealthTaskBaseSchema = z.object({
  taskIdentifier: z.uuid()
    .describe('Identificador único da tarefa de diagnóstico.'),

  providerPreference: AIProviderSchema.default('GOOGLE_GEMINI'),

  modelTier: z.string()
    .default('gemini-2.0-flash-thinking')
    .describe('Especificação do modelo (ex: sonnet-3.5, gpt-4o).'),
  
  contextPayload: z.object({
    errorMessage: z.string().min(1),
    stackTrace: z.string().default('NO_STACK_PROVIDED'),
    apparatusCode: z.string().min(3),
    inputSnapshot: z.unknown().describe('Snapshot anonimizado da falha.'),
  }).loose(),

  maintenanceDirective: z.string()
    .min(50)
    .describe('Instrução técnica (Prompt) para guiar a IA na resolução.'),

  correlationIdentifier: z.uuid()
    .describe('Rastro forense para correlação com o SovereignLogger.')
}).loose();

/**
 * @name HealthTaskSchema
 * @description O contrato SELADO para trânsito entre orquestrador e drivers.
 */
export const HealthTaskSchema = HealthTaskBaseSchema.readonly();

export type IHealthTask = z.infer<typeof HealthTaskSchema>;