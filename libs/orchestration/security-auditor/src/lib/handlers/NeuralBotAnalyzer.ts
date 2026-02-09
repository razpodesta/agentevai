/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NeuralBotAnalyzer
 * @description Motor de decisão que calcula o peso de hostilidade de um agente.
 */

import { BotDetectionResultSchema, IBotDetectionResult, UserAgentFingerprint } from '../schemas/ExecuteBotSentinel.schema.js';

/** @section Malha de Ameaças Conhecidas */
const HOSTILE_PATTERNS = [/python-requests/i, /node-fetch/i, /puppeteer/i, /selenium/i, /curl/i];
const CRAWLER_PATTERNS = [/googlebot/i, /bingbot/i, /slurp/i];

export const NeuralBotAnalyzer = (
  userAgent: string,
  fingerprint: UserAgentFingerprint,
  correlationIdentifier: string
): IBotDetectionResult => {
  let score = 0;
  let category: IBotDetectionResult['threatCategory'] = 'CLEAN_BROWSER';

  // 1. Verificação de Automação Maliciosa
  if (HOSTILE_PATTERNS.some(pattern => pattern.test(userAgent))) {
    score = 90;
    category = 'MALICIOUS_AUTOMATION';
  }
  // 2. Verificação de Rastreadores Legítimos (Peso menor)
  else if (CRAWLER_PATTERNS.some(pattern => pattern.test(userAgent))) {
    score = 30;
    category = 'KNOWN_CRAWLER';
  }
  // 3. Verificação de Ambiente Headless (Exemplo de Heurística)
  else if (userAgent.includes('Headless')) {
    score = 75;
    category = 'HEADLESS_SNEAK';
  }

  return BotDetectionResultSchema.parse({
    isSuspicious: score >= 50,
    botReputationScore: score,
    threatCategory: category,
    userAgentFingerprint: fingerprint,
    correlationIdentifier
  });
};
