/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InternationalizationSchema
 * @version 2.3.1
 * @protocol OEDP-V5.5 - Neural Integrity & Geopolitical Sovereignty
 * @description Define o ADN imutável de dicionários soberanos.
 * Sincronizado com a Bóveda de Contratos para evitar duplicidade de Locale.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  type SovereignLocale
} from '@agentevai/types-common';

/**
 * @section Ponte de Soberania (Manifesto 0018)
 * Re-exportamos os tipos centrais para manter a compatibilidade com o motor de tradução,
 * garantindo que a Fonte Única de Verdade (SSOT) continue sendo a types-common.
 */
export const LocaleSchema = SovereignLocaleSchema;
export type Locale = SovereignLocale;

/**
 * @name SemanticAuraSchema
 * @description Metadados que orientam a IA sobre o peso emocional e o propósito da string.
 */
const SemanticAuraSchema = z.object({
  severity: z.enum(['NEUTRAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
    .default('NEUTRAL')
    .describe('Nível de urgência da mensagem para tratamento visual e auditivo.'),

  vocalize: z.boolean()
    .default(false)
    .describe('Gatilho para motores de Text-to-Speech (Acessibilidade Soberana).'),

  contextualHint: z.string()
    .optional()
    .describe('Instrução explícita para a IA de Autocura entender onde esta string é injetada.'),

  sentimentTarget: z.enum(['POSITIVE', 'NEGATIVE', 'NEUTRAL', 'INSPIRATIONAL'])
    .default('NEUTRAL')
    .describe('Define a polaridade semântica esperada para validação de tom.'),
});

/**
 * @name TranslationFragmentSchema
 * @description Unidade atômica de tradução com suporte a interpolação e rastro de versão.
 */
export const TranslationFragmentSchema = z.record(
  z.string().min(2).describe('Chave semântica (camelCase).'),
  z.object({
    value: z.string()
      .min(1)
      .describe('O conteúdo textual com suporte a placeholders no formato {variable}.'),

    version: z.string()
      .default('1.0.0')
      .describe('Versão semântica da string para controle de revisão linguística.'),

    aura: SemanticAuraSchema.optional(),
  })
).describe('Fragmento de dicionário pertencente a um Aparato (Lego) específico.');

/**
 * @name SovereignDictionarySchema
 * @description O Dicionário Consolidado Final (SSOT).
 */
export const SovereignDictionarySchema = z.object({
  metadata: z.object({
    locale: LocaleSchema,
    version: z.string().describe('Versão global do bundle de idiomas.'),
    generatedAt: z.string().datetime(),
    integrityHash: z.string().min(64).describe('Hash SHA-256 para selagem do dicionário.'),
  }),
  content: z.record(
    z.string().min(3).describe('Nome PascalCase do Aparato emissor.'),
    TranslationFragmentSchema
  ),
}).readonly();

export type ISovereignDictionary = z.infer<typeof SovereignDictionarySchema>;
