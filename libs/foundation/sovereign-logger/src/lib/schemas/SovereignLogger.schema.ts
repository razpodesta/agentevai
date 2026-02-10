/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLoggerSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description ADN imutável para telemetria estruturada.
 * Projetado para ser indexado instantaneamente por motores de busca e IAs.
 */

import { z } from 'zod';

/**
 * @name SovereignLogSchema
 * @description Aduana de ADN para cada pulso de log no sistema.
 */
export const SovereignLogSchema = z.object({
  severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL'])
    .describe('Nível de impacto do evento no fluxo vital do sistema.'),

  apparatus: z.string().min(3)
    .describe('Nome PascalCase do componente ou função atômica emissora.'),

  operation: z.string().min(2)
    .describe('Identificador técnico da ação (ex: DATA_FETCH, AUTH_IGNITION).'),

  message: z.string().min(1)
    .describe('Conteúdo textual humanizado ou código semântico.'),

  metadata: z.record(z.string(), z.unknown()).optional()
    .describe('Carga útil de rastro para perícia detalhada (Zero Any).'),

  /** Sincronia Zod v4: Uso do construtor de elite z.uuid() */
  correlationIdentifier: z.uuid().optional()
    .describe('Identificador inalterável para correlação cross-platform do rastro.'),

}).readonly();

export type ISovereignLog = z.infer<typeof SovereignLogSchema>;
