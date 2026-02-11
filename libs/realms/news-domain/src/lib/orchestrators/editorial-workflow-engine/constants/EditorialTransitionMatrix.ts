/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialTransitionMatrix
 * @protocol OEDP-V6.0 - Deterministic State Machine
 */

export type IEditorialTransitionMatrix = Readonly<
  Partial<Record<string, Partial<Record<string, string>>>>
>;

export const EditorialTransitionMatrix: IEditorialTransitionMatrix = Object.freeze({
  DRAFT: {
    SUBMIT_FOR_REVIEW: 'AI_ANALYSIS',
    SOFT_DELETE: 'DELETED',
  },
  AI_ANALYSIS: {
    AI_APPROVE: 'BLOCKCHAIN_SEALED',
    AI_ESCALATE: 'MANUAL_REVIEW',
    MANUAL_REJECT: 'REJECTED',
    SOFT_DELETE: 'DELETED',
  },
  MANUAL_REVIEW: {
    MANUAL_APPROVE: 'BLOCKCHAIN_SEALED',
    MANUAL_REJECT: 'REJECTED',
    SOFT_DELETE: 'DELETED',
  },
  REJECTED: {
    EDIT_CONTENT: 'DRAFT',
    SOFT_DELETE: 'DELETED',
  },
  BLOCKCHAIN_SEALED: {
    TRIGGER_PUBLICATION: 'PUBLISHED',
    SOFT_DELETE: 'DELETED',
  },
  PUBLISHED: {
    EDIT_CONTENT: 'AI_ANALYSIS',
    SOFT_DELETE: 'DELETED',
  }
});
