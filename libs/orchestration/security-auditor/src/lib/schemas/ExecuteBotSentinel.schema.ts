/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinelSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Precision Defense
 * @description ADN para inspeção behaviorista de agentes de rede.
 */

import { z } from 'zod';

/** Identificador nominal para o rastro do Agente */
export const UserAgentFingerprintSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .brand<'UserAgentFingerprint'>();

export type UserAgentFingerprint = z.infer<typeof UserAgentFingerprintSchema>;

/**
 * @name BotDetectionResultSchema
 * @description Veredito selado da análise comportamental.
 */
export const BotDetectionResultSchema = z.object({
  isSuspicious: z.boolean()
    .describe('Sinalizador booleano de ameaça.'),

  botReputationScore: z.number().min(0).max(100)
    .describe('Pontuação de 0 a 100 (Quanto maior, mais hostil o agente).'),

  threatCategory: z.enum(['CLEAN_BROWSER', 'KNOWN_CRAWLER', 'MALICIOUS_AUTOMATION', 'HEADLESS_SNEAK'])
    .describe('Classificação taxonômica do agente detectado.'),

  userAgentFingerprint: UserAgentFingerprintSchema,

  correlationIdentifier: z.uuid()
}).readonly();

export type IBotDetectionResult = z.infer<typeof BotDetectionResultSchema>;
