/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus OrchestrateHealthDiagnosis
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Performance Integration
 * @description Gateway Neural para diagnóstico de saúde. 
 * Orquestra múltiplos provedores via drivers atômicos selados.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { 
  HealthTaskSchema, 
  type IHealthTask 
} from './schemas/AIModelOrchestrator.schema.js';

// Drivers de Próxima Geração (Devem ser implementados como Legos atômicos)
import { GoogleGeminiHealthDriver } from './providers/google-gemini/GoogleGeminiHealthDriver.js';

/**
 * @section Registro de Drivers (Neural Registry)
 * Mapeamento O(1) para resolução de provedores. Facilita a expansão para Claude/GPT.
 */
const NEURAL_DRIVER_REGISTRY: Record<string, (task: IHealthTask) => Promise<string>> = {
  GOOGLE_GEMINI: GoogleGeminiHealthDriver,
  // ANTHROPIC_CLAUDE: AnthropicClaudeHealthDriver, // Pronto para conexão
  // OPENAI_GPT: OpenAiGptHealthDriver,
};

/**
 * @name OrchestrateHealthDiagnosis
 * @function
 * @async
 * @description Despacha a falha sistêmica para o cluster de inteligência configurado.
 */
export const OrchestrateHealthDiagnosis = async (
  rawTask: unknown
): Promise<string> => {
  const apparatusName = 'AIModelOrchestrator';
  const fileLocation = 'libs/integrations/ai-model-orchestrator/src/lib/OrchestrateHealthDiagnosis.ts';

  try {
    // 1. Aduana de ADN (Ingresso Seguro)
    const task = HealthTaskSchema.parse(rawTask);

    // 2. Telemetria de Ignição Neural
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'NEURAL_DISPATCH',
      message: `Solicitando diagnóstico ao provedor ${task.providerPreference} [Tier: ${task.modelTier}]`,
      traceIdentifier: task.correlationIdentifier
    });

    // 3. Resolução Dinâmica de Driver
    const driver = NEURAL_DRIVER_REGISTRY[task.providerPreference];

    if (!driver) {
      throw new Error(`UNSUPPORTED_NEURAL_PROVIDER: ${task.providerPreference}`);
    }

    // 4. Execução e Captura de Resposta
    const diagnosisResponse = await driver(task);

    // 5. Telemetria de Conclusão
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'NEURAL_SUCCESS',
      message: `Diagnóstico concluído para o aparato ${task.contextPayload.apparatusCode}.`,
      traceIdentifier: task.correlationIdentifier
    });

    return diagnosisResponse;

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-INT-7001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: (rawTask as IHealthTask)?.correlationIdentifier || 'NO_TRACE',
      severity: 'CRITICAL',
      recoverySuggestion: 'Verificar conexão com APIs de IA ou integridade do rastro de contexto.'
    });
  }
};