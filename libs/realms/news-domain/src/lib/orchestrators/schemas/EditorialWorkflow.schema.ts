/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Precision & Branded Types
 * @description Única Fonte de Verdade (SSOT) para o ciclo de vida da notícia.
 * Implementa tipagem nominal para erradicar a obsessão por primitivos.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const NewsClassificationSchema = z.enum([
  'INFRASTRUCTURE',
  'PUBLIC_HEALTH',
  'SECURITY',
  'EDUCATION',
  'ECONOMY',
  'ENVIRONMENT'
]).describe('Domínios temáticos para ruteamento editorial e clustering semântico.')
  .brand<'NewsClassification'>();

export type NewsClassification = z.infer<typeof NewsClassificationSchema>;

export const EditorialStateSchema = z.enum([
  'DRAFT',
  'AI_ANALYSIS',
  'MANUAL_REVIEW',
  'REJECTED',
  'BLOCKCHAIN_SEALED',
  'PUBLISHED',
  'DELETED'
]).describe('O estágio taxonômico da notícia no rastro de soberania.')
  .brand<'EditorialState'>();

export type EditorialState = z.infer<typeof EditorialStateSchema>;

export const WorkflowActionSchema = z.enum([
  'SUBMIT_FOR_REVIEW',
  'AI_APPROVE',
  'AI_ESCALATE',
  'MANUAL_APPROVE',
  'MANUAL_REJECT',
  'EDIT_CONTENT',
  'SEAL_VIA_BLOCKCHAIN',
  'TRIGGER_PUBLICATION',
  'SOFT_DELETE'
]).describe('Ações de transmutação autorizadas pelo protocolo editorial.')
  .brand<'WorkflowAction'>();

export type WorkflowAction = z.infer<typeof WorkflowActionSchema>;

/**
 * @name EditorialWorkflowInputBaseSchema
 * @description Estrutura fundamental para cálculo de transição.
 */
export const EditorialWorkflowInputBaseSchema = z.object({
  currentState: z.preprocess((val) => val, EditorialStateSchema),

  requestedAction: z.preprocess((val) => val, WorkflowActionSchema),

  /** Sincronia Zod v4: Uso do construtor de elite para UUID */
  correlationIdentifier: z.uuid()
    .describe('Rastro forense inalterável para correlação com o SovereignLogger.')
}).loose();

/**
 * @name EditorialWorkflowInputSchema
 * @description Contrato SELADO para consumo pelo Engine.
 */
export const EditorialWorkflowInputSchema = EditorialWorkflowInputBaseSchema.readonly();

export type IEditorialWorkflowInput = z.infer<typeof EditorialWorkflowInputSchema>;
