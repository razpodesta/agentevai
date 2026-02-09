/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowEngine
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - High Precision & Finite State Machine
 * @description Motor de soberania que executa as transições de estado jornalístico.
 * Implementa a lógica de imutabilidade e validação contra a Matriz de Transição.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 * @policy BRANDED-TYPES-ENFORCEMENT: Retorno estrito de EditorialState.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** 
 * @section Sincronia de Borda
 * Correção de rastro de importação para localizar o ADN mestre e a Matriz.
 */
import { 
  type EditorialState, 
  type IEditorialWorkflowInput,
  EditorialStateSchema
} from '../../schemas/EditorialWorkflow.schema.js';
import { EditorialTransitionMatrix } from './constants/EditorialTransitionMatrix.js';

/**
 * @class EditorialWorkflowEngine
 * @description Orquestrador funcional do ciclo de vida da notícia. 
 * Garante que nenhuma transição ilegal ocorra no rastro de auditoria.
 */
export class EditorialWorkflowEngine {
  private static readonly apparatusName = 'EditorialWorkflowEngine';

  /**
   * @method calculateNextState
   * @static
   * @description Processa a intenção de mudança de estado e retorna o novo selo de Soberania Editorial.
   * 
   * @param {IEditorialWorkflowInput} input - O par Estado Atual + Ação solicitada (Validado via Zod).
   * @returns {EditorialState} O próximo estado Branded e inalterável.
   */
  public static calculateNextState(input: IEditorialWorkflowInput): EditorialState {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.ts';

    // 1. RESOLUÇÃO DE TRANSIÇÃO (Acesso O(1) via Matriz Selada)
    const possibleActions = EditorialTransitionMatrix[input.currentState];
    const targetState = possibleActions ? possibleActions[input.requestedAction] : undefined;

    // 2. PROTOCOLO DE DEFESA: Bloqueio de Transição Ilegal (Entropia Detectada)
    if (!targetState) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-ED-2001'),
        i18nMappingKey: 'ILLEGAL_WORKFLOW_TRANSITION',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: this.apparatusName,
          version: '2.1.0',
          fileLocation
        },
        runtimeSnapshot: {
          currentState: input.currentState,
          requestedAction: input.requestedAction,
          correlationIdentifier: input.correlationIdentifier
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'ENGINE_CORE_FAILURE'
        },
        recoverySuggestion: 'Validar se o papel do autor permite a ação solicitada para este estado editorial.'
      });
    }

    /** 
     * @section Selagem de Saída
     * Garantimos que o retorno seja validado pelo EditorialStateSchema 
     * para manter a marca de Soberania (Branding).
     */
    const validatedTargetState = EditorialStateSchema.parse(targetState);

    // 3. TELEMETRIA DE SUCERANIA
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'STATE_TRANSITION_SUCCESS',
      message: `Rastro editorial evoluído: [${input.currentState}] -> [${validatedTargetState}].`,
      traceIdentifier: input.correlationIdentifier,
      metadata: { 
        actionExecuted: input.requestedAction,
        isBlockchainTarget: validatedTargetState === 'BLOCKCHAIN_SEALED'
      }
    });

    return validatedTargetState;
  }
}