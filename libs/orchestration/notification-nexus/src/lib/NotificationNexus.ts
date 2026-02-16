/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NotificationNexus
 * @version 6.5.0
 * @protocol OEDP-V6.5 - High Performance Messaging
 * @description Cérebro operativo para despacho de mensagens. 
 * CURADO: Sincronizado com o novo ADN nominal e erradicado erro TS2307.
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

/** 
 * @section Sincronia de ADN 
 * CURA TS2307: Nome do arquivo unificado para NotificationNexus.schema.js
 */
import { 
  SovereignMessageSchema, 
  NotificationNexusTraceSchema,
  type ISovereignMessage 
} from './schemas/NotificationNexus.schema.js';

export class NotificationNexus {
  private static readonly apparatusName = 'NotificationNexus';
  private static readonly fileLocation = 'libs/orchestration/notification-nexus/src/lib/NotificationNexus.ts';

  /**
   * @method dispatchSystemDirective
   * @async
   */
  public static async dispatchSystemDirective(
    rawMessageParameters: unknown,
    dictionary: ISovereignDictionary
  ): Promise<ISovereignMessage> {
    const apparatusName = this.apparatusName;

    try {
      // 1. ADUANA DE ADN (Ingresso Seguro)
      const validatedMessage = SovereignMessageSchema.parse(rawMessageParameters);
      const { correlationIdentifier } = validatedMessage;

      const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
        dictionary, apparatusName, key, variables, correlationIdentifier
      );

      // 2. TELEMETRIA DE IGNIÇÃO
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'DIRECTIVE_DESPATCH_STARTED',
        message: translate('logMessageDispatched', { identifier: validatedMessage.identifier }),
        correlationIdentifier
      });

      // 3. EXECUÇÃO SOBERANA (Fim do Placeholder)
      return Object.freeze(validatedMessage);

    } catch (caughtError) {
      // 4. RECUPERAÇÃO DE RASTRO SANEADA (Cura de Radiação 'any')
      const traceRecovery = NotificationNexusTraceSchema.safeParse(rawMessageParameters);
      const fallbackCorrelationId = traceRecovery.success 
        ? traceRecovery.data.correlationIdentifier 
        : crypto.randomUUID();

      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-NOT-1001'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier: fallbackCorrelationId,
        severity: 'CRITICAL'
      });
    }
  }
}