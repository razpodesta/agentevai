/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowEngine
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Finite State Sovereignty
 * @description Motor lógico que gerencia as transições de estado de uma notícia.
 * Garante que o rastro editorial respeite a hierarquia de confiança.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  EditorialStateSchema,
  WorkflowActionSchema,
  type IEditorialWorkflowInput
} from '../../schemas/EditorialWorkflow.schema.js';

/**
 * @section Matriz de Transições de Estado (Imutável)
 * Define quais ações são permitidas em cada estado.
 */
const WORKFLOW_MATRIX: Record<string, string> = {
  'DRAFT:SUBMIT_FOR_REVIEW': 'AI_ANALYSIS',
  'AI_ANALYSIS:AI_APPROVE': 'BLOCKCHAIN_SEALED',
  'AI_ANALYSIS:AI_ESCALATE': 'MANUAL_REVIEW',
  'MANUAL_REVIEW:MANUAL_APPROVE': 'BLOCKCHAIN_SEALED',
  'MANUAL_REVIEW:MANUAL_REJECT': 'REJECTED',
  'AI_ANALYSIS:MANUAL_REJECT': 'REJECTED',
  'REJECTED:EDIT_CONTENT': 'DRAFT',
  'BLOCKCHAIN_SEALED:TRIGGER_PUBLICATION': 'PUBLISHED',
  'PUBLISHED:EDIT_CONTENT': 'MANUAL_REVIEW', // Re-auditoria se editado após publicado
  'ANY:SOFT_DELETE': 'DELETED'
};

/**
 * @name EditorialWorkflowEngine
 * @class
 * @description Orquestrador funcional para operações de CRUD e Transições.
 */
export class EditorialWorkflowEngine {
  private static readonly apparatusName = 'EditorialWorkflowEngine';

  /**
   * @method calculateNextState
   * @description Calcula o próximo estágio do rastro baseado na matriz de soberania.
   *
   * @param {IEditorialWorkflowInput} input - O par Estado Atual + Ação solicitada.
   * @returns {string} O novo estado validado.
   */
  public static calculateNextState(input: IEditorialWorkflowInput): string {
    const transitionKey = input.requestedAction === 'SOFT_DELETE'
      ? `ANY:SOFT_DELETE`
      : `${input.currentState}:${input.requestedAction}`;

    const nextState = WORKFLOW_MATRIX[transitionKey];

    if (!nextState) {
      throw new SovereignError({
        uniqueErrorCode: 'OS-ED-2001' as any,
        i18nMappingKey: 'ILLEGAL_WORKFLOW_TRANSITION',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: this.apparatusName,
          version: '1.0.0',
          fileLocation: 'libs/realms/news-domain/src/lib/orchestrators/EditorialWorkflowEngine.ts'
        },
        runtimeSnapshot: { transitionAttempted: transitionKey, correlationIdentifier: input.correlationIdentifier },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'ENGINE_INTERNAL' }
      });
    }

    // Telemetria de Transição
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'STATE_TRANSITION',
      message: `Notícia evoluiu de ${input.currentState} para ${nextState} via ${input.requestedAction}.`,
      traceIdentifier: input.correlationIdentifier
    });

    return nextState;
  }
}
