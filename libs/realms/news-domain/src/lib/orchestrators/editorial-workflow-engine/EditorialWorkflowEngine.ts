/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowEngine
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance & Nominal Integrity
 * @description Motor de soberania que executa as transições de estado jornalístico.
 * Saneado contra erros TS7053 (indexação nominal) e TS2353 (violação de snapshot).
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de Borda (Caminhos do Snapshot) */
import {
  type EditorialState,
  type IEditorialWorkflowInput,
  EditorialStateSchema
} from '../schemas/EditorialWorkflow.schema.js';
import { EditorialTransitionMatrix } from './constants/EditorialTransitionMatrix.js';

export class EditorialWorkflowEngine {
  private static readonly apparatusName = 'EditorialWorkflowEngine';

  /**
   * @method calculateNextState
   * @static
   * @description Processa a transmutação de estado com validação de ADN inquebrável.
   */
  public static calculateNextState(
    workflowParameters: IEditorialWorkflowInput,
    dictionary: ISovereignDictionary
  ): EditorialState {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.ts';
    const { currentState, requestedAction, correlationIdentifier } = workflowParameters;

    /**
     * @section RESOLUÇÃO_DE_INDEXAÇÃO (Cura TS7053)
     * Realizamos um casting controlado para string para acessar a matriz imutável,
     * garantindo que o rastro nominal seja preservado após a busca.
     */
    const activeStateKey = currentState as unknown as string;
    const transitionMap = EditorialTransitionMatrix[activeStateKey as keyof typeof EditorialTransitionMatrix];

    const rawTargetState = transitionMap
      ? transitionMap[requestedAction as keyof typeof transitionMap]
      : undefined;

    // 2. PROTOCOLO DE DEFESA (Cura TS2353)
    if (!rawTargetState) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-ED-2001'),
        i18nMappingKey: 'ILLEGAL_WORKFLOW_TRANSITION',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: this.apparatusName,
          version: '4.0.0',
          fileLocation
        },
        runtimeSnapshot: {
          /**
           * @section CONFORMIDADE_FOUNDATION
           * Dados de contexto injetados no inputPayload para respeitar o SovereignErrorSchema.
           */
          inputPayload: {
            currentStateTrace: currentState,
            requestedActionTrace: requestedAction,
            attemptedTransition: `${currentState}:${requestedAction}`
          },
          correlationIdentifier
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'ENGINE_CORE_FAILURE'
        },
        recoverySuggestion: 'Verificar se o papel do autor possui autoridade para disparar este gatilho no estado atual.'
      });
    }

    // 3. SELAGEM DE SAÍDA
    const validatedTargetState = EditorialStateSchema.parse(rawTargetState);

    // 4. TELEMETRIA SOBERANA
    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'STATE_TRANSITION_SUCCESS',
      message: SovereignTranslationEngine.translate(
        dictionary,
        this.apparatusName,
        'logStateTransmuted',
        {
          origin: currentState as unknown as string,
          target: validatedTargetState as unknown as string
        },
        correlationIdentifier
      ),
      correlationIdentifier
    });

    return validatedTargetState;
  }
}
