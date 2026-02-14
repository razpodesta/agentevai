/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinel
 * @version 6.5.4
 * @protocol OEDP-V6.5 - Sovereign Defense Zenith
 * @description Orquestrador de segurança de borda.
 * CURADO: Erradicado TS2554 (Vault Argument Mismatch) e radiação técnica.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import { SovereignDataVault } from '@agentevai/sovereign-data-vault';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Handlers */
import { NeuralBotAnalyzer } from './NeuralBotAnalyzer.js';
import { UserAgentFingerprintSchema } from '../schemas/ExecuteBotSentinel.schema.js';

/**
 * @name ExecuteBotSentinel
 * @function
 * @description Inspeciona a petição de rede e sela o veredito behaviorista no Edge.
 *
 * @param {Request} incomingRequest - A petição bruta capturada no SovereignMiddleware.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria de segurança.
 * @returns {boolean} TRUE se a ameaça exigir interrupção imediata do fluxo (Default Deny).
 */
export const ExecuteBotSentinel = (
  incomingRequest: Request,
  dictionary: ISovereignDictionary
): boolean => {
  const apparatusName = 'ExecuteBotSentinel';
  const fileLocation = 'libs/orchestration/security-auditor/src/lib/handlers/ExecuteBotSentinel.ts';
  const startTimestamp = performance.now();

  /** @section Rastro_Zenith */
  const correlationIdentifier = incomingRequest.headers.get('x-agv-correlation-id') || crypto.randomUUID();

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    const userAgentRawText = incomingRequest.headers.get('user-agent') || 'UNDEFINED_AGENT';

    // 1. GERAÇÃO DE IDENTIDADE CRIPTOGRÁFICA (CURA TS2554)
    // Agora passamos o dictionary exigido pela nova assinatura do Vault.
    const rawFingerprint = SovereignDataVault.anonymize(
      userAgentRawText,
      correlationIdentifier,
      dictionary
    );
    const validatedFingerprint = UserAgentFingerprintSchema.parse(rawFingerprint);

    // 2. ANÁLISE BEHAVIORISTA (Neural Actuator)
    const verdict = NeuralBotAnalyzer(userAgentRawText, validatedFingerprint, correlationIdentifier);

    // 3. TELEMETRIA SINCRO E PERFORMANCE
    const endTimestamp = performance.now();
    const inspectionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    SovereignLogger({
      severity: verdict.isSuspicious ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'EDGE_INSPECTION_COMPLETE',
      message: translate('logInspectionComplete', {
        category: verdict.threatCategory,
        score: verdict.botReputationScore
      }),
      correlationIdentifier,
      metadata: {
        latencyMs: inspectionLatency,
        fingerprint: verdict.userAgentFingerprint,
        category: verdict.threatCategory
      }
    });

    // Pilar IV: ready for production - Se for bot suspeito, registra a mineração
    if (!verdict.isSuspicious) {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'AGENT_TRACE_MINED',
        message: translate('logAgentMined', { fingerprint: verdict.userAgentFingerprint }),
        correlationIdentifier
      });
    }

    return verdict.isSuspicious;

  } catch (caughtError) {
    // 4. PROTOCOLO DE COLAPSO (Resiliência Forense)
    const diagnostic = SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-4001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'CRITICAL'
    });

    SovereignLogger({
      severity: 'CRITICAL',
      apparatus: apparatusName,
      operation: 'SECURITY_ADUANA_COLLAPSE',
      message: translate('logSecurityFailure'),
      correlationIdentifier,
      metadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
    });

    return true; // Bloqueio preventivo (Soberania de Borda)
  }
};
