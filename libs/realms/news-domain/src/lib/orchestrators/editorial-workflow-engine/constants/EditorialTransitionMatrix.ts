/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialTransitionMatrix
 * @version 1.0.0
 * @protocol OEDP-V5.5.2 - Deterministic State Machines
 * @description Matriz de Transição Soberana. Define o grafo de estados permitidos 
 * para o ciclo de vida editorial, impedindo regressões de soberania.
 */

import { 
  type EditorialState, 
  type WorkflowAction 
} from '../../schemas/EditorialWorkflow.schema.js';

/**
 * @type IEditorialTransitionMatrix
 * @description Definição estrita da malha de transições autorizadas.
 */
export type IEditorialTransitionMatrix = Readonly<
  Partial<Record<EditorialState, Partial<Record<WorkflowAction, EditorialState>>>>
>;

/**
 * @name EditorialTransitionMatrix
 * @constant
 * @description Mapeamento determinístico: [Estado Atual] -> { [Gatilho]: Próximo Estado }.
 */
export const EditorialTransitionMatrix: IEditorialTransitionMatrix = Object.freeze({
  /** Fase de Criação: Só pode avançar para perícia ou ser removida. */
  DRAFT: {
    SUBMIT_FOR_REVIEW: 'AI_ANALYSIS' as EditorialState,
    SOFT_DELETE: 'DELETED' as EditorialState,
  },

  /** Fase de Perícia Neural: O oráculo decide o próximo salto. */
  AI_ANALYSIS: {
    AI_APPROVE: 'BLOCKCHAIN_SEALED' as EditorialState,
    AI_ESCALATE: 'MANUAL_REVIEW' as EditorialState,
    MANUAL_REJECT: 'REJECTED' as EditorialState,
    SOFT_DELETE: 'DELETED' as EditorialState,
  },

  /** Fase de Revisão Humana: Intervenção do Engenheiro de Soberania. */
  MANUAL_REVIEW: {
    MANUAL_APPROVE: 'BLOCKCHAIN_SEALED' as EditorialState,
    MANUAL_REJECT: 'REJECTED' as EditorialState,
    SOFT_DELETE: 'DELETED' as EditorialState,
  },

  /** Fase de Rejeição: Permite retorno ao rascunho para saneamento. */
  REJECTED: {
    EDIT_CONTENT: 'DRAFT' as EditorialState,
    SOFT_DELETE: 'DELETED' as EditorialState,
  },

  /** Fase de Imutabilidade: Conteúdo selado matematicamente. */
  BLOCKCHAIN_SEALED: {
    TRIGGER_PUBLICATION: 'PUBLISHED' as EditorialState,
    SOFT_DELETE: 'DELETED' as EditorialState,
  },

  /** Fase Pública: Se editada, deve retornar para perícia técnica. */
  PUBLISHED: {
    EDIT_CONTENT: 'AI_ANALYSIS' as EditorialState,
    SOFT_DELETE: 'DELETED' as EditorialState,
  }
});