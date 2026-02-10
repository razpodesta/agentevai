/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinel
 * @version 4.0.0
 * @protocol OEDP-V6.0 - Sovereign Defense
 * @description Orquestrador de segurança de borda.
 * Erradicada radiação técnica de variáveis órfãs e mensagens hardcoded.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignDataVault } from '@agentevai/sovereign-data-vault';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { NeuralBotAnalyzer } from './NeuralBotAnalyzer.js';
import { UserAgentFingerprintSchema } from '../schemas/ExecuteBotSentinel.schema.js';

/**
 * @name ExecuteBotSentinel
 * @function
 * @description Inspeciona a requisição e sela o rastro técnico contra ameaças.
 *
 * @param {Request} incomingRequest - A petição bruta de borda.
 * @param {ISovereignDictionary} dictionary - Silo linguístico regionalizado.
 * @returns {boolean} True se a ameaça exigir bloqueio imediato.
 */
export const ExecuteBotSentinel = (
  incomingRequest: Request,
  dictionary: ISovereignDictionary
): boolean => {
  const apparatusName = 'ExecuteBotSentinel';
  const correlationIdentifier = incomingRequest.headers.get('x-agv-correlation-id') || crypto.randomUUID();

  // Pilar 5: Soberania Linguística
  const t = (key: string, vars = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, vars, correlationIdentifier
  );

  try {
    const userAgentRaw = incomingRequest.headers.get('user-agent') || 'UNDEFINED_AGENT';

    // 1. Geração de Identidade Criptográfica (Vault Bridge)
    const rawFingerprint = SovereignDataVault.anonymize(userAgentRaw, correlationIdentifier);
    const validatedFingerprint = UserAgentFingerprintSchema.parse(rawFingerprint);

    // 2. Análise Behaviorista (Neural Actuator)
    const verdict = NeuralBotAnalyzer(userAgentRaw, validatedFingerprint, correlationIdentifier);

    // 3. Telemetria Forense Sincronizada
    SovereignLogger({
      severity: verdict.isSuspicious ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'EDGE_INSPECTION_COMPLETE',
      message: t('logInspectionComplete', {
        category: verdict.threatCategory,
        score: verdict.botReputationScore
      }),
      correlationIdentifier,
      metadata: {
        fingerprint: verdict.userAgentFingerprint,
        category: verdict.threatCategory
      }
    });

    return verdict.isSuspicious;

  } catch (caughtError) {
    // 4. CURA FORENSE: Transmuta e Reporta a Falha antes do bloqueio fail-safe
    const diagnostic = SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-4001'),
      apparatus: apparatusName,
      location: 'libs/orchestration/security-auditor/src/lib/handlers/ExecuteBotSentinel.ts',
      correlationIdentifier,
      severity: 'CRITICAL'
    });

    SovereignLogger({
      severity: 'CRITICAL',
      apparatus: apparatusName,
      operation: 'SECURITY_ADUANA_COLLAPSE',
      message: t('logSecurityFailure'),
      correlationIdentifier,
      metadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
    });

    return true; // Bloqueio preventivo (Default Deny)
  }
};
