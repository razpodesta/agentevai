/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus InternationalizationSchema
 * @version 2.2.0
 * @description Define o ADN imutável de dicionários soberanos.
 * Integra metadados de diagnóstico para suporte ao AI-Neural-Auditor.
 * @protocol OEDP-V5.5
 */

import { z } from 'zod';

/**
 * @section Tipos Branded (Identidade Cultural)
 */
export const LocaleSchema = z.enum(['pt-BR', 'es-ES', 'en-US'])
  .describe('Identificador soberano de localização e cultura.')
  .brand<'Locale'>();

export type Locale = z.infer<typeof LocaleSchema>;

/**
 * @name DiagnosticMetadataSchema
 * @description Metadados que ajudam a IA a entender o "tom" e a "gravidade" da mensagem.
 */
const DiagnosticMetadataSchema = z.object({
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  vocalize: z.boolean().default(false).describe('Gatilho para leitura em voz alta via Manus.'),
  aiInstruction: z.string().optional().describe('Dica contextual para a IA de Autocura.'),
});

/**
 * @name TranslationFragmentSchema
 * @description ADN de um fragmento linguístico com suporte a interpolação rica.
 */
export const TranslationFragmentSchema = z.record(
  z.string().min(2),
  z.object({
    value: z.string().min(1).describe('O texto traduzido com placeholders {var}.'),
    diagnostic: DiagnosticMetadataSchema.optional(),
  })
).describe('Fragmento isolado de dicionário com inteligência diagnóstica.');

/**
 * @name SovereignDictionarySchema
 * @description O Dicionário Consolidado Final (SSOT).
 */
export const SovereignDictionarySchema = z.object({
  metadata: z.object({
    locale: LocaleSchema,
    version: z.string(),
    generatedAt: z.string().datetime(),
    integrityHash: z.string().describe('Hash SHA-256 para validar a pureza do dicionário.'),
  }),
  content: z.record(z.string().min(3), TranslationFragmentSchema),
}).readonly();

export type ISovereignDictionary = z.infer<typeof SovereignDictionarySchema>;
