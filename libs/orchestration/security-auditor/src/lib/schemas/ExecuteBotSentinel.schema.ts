/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ExecuteBotSentinelSchema
 * @version 4.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN para inspeção behaviorista de borda. 
 * Implementa técnica de selagem nominal para erradicar falhas de contrato.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais 
 */
export const UserAgentFingerprintSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Assinatura SHA-256 única gerada no cofre para o rastro do agente.')
  .brand<'UserAgentFingerprint'>();

export type UserAgentFingerprint = z.infer<typeof UserAgentFingerprintSchema>;

/**
 * @name BotDetectionResultBaseSchema
 * @description Estrutura fundamental do veredito para auditoria parcial.
 */
export const BotDetectionResultBaseSchema = z.object({
  isSuspicious: z.boolean()
    .describe('Sinalizador booleano de ameaça detectada na aduana.'),

  botReputationScore: z.number().min(0).max(100)
    .describe('Índice de hostilidade (0 = Cidadão, 100 = Ameaça Imediata).'),

  threatCategory: z.enum(['CLEAN_BROWSER', 'KNOWN_CRAWLER', 'MALICIOUS_AUTOMATION', 'HEADLESS_SNEAK'])
    .describe('Classificação taxonômica da ameaça para ruteamento de defesa.'),

  userAgentFingerprint: UserAgentFingerprintSchema,

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
});

/**
 * @name BotDetectionResultSchema
 * @description O contrato SELADO para despacho institucional.
 */
export const BotDetectionResultSchema = BotDetectionResultBaseSchema
  .brand<'BotDetectionResult'>()
  .readonly();

export type IBotDetectionResult = z.infer<typeof BotDetectionResultSchema>;