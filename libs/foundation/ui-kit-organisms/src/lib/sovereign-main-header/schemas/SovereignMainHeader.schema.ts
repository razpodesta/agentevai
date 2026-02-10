/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignMainHeaderSchema
 * @version 8.0.0
 * @protocol OEDP-V6.0 - Forensic Precision & Zod Sovereignty
 * @description ADN mestre estabilizado. Erradica erros de API Zod (TS2339/TS2554)
 * utilizando assinaturas customizadas para funções de callback.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy TYPE-SOVEREIGNTY: Uso de z.custom para garantir conformidade NodeNext.
 */

import { z } from 'zod';

/**
 * @name SovereignMainHeaderInputSchema
 * @description Aduana de entrada estrita para o orquestrador de navegação.
 */
export const SovereignMainHeaderInputSchema = z.object({
  /** Silo linguístico regionalizado e validado */
  dictionary: z.record(z.string(), z.record(z.string(), z.string()))
    .describe('Dicionário validado contendo as chaves do organismo.'),

  /** Sincronia de Rastro Forense */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para correlação de logs.'),

  /** Estado da Identidade Visual */
  activeTheme: z.enum(['OBSIDIAN', 'MILK'])
    .default('OBSIDIAN')
    .describe('Fase lumínica ativa no ecossistema (Obsidian/Milk).'),

  /** Nível de Garantia (IAL) conforme NIST 800-63A */
  assuranceLevel: z.enum(['IAL1_UNVERIFIED', 'IAL2_VERIFIED', 'IAL3_SOVEREIGN'])
    .default('IAL1_UNVERIFIED')
    .describe('Nível de fé pública verificado da identidade.'),

  /** Sobrescrita opcional para contextos de ruteamento geográfico */
  regionNameOverride: z.string()
    .min(2)
    .optional()
    .describe('Nome da localidade injetado manualmente para branding.'),

  /**
   * @section Sincronia de Funções (Cura TS2339 / TS2554)
   * Utilizamos z.custom para selar a assinatura funcional sem depender do encadeamento volátil do Zod.
   */
  onThemeToggle: z.custom<(requestedTheme: string) => void>()
    .optional()
    .describe('Gatilho de transmutação lumínica.'),

  onLanguageRequest: z.custom<(requestedAction: string) => void>()
    .optional()
    .describe('Gatilho de transmutação semântica.'),

}).readonly();

export type ISovereignMainHeaderInput = z.infer<typeof SovereignMainHeaderInputSchema>;
