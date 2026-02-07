/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignErrorSchema
 * @version 2.1.0
 * @description Contrato mestre imutável para telemetria de falhas sistêmicas.
 * Centraliza a taxonomia de erros e provê o ADN necessário para a autocura da IA.
 * @protocol OEDP-V5.5 - Standard MetaShark
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 * Blindagem de tipos primitivos para evitar confusão entre identificadores técnicos.
 */
export const SovereignErrorCodeSchema = z.string()
  .regex(/^OS-[A-Z]+-\d{4}$/)
  .describe('Código taxonômico obrigatório: OS-[CAMADA]-[SEQUENCIAL]. Ex: OS-CORE-0001.')
  .brand<'SovereignErrorCode'>();

export type SovereignErrorCode = z.infer<typeof SovereignErrorCodeSchema>;

/**
 * @name SovereignErrorSchema
 * @description Definição estrutural de uma falha soberana.
 * Projetado para ser serializável e compatível com OpenTelemetry.
 */
export const SovereignErrorSchema = z.object({
  /** Identificador técnico único do erro para catalogação no manual de crise. */
  uniqueErrorCode: SovereignErrorCodeSchema,

  /** Chave semântica que aponta para o silo i18n correspondente. */
  i18nMappingKey: z.string()
    .min(5)
    .describe('Mapeamento para libs/foundation/sovereign-error-observability/src/lib/i18n/'),

  /** Nível de severidade para priorização de resposta da IA. */
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'FATAL'])
    .describe('FATAL e CRITICAL disparam o protocolo de emergência imediata.'),

  /** Metadados do aparato (Lego) que originou a falha. */
  apparatusMetadata: z.object({
    name: z.string().min(3).describe('Nome PascalCase do componente ou função.'),
    version: z.string().describe('Versão semântica (SemVer) do código emissor.'),
    fileLocation: z.string().describe('Caminho físico no monorepo para auditoria forense.'),
  }),

  /** Instantâneo operacional para reprodução da falha em laboratório. */
  runtimeSnapshot: z.object({
    inputPayload: z.unknown().describe('Snapshot anonimizado dos dados de entrada.'),
    correlationIdentifier: z.string().uuid().describe('UUID de correlação gerado na ignição do contexto.'),
    /**
     * @description Inclusão estratégica de Issues do Zod.
     * Resolve o erro de compilação TS2353.
     */
    validationIssues: z.array(z.unknown()).optional()
      .describe('Lista detalhada de violações de ADN detectadas pelo SafeParse.'),
    memoryUsage: z.number().optional().describe('Estado do heap em MB no momento da falha.'),
  }),

  /** Rastro técnico para engenheiros humanos e IA. */
  forensicTrace: z.object({
    timestamp: z.string().datetime().describe('Marca temporal precisa ISO-8601.'),
    stack: z.string().describe('Stack trace bruto capturado no constructor do erro.'),
  }),

  /** Instrução determinística para guiar o Neural-Auditor. */
  recoverySuggestion: z.string().min(20).optional()
    .describe('Prompt técnico para o motor de autocura tentar o patch automático.'),
}).readonly();

/** Interface imutável para uso em todo o Monorepo. */
export type ISovereignError = z.infer<typeof SovereignErrorSchema>;
