/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EditorialWorkflowEngine
 * @version 6.0.0
 * @protocol OEDP-V6.0 - God Tier Deterministic Logic
 * @description Motor que executa transições de estado jornalístico com selagem de ADN.
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

/** @section Sincronia de ADN */
import {
  type EditorialState,
  type IEditorialWorkflowInput,
  EditorialStateSchema,
  EditorialWorkflowInputSchema,
} from '../schemas/EditorialWorkflow.schema.js';
import { EditorialTransitionMatrix } from './constants/EditorialTransitionMatrix.js';

export class EditorialWorkflowEngine {
  private static readonly apparatusName = 'EditorialWorkflowEngine';
  private static readonly fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.ts';

  /**
   * @method calculateNextState
   * @static
   * @description Transmuta o estado editorial via lookup nominal inquebrável.
   */
  public static calculateNextState(
    workflowParameters: IEditorialWorkflowInput,
    dictionary: ISovereignDictionary
  ): EditorialState {
    const apparatusName = this.apparatusName;

    // 1. ADUANA DE ENTRADA (Saneamento Zod V4)
    const data = EditorialWorkflowInputSchema.parse(workflowParameters);
    const { currentState, requestedAction, correlationIdentifier } = data;

    // 2. RESOLUÇÃO DE TRANSIÇÃO (Cura TS7053 via Mapeamento Nominal)
    const stateKey = currentState as unknown as string;
    const actionKey = requestedAction as unknown as string;
    
    const possibleTransitions = EditorialTransitionMatrix[stateKey];
    const rawTargetState = possibleTransitions ? possibleTransitions[actionKey] : undefined;

    // 3. PROTOCOLO DE DEFESA (Cura TS2353 - Illegal Jump)
    if (!rawTargetState) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-ED-2001'),
        i18nMappingKey: 'ILLEGAL_WORKFLOW_TRANSITION',
        severity: 'MEDIUM',
        apparatusMetadata: {
          name: apparatusName,
          version: '6.0.0',
          fileLocation: this.fileLocation
        },
        runtimeSnapshot: {
          inputPayload: { currentState, requestedAction },
          correlationIdentifier
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'ENGINE_CORE_FAILURE'
        },
        recoverySuggestion: 'O rastro editorial tentou um salto de soberania não mapeado na matriz.'
      });
    }

    // 4. SELAGEM DE SAÍDA E TELEMETRIA SINCRO (Pilar VI)
    const validatedTargetState = EditorialStateSchema.parse(rawTargetState);

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'STATE_TRANSITION_SUCCESS',
      message: SovereignTranslationEngine.translate(
        dictionary,
        apparatusName,
        'logStateTransmuted',
        { origin: stateKey, target: validatedTargetState as unknown as string },
        correlationIdentifier
      ),
      correlationIdentifier,
      metadata: { 
        isFinalState: ['PUBLISHED', 'REJECTED', 'DELETED'].includes(validatedTargetState as unknown as string)
      }
    });

    return validatedTargetState;
  }
}