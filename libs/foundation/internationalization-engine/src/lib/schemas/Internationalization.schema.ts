/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InternationalizationSchema
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Zenith Master DNA
 * @description Define o ADN imutável de dicionários soberanos.
 * CURADO: Sincronização total de chaves semânticas (semanticContent) e selagem nominal.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  type SovereignLocale
} from '@agentevai/types-common';

/** 
 * @section Dimensões Nominais (Branded Types) 
 * Garante que hashes de integridade não sejam manipulados como strings comuns.
 */
export const IntegrityHashSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Hash SHA-256 inalterável que sela a integridade do dicionário.')
  .brand<'IntegrityHash'>();

export type IntegrityHash = z.infer<typeof IntegrityHashSchema>;

/**
 * @name SemanticAuraSchema
 * @description Metadados que orientam a IA sobre o peso emocional e o propósito da mensagem.
 */
const SemanticAuraSchema = z.object({
  severity: z.enum(['NEUTRAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
    .default('NEUTRAL')
    .describe('Nível de urgência da mensagem para tratamento visual e auditivo.'),

  vocalizeActionTrigger: z.boolean()
    .default(false)
    .describe('Gatilho para motores de síntese de voz regionalizada (Acessibilidade).'),

  contextualInstructionHint: z.string()
    .optional()
    .describe('Diretriz explícita para a IA de Autocura entender a aplicação desta string.'),
}).readonly();

/**
 * @name TranslationFragmentSchema
 * @description Unidade atômica de tradução com suporte a interpolação e rastro de versão.
 */
export const TranslationFragmentSchema = z.record(
  z.string().min(2).describe('Chave semântica exaustiva em camelCase.'),
  z.object({
    /** @section ZENITH_SYNC: 'value' foi depreciado em favor de 'semanticContent' */
    semanticContent: z.string()
      .min(1)
      .describe('O conteúdo textual com suporte a placeholders no formato {variable}.'),

    semanticVersion: z.string()
      .default('1.0.0')
      .describe('Versão do rastro semântico para controle de revisão linguística.'),

    aura: SemanticAuraSchema.optional(),
  })
).describe('Fragmento de dicionário pertencente a um aparato (Lego) específico.');

/**
 * @name SovereignDictionarySchema
 * @description O Dicionário Consolidado Final (SSOT) pronto para despacho em Vercel/Render.
 */
export const SovereignDictionarySchema = z.object({
  metadata: z.object({
    activeLocale: SovereignLocaleSchema
      .describe('Identidade cultural ativa validada pelo TransmuteGeopoliticalIdentifier.'),
    
    bundleVersion: z.string()
      .describe('Versão global do pacote de idiomas.'),
    
    generatedAt: z.string()
      .datetime()
      .describe('Marca temporal da selagem industrial do dicionário.'),
    
    integrityHash: IntegrityHashSchema,
  }),
  content: z.record(
    z.string().min(3).describe('Nome PascalCase do Aparato emissor do rastro.'),
    TranslationFragmentSchema
  ),
}).readonly();

export type ISovereignDictionary = z.infer<typeof SovereignDictionarySchema>;
export type ISovereignLocale = SovereignLocale;