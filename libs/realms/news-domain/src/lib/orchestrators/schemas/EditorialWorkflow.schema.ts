/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowSchema
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - High Precision & Cognitive Metadata
 * @description Única Fonte de Verdade (SSOT) para o ciclo de vida da notícia.
 * Define o ADN de classificação, estados taxonômicos e ações de transmutação.
 */

import { z } from 'zod';

/**
 * @section Dimensão de Classificação
 * Define os domínios temáticos para ruteamento editorial.
 */
export const NewsClassificationSchema = z.enum([
  'INFRASTRUCTURE',
  'PUBLIC_HEALTH',
  'SECURITY',
  'EDUCATION',
  'ECONOMY',
  'ENVIRONMENT'
]).describe('Domínios temáticos que orientam o clustering semântico e a relevância regional.')
  .brand<'NewsClassification'>();

export type NewsClassification = z.infer<typeof NewsClassificationSchema>;

/**
 * @section Dimensão de Estado (Soberania Editorial)
 * Define o estágio inalterável da notícia no rastro de auditoria.
 */
export const EditorialStateSchema = z.enum([
  'DRAFT',              // Fase de composição bruta
  'AI_ANALYSIS',        // Perícia neural ativa (Forensic Phase)
  'MANUAL_REVIEW',      // Escala para Engenheiro de Soberania
  'REJECTED',           // Violação de veracidade ou ADN detectada
  'BLOCKCHAIN_SEALED',  // Imutabilidade matemática garantida
  'PUBLISHED',          // Disponível no enxame público
  'DELETED'             // Rastro removido (Soft Delete)
]).describe('O estágio taxonômico da notícia no rastro de soberania e confiança.')
  .brand<'EditorialState'>();

export type EditorialState = z.infer<typeof EditorialStateSchema>;

/**
 * @section Dimensão de Ação (Gatilhos Cinéticos)
 * Ações autorizadas que provocam a transmutação de estado.
 */
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
]).describe('Comandos autorizados que alteram a realidade editorial de um rastro.')
  .brand<'WorkflowAction'>();

export type WorkflowAction = z.infer<typeof WorkflowActionSchema>;

/**
 * @name EditorialWorkflowInputBaseSchema
 * @description ADN fundamental para cálculo de transição.
 * Erradicada a radiação de 'preprocess' em favor de validação nominal direta.
 */
export const EditorialWorkflowInputBaseSchema = z.object({
  currentState: EditorialStateSchema
    .describe('O estado atual do artigo extraído do cofre relacional.'),

  requestedAction: WorkflowActionSchema
    .describe('O gatilho de transmutação solicitado pelo agente (Humano ou IA).'),

  /** Sincronia Zod v4: Uso do construtor de elite para UUID */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para correlação de logs.')
}).loose();

/**
 * @name EditorialWorkflowInputSchema
 * @description Contrato SELADO para consumo exclusivo pelo EditorialWorkflowEngine.
 */
export const EditorialWorkflowInputSchema = EditorialWorkflowInputBaseSchema
  .brand<'EditorialWorkflowInput'>()
  .readonly();

export type IEditorialWorkflowInput = z.infer<typeof EditorialWorkflowInputSchema>;