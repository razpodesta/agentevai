/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus useSovereignMutation
 * @version 6.5.1
 * @protocol OEDP-V6.5 - High Performance Swarm Synchrony
 * @description Hook de elite para execução de atos de vontade.
 * CURADO: Erro TS2339 resolvido via Garantia de Instância Forense.
 * @policy OPTIMISTIC-UI: Implementa a Doutrina do Sensor Voluntário (Manifesto 0025).
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignMutationInputSchema,
  type ISovereignMutationInput
} from '../schemas/SovereignQuery.schema.js';

/**
 * @name useSovereignMutation
 * @function
 * @description Orquestra mutações com rastro forense, resiliência de UI e feedback cinético.
 */
export const useSovereignMutation = (parametersInput: ISovereignMutationInput) => {
  const apparatusName = 'useSovereignMutation';
  const queryClient = useQueryClient();

  // 1. ADUANA DE ADN (Ingresso Seguro)
  const data = SovereignMutationInputSchema.parse(parametersInput);
  const { identifier, mutationExecutor, optimisticUpdateHandler, correlationIdentifier } = data;

  return useMutation({
    mutationKey: [identifier, correlationIdentifier],

    /**
     * @section Handshake Otimista (Manifesto 0025)
     * Ativa o sensor visual antes da resposta física da infraestrutura.
     */
    onMutate: async (variablesPayload: unknown) => {
      if (optimisticUpdateHandler) {
        SovereignLogger({
          severity: 'INFO',
          apparatus: apparatusName,
          operation: 'OPTIMISTIC_PULSE_START',
          message: `Iniciando reflexo visual imediato para a vontade: ${identifier}`,
          correlationIdentifier
        });
        optimisticUpdateHandler(variablesPayload);
      }
      return { variablesPayload };
    },

    mutationFn: async (variablesPayload: unknown) => {
      // 2. TELEMETRIA DE IGNIÇÃO FÍSICA
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'MUTATION_IGNITED',
        message: `Executando transmutação física no búnquer: ${identifier}`,
        correlationIdentifier
      });

      return await mutationExecutor(variablesPayload);
    },

    onSuccess: (resultSnapshot) => {
      // 3. TELEMETRIA DE SUCESSO (Selagem Final)
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'MUTATION_SUCCESS',
        message: `Ato de vontade selado com 100% de integridade: ${identifier}`,
        correlationIdentifier,
        metadata: { mutationResult: resultSnapshot }
      });

      // Invalidação de rastro para forçar sincronia de enxame
      queryClient.invalidateQueries({ queryKey: [identifier] });
    },

    onError: (caughtError) => {
      /**
       * @section CURA_TS2339
       * Garantimos que o rastro seja tratado como a classe SovereignError.
       */
      const diagnostic = SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-APP-9001'),
        apparatus: apparatusName,
        location: 'libs/foundation/sovereign-context/src/lib/hooks/useSovereignMutation.ts',
        correlationIdentifier,
        severity: 'HIGH'
      });

      // 4. TELEMETRIA DE COLAPSO E AUTO-CURA
      SovereignLogger({
        severity: 'ERROR',
        apparatus: apparatusName,
        operation: 'MUTATION_COLLAPSE',
        message: diagnostic.message,
        correlationIdentifier,
        metadata: {
          // Acesso seguro ao rastro forense agora garantido
          diagnosticReport: diagnostic.getDiagnosticReport()
        }
      });
    }
  });
};
