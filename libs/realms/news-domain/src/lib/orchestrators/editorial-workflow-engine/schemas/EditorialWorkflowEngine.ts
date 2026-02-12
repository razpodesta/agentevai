/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 * @description Única Fonte de Verdade para o ciclo de vida da verdade jornalística.
 */

import { z } from 'zod';

/** 
 * @section Taxonomia de Estado 
 */
export const EditorialStateSchema = z.enum([
  'DRAFT',              // Composição bruta inicial.
  'AI_ANALYSIS',        // Perícia neural ativa para detecção de fakenews.
  'MANUAL_REVIEW',      // Intervenção mandatória de um Engenheiro de Soberania.
  'REJECTED',           // Fato refutado ou ADN corrompido.
  'BLOCKCHAIN_SEALED',  // Imutabilidade matemática garantida.
  'PUBLISHED',          // Conteúdo disponível no enxame público regional.
  'DELETED'             // Rastro removido da malha visível (Soft Delete).
])
.describe('O estágio inalterável da notícia no rastro de confiança.')
.brand<'EditorialState'>();

export type EditorialState = z.infer<typeof EditorialStateSchema>;

/** 
 * @section Taxonomia de Ação 
 */
export const WorkflowActionSchema = z.enum([
  'SUBMIT_FOR_REVIEW',
  'AI_APPROVE',
  'AI_ESCALATE',
  'MANUAL_APPROVE',
  'MANUAL_REJECT',
  'EDIT_CONTENT',
  'TRIGGER_PUBLICATION',
  'SOFT_DELETE'
])
.describe('Gatilhos autorizados que provocam a transmutação do rastro editorial.')
.brand<'WorkflowAction'>();

export type WorkflowAction = z.infer<typeof WorkflowActionSchema>;

/** 
 * @name EditorialWorkflowInputSchema 
 * @description Aduana de entrada estrita para o motor de transição.
 */
export const EditorialWorkflowInputSchema = z.object({
  currentState: EditorialStateSchema
    .describe('O selo de estado atual extraído do cofre relacional.'),
  
  requestedAction: WorkflowActionSchema
    .describe('A intenção de transmutação solicitada pelo agente operativo.'),
  
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para correlação de logs.')
})
.brand<'EditorialWorkflowInput'>()
.readonly();

export type IEditorialWorkflowInput = z.infer<typeof EditorialWorkflowInputSchema>;