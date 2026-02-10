/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignErrorSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 * @description ADN mestre imutável para telemetria de falhas. Define a taxonomia
 * para que a IA de Autocura possa diagnosticar a causa raiz sem intervenção humana.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const SovereignErrorCodeSchema = z.string()
  .regex(/^OS-[A-Z]+-\d{4}$/)
  .describe('Código taxonômico obrigatório: OS-[CAMADA]-[SEQUENCIAL].')
  .brand<'SovereignErrorCode'>();

export type SovereignErrorCode = z.infer<typeof SovereignErrorCodeSchema>;

/**
 * @name SovereignErrorBaseSchema
 * @description Estrutura fundamental para a captura de falhas.
 * Aberta para extensões de Reinos antes da selagem final.
 */
export const SovereignErrorBaseSchema = z.object({
  uniqueErrorCode: SovereignErrorCodeSchema,

  i18nMappingKey: z.string()
    .min(5)
    .describe('Chave semântica para os silos de tradução regionais.'),

  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'FATAL'])
    .describe('Nível de impacto para priorização de resposta neural.'),

  apparatusMetadata: z.object({
    name: z.string().min(3).describe('Nome PascalCase do aparato emissor.'),
    version: z.string().describe('Versão semântica (SemVer) do código.'),
    fileLocation: z.string().describe('Caminho físico para perícia forense.'),
  }),

  runtimeSnapshot: z.object({
    inputPayload: z.unknown().describe('Snapshot anonimizado dos dados de entrada.'),

    /** Sincronia Zod v4: Uso de z.uuid() direto no topo */
    correlationIdentifier: z.uuid()
      .describe('Identificador inalterável da jornada operativa.'),

    validationIssues: z.array(z.unknown()).optional()
      .describe('Rastro de violações de ADN detectadas via Zod.'),

    memoryUsageInMegabytes: z.number().optional()
      .describe('Estado do heap no momento da captura.'),
  }),

  forensicTrace: z.object({
    timestamp: z.string().datetime().describe('Marca temporal precisa ISO-8601.'),
    stack: z.string().describe('Stack trace bruto para análise de profundidade.'),
  }),

  recoverySuggestion: z.string().min(10).optional()
    .describe('Diretiva determinística para guiar o motor de Self-Healing.'),
});

/**
 * @name SovereignErrorSchema
 * @description O contrato SELADO e IMUTÁVEL para despacho sistêmico.
 */
export const SovereignErrorSchema = SovereignErrorBaseSchema.readonly();

export type ISovereignError = z.infer<typeof SovereignErrorSchema>;
