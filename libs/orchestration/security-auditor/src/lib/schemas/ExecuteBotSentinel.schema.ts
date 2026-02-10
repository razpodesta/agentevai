/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinelSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision Defense
 * @description ADN para inspeção behaviorista e selagem de vereditos de segurança.
 */

import { z } from 'zod';

/** Identificador nominal para o rastro do Agente */
export const UserAgentFingerprintSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Assinatura SHA-256 única gerada pelo SovereignDataVault para o User-Agent.')
  .brand<'UserAgentFingerprint'>();

export type UserAgentFingerprint = z.infer<typeof UserAgentFingerprintSchema>;

/**
 * @name BotDetectionResultSchema
 * @description Veredito selado da análise comportamental para consumo neural.
 */
export const BotDetectionResultSchema = z.object({
  isSuspicious: z.boolean()
    .describe('Sinalizador booleano de ameaça ativa detectada na borda.'),

  botReputationScore: z.number().min(0).max(100)
    .describe('Índice de hostilidade (0 = Cidadão, 100 = Ameaça Imediata).'),

  threatCategory: z.enum(['CLEAN_BROWSER', 'KNOWN_CRAWLER', 'MALICIOUS_AUTOMATION', 'HEADLESS_SNEAK'])
    .describe('Classificação taxonômica do agente para ruteamento de defesa.'),

  userAgentFingerprint: UserAgentFingerprintSchema,

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'BotDetectionResult'>()
.readonly();

export type IBotDetectionResult = z.infer<typeof BotDetectionResultSchema>;
