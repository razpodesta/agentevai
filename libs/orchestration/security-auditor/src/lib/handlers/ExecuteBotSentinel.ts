/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinel
 * @version 5.0.0
 * @protocol OEDP-V6.0 - Sovereign Defense Zenith
 * @description Orquestrador de segurança de borda. 
 * CURA TS2353: Sincronização definitiva do rastro de telemetria.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total via Aduana Zod.
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
 * @description Inspeciona a petição de rede e sela o veredito behaviorista.
 * 
 * @param {Request} incomingRequest - A petição bruta capturada na borda (Middleware).
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria de segurança.
 * @returns {boolean} TRUE se a ameaça exigir interrupção imediata do fluxo.
 */
export const ExecuteBotSentinel = (
  incomingRequest: Request,
  dictionary: ISovereignDictionary
): boolean => {
  const apparatusName = 'ExecuteBotSentinel';
  const fileLocation = 'libs/orchestration/security-auditor/src/lib/handlers/ExecuteBotSentinel.ts';
  
  /** 
   * @section Rastro_Forense 
   * Extração do identificador de correlação injetado no rastro de rede.
   */
  const correlationIdentifier = incomingRequest.headers.get('x-agv-correlation-id') || crypto.randomUUID();

  // Pilar 5: Soberania Linguística (Higiene Militar: sem abreviações)
  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, 
    apparatusName, 
    key, 
    variables, 
    correlationIdentifier
  );

  try {
    const userAgentRawText = incomingRequest.headers.get('user-agent') || 'UNDEFINED_AGENT';

    // 1. GERAÇÃO DE IDENTIDADE CRIPTOGRÁFICA (Vault Bridge)
    const rawFingerprint = SovereignDataVault.anonymize(userAgentRawText, correlationIdentifier);
    const validatedFingerprint = UserAgentFingerprintSchema.parse(rawFingerprint);

    // 2. ANÁLISE BEHAVIORISTA (Neural Actuator)
    const verdict = NeuralBotAnalyzer(userAgentRawText, validatedFingerprint, correlationIdentifier);

    // 3. TELEMETRIA FORENSE SINCRO (Cura TS2353)
    SovereignLogger({
      severity: verdict.isSuspicious ? 'WARN' : 'INFO',
      apparatus: apparatusName,
      operation: 'EDGE_INSPECTION_COMPLETE',
      message: translate('logInspectionComplete', {
        category: verdict.threatCategory,
        score: verdict.botReputationScore
      }),
      correlationIdentifier, // Protocolo V6.0: Unificação de Rastro
      metadata: {
        fingerprint: verdict.userAgentFingerprint,
        category: verdict.threatCategory,
        reputation: verdict.botReputationScore
      }
    });

    return verdict.isSuspicious;

  } catch (caughtError) {
    /** 
     * @section Protocolo_de_Colapso 
     * Em caso de falha na aduana, aplicamos o bloqueio preventivo (Default Deny).
     */
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

    return true; 
  }
};