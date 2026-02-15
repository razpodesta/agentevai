/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLoggerSchema
 * @version 5.0.0
 * @protocol OEDP-V6.5 - Zenith Forensic SSOT
 */

import { z } from 'zod';

/** 
 * @name SovereignLogInputSchema 
 * @description ADN de entrada para cada pulso de telemetria.
 */
export const SovereignLogInputSchema = z.object({
  severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL'])
    .describe('Nível de impacto no fluxo vital.'),

  apparatus: z.string().min(3)
    .describe('Nome PascalCase do Lego emissor (ex: SovereignMainHeader).'),

  operation: z.string().min(2)
    .describe('Identificador técnico da ação (ex: DATA_SEALING).'),

  message: z.string().min(1)
    .describe('Conteúdo textual humanizado ou código semântico.'),

  metadata: z.record(z.string(), z.unknown()).optional()
    .describe('Carga útil para perícia detalhada.'),

  latencyInMilliseconds: z.number()
    .nonnegative()
    .optional()
    .describe('Tempo de execução da operação medido pelo aparato.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.'),

}).readonly();

export type ISovereignLogInput = z.infer<typeof SovereignLogInputSchema>;