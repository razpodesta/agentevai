/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinel
 * @version 3.0.0
 * @protocol OEDP-V5.5.1 - Sovereign Defense
 * @description Orquestrador de segurança de borda. Sincroniza detecção e blindagem.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { SovereignDataVault } from '@agentevai/sovereign-data-vault';
import { NeuralBotAnalyzer } from './NeuralBotAnalyzer.js';
import { UserAgentFingerprintSchema } from '../schemas/ExecuteBotSentinel.schema.js';

/**
 * @name ExecuteBotSentinel
 * @function
 * @description Realiza a inspeção da requisição e sela o rastro técnico.
 */
export const ExecuteBotSentinel = (incomingRequest: Request): boolean => {
  const apparatusName = 'ExecuteBotSentinel';
  const correlationIdentifier = incomingRequest.headers.get('x-agv-correlation-id') || crypto.randomUUID();

  try {
    const userAgentRaw = incomingRequest.headers.get('user-agent') || 'UNDEFINED_AGENT';

    // 1. Geração de Identidade Criptográfica (Vault Bridge)
    const rawFingerprint = SovereignDataVault.anonymize(userAgentRaw, correlationIdentifier);
    const validatedFingerprint = UserAgentFingerprintSchema.parse(rawFingerprint);

    // 2. Análise Behaviorista (Neural Actuator)
    const verdict = NeuralBotAnalyzer(userAgentRaw, validatedFingerprint, correlationIdentifier);

    // 3. Telemetria Forense
    SovereignLogger({
      severity: verdict.isSuspicious ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'EDGE_INSPECTION_COMPLETE',
      message: `Inspecção de Agente: ${verdict.threatCategory} [Score: ${verdict.botReputationScore}]`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        fingerprint: verdict.userAgentFingerprint,
        category: verdict.threatCategory
      }
    });

    return verdict.isSuspicious;

  } catch (error) {
    const diagnostic = SovereignError.transmute(error, {
      code: 'OS-SEC-4001',
      apparatus: apparatusName,
      location: 'libs/orchestration/security-auditor/src/lib/handlers/ExecuteBotSentinel.ts',
      correlationIdentifier,
      severity: 'CRITICAL'
    });

    return true; // Bloqueio preventivo em falha de aduana
  }
};
