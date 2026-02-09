import {
  EditorialState,
  WorkflowAction
} from '../schemas/EditorialWorkflow.schema.js';

/**
 * @name EditorialTransitionMatrix
 * @description Mapeamento determinístico de estados editoriais.
 * Formato: [Estado Atual][Ação] -> Próximo Estado.
 */
export const EditorialTransitionMatrix: Partial<Record<EditorialState, Partial<Record<WorkflowAction, EditorialState>>>> = {
  DRAFT: {
    SUBMIT_FOR_REVIEW: 'AI_ANALYSIS',
    SOFT_DELETE: 'DELETED'
  },
  AI_ANALYSIS: {
    AI_APPROVE: 'BLOCKCHAIN_SEALED',
    AI_ESCALATE: 'MANUAL_REVIEW',
    MANUAL_REJECT: 'REJECTED',
    SOFT_DELETE: 'DELETED'
  },
  MANUAL_REVIEW: {
    MANUAL_APPROVE: 'BLOCKCHAIN_SEALED',
    MANUAL_REJECT: 'REJECTED',
    SOFT_DELETE: 'DELETED'
  },
  REJECTED: {
    EDIT_CONTENT: 'DRAFT',
    SOFT_DELETE: 'DELETED'
  },
  BLOCKCHAIN_SEALED: {
    TRIGGER_PUBLICATION: 'PUBLISHED',
    SOFT_DELETE: 'DELETED'
  },
  PUBLISHED: {
    EDIT_CONTENT: 'MANUAL_REVIEW',
    SOFT_DELETE: 'DELETED'
  }
};
