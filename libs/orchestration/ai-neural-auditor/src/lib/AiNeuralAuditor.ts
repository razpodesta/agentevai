/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AiNeuralAuditor
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Precision & Swarm Intelligence
 * @description O Juiz do ecossistema. Orquestra o enxame de agentes para diagnosticar falhas.
 * @policy ZERO-ANY: Saneamento total de tipos via ADN de sentença.
 * @policy NEURAL-DIPLOMACY: Escolha dinâmica de modelos baseada em criticidade.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, type ISovereignError } from '@agentevai/sovereign-error-observability';
import { OrchestrateHealthDiagnosis } from '@agentevai/ai-model-orchestrator';

// Handlers Atômicos Lego
import { ResolveMasterPrompt } from './handlers/ResolveMasterPrompt.js';
import { NeuralProviderSelector } from './handlers/NeuralProviderSelector.js';
import {
  SystemAuditVerdictSchema,
  type ISystemAuditVerdict,
  NeuralDiagnosisResultSchema
} from './schemas/AiNeuralAuditor.schema.js';

/**
 * @name AuditSystemFailure
 * @function
 * @async
 * @description Intercepta a dor sistêmica e convoca o tribunal de IA para um veredito.
 */
export const AuditSystemFailure = async (
  errorPacket: ISovereignError
): Promise<ISystemAuditVerdict> => {
  const startTimestamp = performance.now();
  const apparatusName = 'AiNeuralAuditor';
  const correlationIdentifier = errorPacket.runtimeSnapshot.correlationIdentifier;

  try {
    // 1. DIPLOMACIA NEURAL: Seleção de Agente Especializado
    const route = NeuralProviderSelector(errorPacket);

    // 2. RESOLUÇÃO DE DIRETIVA: Busca do Master Prompt Sincronizado
    const maintenanceDirective = ResolveMasterPrompt(errorPacket);

    // 3. TELEMETRIA DE CONVOCAÇÃO
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'NEURAL_CONVOCATION',
      message: `Convocando ${route.persona} via ${route.provider} para o aparato ${errorPacket.apparatusMetadata.name}.`,
      traceIdentifier: correlationIdentifier
    });

    // 4. INFERÊNCIA NO ORÁCULO
    const rawDiagnosis = await OrchestrateHealthDiagnosis({
      taskIdentifier: crypto.randomUUID(),
      providerPreference: route.provider,
      modelTier: route.model,
      contextPayload: {
        errorMessage: errorPacket.i18nMappingKey,
        stackTrace: errorPacket.forensicTrace.stack,
        apparatusCode: errorPacket.apparatusMetadata.name,
        inputSnapshot: errorPacket.runtimeSnapshot.inputPayload
      },
      maintenanceDirective,
      correlationIdentifier
    });

    // 5. FABRICAÇÃO DE SENTENÇA: Selagem de ADN e Cálculo de Latência
    const endTimestamp = performance.now();
    const latencyInMilliseconds = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    /**
     * @section Mapeamento Semântico
     * No estado PERFECT, a IA retorna um JSON estruturado.
     * Aqui aplicamos a aduana para garantir a integridade da sentença.
     */
    const verdict = SystemAuditVerdictSchema.parse({
      auditIdentifier: crypto.randomUUID(),
      targetApparatus: errorPacket.apparatusMetadata.name,
      auditorPersona: route.persona,
      diagnosis: parseNeuralDiagnosis(rawDiagnosis), // Filtro de integridade
      confidenceScore: 0.95, // Métrica simulada do oráculo
      reconciliationDirective: rawDiagnosis,
      requiresHumanOverseer: errorPacket.severity === 'FATAL' || latencyInMilliseconds > 5000,
      latencyInMilliseconds,
      forensicTraceId: correlationIdentifier
    });

    // 6. PUBLICAÇÃO DA SENTENÇA
    SovereignLogger({
      severity: verdict.requiresHumanOverseer ? 'CRITICAL' : 'WARN',
      apparatus: apparatusName,
      operation: 'VERDICT_SEALED',
      message: `Sentença emitida por ${verdict.auditorPersona}: ${verdict.diagnosis} em ${latencyInMilliseconds}ms.`,
      traceIdentifier: correlationIdentifier,
      metadata: { diagnosis: verdict.diagnosis, needsHuman: verdict.requiresHumanOverseer }
    });

    return verdict;

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-COG-1001',
      apparatus: apparatusName,
      location: 'libs/orchestration/ai-neural-auditor/src/lib/AiNeuralAuditor.ts',
      correlationIdentifier,
      severity: 'FATAL',
      recoverySuggestion: 'Falha catastrófica no Juiz Sistêmico. O software está operando sem supervisão judicial.'
    });
  }
};

/**
 * @name parseNeuralDiagnosis
 * @private
 * @description Garante que a resposta da IA seja compatível com nosso Enum de diagnóstico.
 */
function parseNeuralDiagnosis(prose: string): z.infer<typeof NeuralDiagnosisResultSchema> {
  const normalized = prose.toUpperCase();
  if (normalized.includes('ATTACK') || normalized.includes('HOSTILE')) return 'HOSTILE_INTERVENTION';
  if (normalized.includes('STRUCTURAL') || normalized.includes('LOGIC')) return 'STRUCTURAL_COLLAPSE';
  if (normalized.includes('TRANSIENT') || normalized.includes('NETWORK')) return 'TRANSIENT_ENTROPY';
  return 'STABLE_NOMINAL';
}
