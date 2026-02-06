/**
 * @author Raz Podestá - MetaShark Tech
 * @version 1.0.0
 * @description Contrato mestre para erros soberanos legíveis por IA.
 * Rota Relativa: libs/orchestration/sovereign-error-observability/src/lib/schemas/SovereignError.schema.ts
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const SovereignErrorCodeSchema = z.string()
  .regex(/^OS-[A-Z]+-\d{4}$/)
  .brand<'SovereignErrorCode'>();

export type SovereignErrorCode = z.infer<typeof SovereignErrorCodeSchema>;

/**
 * @name SovereignErrorSchema
 * @description Define a anatomia inalterável de uma falha sistêmica.
 */
export const SovereignErrorSchema = z.object({
  uniqueErrorCode: SovereignErrorCodeSchema
    .describe('Código taxonômico do erro seguindo o padrão OS-[CAMADA]-[SEQUENCIAL]'),
  
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'FATAL'])
    .describe('Nível de impacto na continuidade do serviço'),

  apparatusMetadata: z.object({
    name: z.string().describe('Nome do aparato (Lego) que originou a falha'),
    version: z.string().describe('Versão do código no momento do colapso'),
    fileLocation: z.string().describe('Caminho físico no monorepo para auditoria da IA'),
  }).describe('Metadados de rastreio do componente'),

  runtimeSnapshot: z.object({
    inputPayload: z.unknown().describe('Snapshot anonimizado dos dados de entrada que causaram o erro'),
    activeTenantId: z.string().uuid().optional().describe('Identificador da região/cidade ativa'),
    systemState: z.record(z.string(), z.unknown()).describe('Estado das variáveis de ambiente e memória no momento'),
  }).describe('Estado do sistema durante o evento'),

  forensicTrace: z.object({
    traceId: z.string().uuid().describe('ID de correlação para busca em logs distribuídos'),
    timestamp: z.string().datetime().describe('Marca temporal precisa ISO-8601'),
    stack: z.string().describe('Rastro técnico da pilha de execução (Stack Trace)'),
  }).describe('Dados de perícia técnica'),

  recoverySuggestion: z.string().optional()
    .describe('Sugestão técnica gerada pelo aparato para guiar o Neural-Auditor'),
}).readonly();

export type ISovereignError = z.infer<typeof SovereignErrorSchema>;