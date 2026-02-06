/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus OrchestrateHealthDiagnosis
 * @description Orquestrador agnóstico que despacha tarefas de saúde para provedores de IA.
 * Rota Relativa: libs/integrations/ai-model-orchestrator/src/lib/OrchestrateHealthDiagnosis.ts
 */

import { HealthTaskSchema, IHealthTask } from './schemas/AIModelOrchestrator.schema';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { GoogleGeminiHealthDriver } from './providers/google-gemini/GoogleGeminiHealthDriver';

/**
 * @name OrchestrateHealthDiagnosis
 * @function
 * @description Age como um Gateway Neural exclusivo para logs de erro e saúde.
 */
export const OrchestrateHealthDiagnosis = async (
  task: IHealthTask
): Promise<string> => {
  const apparatusName = 'AIModelOrchestrator';

  // 1. Validação da Tarefa (Aduana Zod)
  const validatedTask = HealthTaskSchema.parse(task);

  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'DISPATCH_TASK',
    message: `Despachando diagnóstico ${validatedTask.taskIdentifier} para ${validatedTask.providerPreference}`,
  });

  // 2. Triagem de Provedor (Agnosticismo)
  switch (validatedTask.providerPreference) {
    case 'GOOGLE_GEMINI':
      return await GoogleGeminiHealthDriver(validatedTask);
    
    default:
      throw new Error(`[${apparatusName}]: Provedor não suportado para tarefas de saúde.`);
  }
};