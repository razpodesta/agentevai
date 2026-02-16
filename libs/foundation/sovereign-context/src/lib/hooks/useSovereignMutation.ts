/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus useSovereignMutation
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Swarm Synchrony
 * @description Hook de elite para execução de atos de vontade. 
 * CURADO: Nomenclatura simétrica e rastro forense inquebrável.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN */
import { 
  SovereignMutationInputSchema, 
  type ISovereignMutationInput 
} from './schemas/useSovereignMutation.schema.js';

export const useSovereignMutation = (parametersInput: ISovereignMutationInput) => {
  const apparatusName = 'useSovereignMutation';
  const queryClient = useQueryClient();

  const data = SovereignMutationInputSchema.parse(parametersInput);
  const { identifier, mutationExecutor, optimisticUpdateHandler, correlationIdentifier } = data;

  return useMutation({
    mutationKey: [identifier, correlationIdentifier],

    onMutate: async (variablesPayload: unknown) => {
      if (optimisticUpdateHandler) {
        SovereignLogger({
          severity: 'INFO',
          apparatus: apparatusName,
          operation: 'OPTIMISTIC_PULSE_START',
          message: `Iniciando reflexo visual imediato: ${identifier}`,
          correlationIdentifier
        });
        optimisticUpdateHandler(variablesPayload);
      }
      return { variablesPayload };
    },

    mutationFn: async (variablesPayload: unknown) => {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'MUTATION_IGNITED',
        message: `Executando transmutação física: ${identifier}`,
        correlationIdentifier
      });
      return await mutationExecutor(variablesPayload);
    },

    onSuccess: (resultSnapshot) => {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'MUTATION_SUCCESS',
        message: `Ato de vontade selado: ${identifier}`,
        correlationIdentifier,
        metadata: { result: resultSnapshot }
      });
      queryClient.invalidateQueries({ queryKey: [identifier] });
    },

    onError: (caughtError) => {
      const diagnostic = SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-APP-9001'),
        apparatus: apparatusName,
        location: 'libs/foundation/sovereign-context/src/lib/hooks/useSovereignMutation.ts',
        correlationIdentifier,
        severity: 'HIGH'
      });

      SovereignLogger({
        severity: 'ERROR',
        apparatus: apparatusName,
        operation: 'MUTATION_COLLAPSE',
        message: diagnostic.message,
        correlationIdentifier,
        metadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
      });
    }
  });
};