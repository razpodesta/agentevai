/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLoggerSchema
 * @version 7.0.0
 * @protocol OEDP-V7.0 - Zenith Forensic SSOT
 * @description Única Fonte de Verdade para telemetria estruturada. 
 * Sincronizado para garantir que o rastro de latência e correlação seja inquebrável.
 */

import { z } from 'zod';

/** 
 * @name SovereignLoggerSchema 
 * @description Aduana de ADN para cada pulso de telemetria emitido no ecossistema.
 */
export const SovereignLoggerSchema = z.object({
  severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL'])
    .describe('Nível de impacto no fluxo vital do organismo digital.'),

  apparatusIdentifier: z.string()
    .min(3)
    .describe('Nome PascalCase do Lego emissor (ex: SovereignMainHeader).'),

  operationCode: z.string()
    .min(2)
    .describe('Identificador técnico da ação (ex: DATA_SEALING).'),

  semanticMessage: z.string()
    .min(1)
    .describe('Conteúdo textual humanizado ou código semântico traduzido.'),

  forensicMetadata: z.record(z.string(), z.unknown())
    .optional()
    .describe('Carga útil de metadados para perícia detalhada (Zero Any).'),

  executionLatencyInMilliseconds: z.number()
    .nonnegative()
    .optional()
    .describe('Tempo de execução da operação medido pelo aparato em milissegundos.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual gerado na borda.'),

})
.brand<'SovereignLogger'>()
.readonly();

/**
 * @interface ISovereignLogger
 * @description Contrato imutável para despacho de telemetria.
 */
export type ISovereignLogger = z.infer<typeof SovereignLoggerSchema>;