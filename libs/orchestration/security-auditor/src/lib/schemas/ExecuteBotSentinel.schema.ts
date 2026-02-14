/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinel.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para inspeção behaviorista de borda.
 */

import { z } from 'zod';

/**
 * @section Dimensões Nominais (Branded)
 */
export const UserAgentFingerprintSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Assinatura digital única do agente gerada no cofre.')
  .brand<'UserAgentFingerprint'>();

export type UserAgentFingerprint = z.infer<typeof UserAgentFingerprintSchema>;

/**
 * @name BotDetectionResultBaseSchema
 * @description Estrutura fundamental para vereditos de segurança.
 */
export const BotDetectionResultBaseSchema = z.object({
  isSuspicious: z.boolean()
    .describe('Sinalizador booleano de detecção de ameaça.'),

  botReputationScore: z.number().min(0).max(100)
    .describe('Índice de hostilidade (0 = Confiável, 100 = Bloqueio Imediato).'),

  threatCategory: z.enum(['CLEAN_BROWSER', 'KNOWN_CRAWLER', 'MALICIOUS_AUTOMATION', 'HEADLESS_SNEAK'])
    .describe('Classificação taxonômica do rastro de rede.'),

  userAgentFingerprint: UserAgentFingerprintSchema,

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name BotDetectionResultSchema
 * @section Selagem Nominal Zenith
 */
export const BotDetectionResultSchema = BotDetectionResultBaseSchema
  .brand<'BotDetectionResult'>()
  .readonly();

export type IBotDetectionResult = z.infer<typeof BotDetectionResultSchema>;
