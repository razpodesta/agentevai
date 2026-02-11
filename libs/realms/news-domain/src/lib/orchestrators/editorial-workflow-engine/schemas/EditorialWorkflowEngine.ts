/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description Única Fonte de Verdade (SSOT) para o ciclo de vida da verdade jornalística.
 * Sincronizado para Zod V4 com descrições densas para o Auditor Neural.
 */

import { z } from 'zod';

/** @section Taxonomia de Estado */
export const EditorialStateSchema = z.enum([
  'DRAFT',              // Composição bruta
  'AI_ANALYSIS',        // Perícia neural ativa
  'MANUAL_REVIEW',      // Intervenção de Engenheiro
  'REJECTED',           // ADN corrompido ou fato refutado
  'BLOCKCHAIN_SEALED',  // Imutabilidade garantida
  'PUBLISHED',          // Enxame público ativo
  'DELETED'             // Rastro removido
])
.describe('O estágio inalterável da notícia no rastro de confiança.')
.brand<'EditorialState'>();

export type EditorialState = z.infer<typeof EditorialStateSchema>;

/** @section Taxonomia de Ação */
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
.describe('Comandos autorizados que provocam a transmutação do rastro editorial.')
.brand<'WorkflowAction'>();

export type WorkflowAction = z.infer<typeof WorkflowActionSchema>;

/** @name EditorialWorkflowInputSchema */
export const EditorialWorkflowInputSchema = z.object({
  currentState: EditorialStateSchema
    .describe('O selo de estado atual extraído do cofre relacional.'),

  requestedAction: WorkflowActionSchema
    .describe('A intenção de transmutação solicitada pelo agente.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para correlação de telemetria.')
})
.brand<'EditorialWorkflowInput'>()
.readonly();

export type IEditorialWorkflowInput = z.infer<typeof EditorialWorkflowInputSchema>;
