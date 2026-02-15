/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignErrorSchema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Forensic Integrity SSOT
 * @description ADN mestre imutável para telemetria de falhas. 
 * Sincronizado para injetar automaticamente a genealogia do Cartório Técnico.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded Types) 
 */
export const SovereignErrorCodeSchema = z.string()
  .regex(/^OS-[A-Z]+-\d{4}$/)
  .describe('Código taxonômico obrigatório: OS-[CAMADA]-[SEQUENCIAL].')
  .brand<'SovereignErrorCode'>();

export type SovereignErrorCode = z.infer<typeof SovereignErrorCodeSchema>;

/** 
 * @name SovereignErrorBaseSchema 
 */
export const SovereignErrorBaseSchema = z.object({
  uniqueErrorCode: SovereignErrorCodeSchema,

  i18nMappingKey: z.string()
    .min(5)
    .describe('Chave semântica para os silos de tradução regionalizados.'),

  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'FATAL'])
    .describe('Nível de urgência para processamento pelo Sistema Imunológico.'),

  apparatusMetadata: z.object({
    name: z.string().min(3).describe('Nome PascalCase do aparato emissor.'),
    version: z.string().describe('Versão semântica extraída do Cartório Técnico.'),
    fileLocation: z.string().describe('Caminho físico exaustivo para perícia.'),
    fingerprint: z.string().describe('Rastro de versão inalterável (Name-V.V.V).')
  }).readonly(),

  runtimeSnapshot: z.object({
    inputPayload: z.unknown().describe('Estado anonimizado dos dados de entrada no colapso.'),
    correlationIdentifier: z.uuid().describe('Identificador inalterável da jornada forense.'),
    validationIssues: z.array(z.unknown()).optional(),
    memoryUsageInMegabytes: z.number().optional()
  }).readonly(),

  forensicTrace: z.object({
    timestamp: z.string().datetime().describe('Marca temporal precisa ISO-8601.'),
    stackTrace: z.string().describe('Pilha de execução bruta para análise neural.'),
  }).readonly(),

  recoverySuggestion: z.string().min(10).optional()
    .describe('Instrução direta para guiar a autocura da IA.'),
});

export const SovereignErrorSchema = SovereignErrorBaseSchema.readonly();
export type ISovereignError = z.infer<typeof SovereignErrorSchema>;