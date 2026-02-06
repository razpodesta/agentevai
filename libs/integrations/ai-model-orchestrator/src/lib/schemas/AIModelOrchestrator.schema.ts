/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AIModelOrchestratorSchema
 * @description Define o contrato de envio para diagnóstico por IAs de saúde.
 * Rota Relativa: libs/integrations/ai-model-orchestrator/src/lib/schemas/AIModelOrchestrator.schema.ts
 */

import { z } from 'zod';

export const AIProviderSchema = z.enum(['GOOGLE_GEMINI', 'ANTHROPIC_CLAUDE', 'OPENAI_GPT', 'GROK_XAI']);

export const HealthTaskSchema = z.object({
  taskIdentifier: z.string().uuid(),
  providerPreference: AIProviderSchema.default('GOOGLE_GEMINI'),
  modelTier: z.string().default('gemini-3.0-ultra-high-fidelity'),
  
  /** O banquete de dados vindo do SovereignErrorObservability */
  contextPayload: z.object({
    errorMessage: z.string(),
    stackTrace: z.string(),
    apparatusCode: z.string(),
    inputSnapshot: z.unknown(),
  }),

  /** Prompt de manutenção específico para guiar a correção */
  maintenanceDirective: z.string()
    .min(100)
    .describe('Instrução de engenharia que define como a IA deve analisar a falha'),
}).readonly();

export type IHealthTask = z.infer<typeof HealthTaskSchema>;