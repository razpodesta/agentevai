/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowEngine
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Precision & Zero-Any
 * @description Motor de soberania para transições de estado jornalístico.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import { IEditorialWorkflowInput } from './schemas/EditorialWorkflow.schema.js';
import { EditorialTransitionMatrix } from './constants/EditorialTransitionMatrix.js';

export class EditorialWorkflowEngine {
  private static readonly apparatusName = 'EditorialWorkflowEngine';

  /**
   * @method calculateNextState
   * @description Processa a transição de estado com validação de matriz e rastro forense.
   */
  public static calculateNextState(input: IEditorialWorkflowInput): string {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.ts';

    // 1. RESOLUÇÃO DE TRANSIÇÃO (O(1) Access)
    const possibleActions = EditorialTransitionMatrix[input.currentState];
    const targetState = possibleActions ? possibleActions[input.requestedAction] : undefined;

    // 2. PROTOCOLO DE ENTROPIA: Se a transição não existe na matriz
    if (!targetState) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-ED-2001'),
        i18nMappingKey: 'ILLEGAL_WORKFLOW_TRANSITION',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: this.apparatusName,
          version: '2.0.0',
          fileLocation
        },
        runtimeSnapshot: {
          currentState: input.currentState,
          requestedAction: input.requestedAction,
          correlationIdentifier: input.correlationIdentifier
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'ENGINE_CORE'
        },
        recoverySuggestion: 'Verificar se o papel do usuário possui autoridade para disparar esta ação no estado atual.'
      });
    }

    // 3. TELEMETRIA DE SOBERANIA
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'STATE_TRANSITION_SUCCESS',
      message: `Rastro editorial transmutado: ${input.currentState} -> ${targetState}.`,
      traceIdentifier: input.correlationIdentifier,
      metadata: { action: input.requestedAction }
    });

    return targetState;
  }
}
