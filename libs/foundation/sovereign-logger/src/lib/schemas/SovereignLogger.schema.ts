/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLoggerSchema
 * @description Contrato imutável para telemetria estruturada legível por IA.
 * @version 1.2.0
 */

import { z } from 'zod';

export const SovereignLogSchema = z.object({
  /** Nível de severidade da telemetria */
  severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL'])
    .describe('Nível de impacto do registro no fluxo do sistema'),
  
  /** Identificação do aparato (Lego) emissor */
  apparatus: z.string().min(3)
    .describe('Nome PascalCase do componente ou função atômica'),
  
  /** Operação técnica sendo executada */
  operation: z.string().min(2)
    .describe('Ação específica que está sendo monitorada'),
  
  /** Mensagem humana ou código de erro para auditoria */
  message: z.string().min(1),
  
  /** Metadados granulares para perícia forense */
  metadata: z.record(z.string(), z.unknown()).optional(),
  
  /** Identificador único da jornada (opcional, injetado via Context se ausente) */
  traceIdentifier: z.string().uuid().optional()
    .describe('ID de correlação para rastreio cross-platform'),
}).readonly();

export type ISovereignLog = z.infer<typeof SovereignLogSchema>;