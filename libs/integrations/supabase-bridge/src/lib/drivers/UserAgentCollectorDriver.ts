/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserAgentCollectorDriver
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Fidelity Persistence
 * @description Saneado contra erros TS2307 e TS2353.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignSupabaseClient } from '../infrastructure/SovereignSupabaseClient.js';
import {
  UserAgentTraceSchema,
  type IUserAgentTrace
} from '../schemas/UserAgentCollector.schema.js';

export const UserAgentCollectorDriver = async (
  tracePayload: IUserAgentTrace
): Promise<void> => {
  const apparatusName = 'UserAgentCollectorDriver';
  const fileLocation = 'libs/integrations/supabase-bridge/src/lib/drivers/UserAgentCollectorDriver.ts';

  try {
    // 1. Aduana de ADN
    const validatedTrace = UserAgentTraceSchema.parse(tracePayload);
    const supabase = SovereignSupabaseClient.getInstance();

    // 2. Execução de Persistência (Cura Lexical: identifier)
    const { error: databaseError } = await supabase
      .from('agv_security_audit_traces')
      .insert([{
        fingerprint: validatedTrace.fingerprint,
        user_agent_raw: validatedTrace.userAgentRaw,
        is_suspicious: validatedTrace.isSuspicious,
        correlation_id: validatedTrace.correlationIdentifier,
        detected_at: new Date().toISOString()
      }]);

    if (databaseError) throw databaseError;

    // 3. Telemetria Sincronizada (Cura TS2353: correlationIdentifier)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TRACE_SEALED',
      message: `Rastro behaviorista [${validatedTrace.fingerprint.substring(0, 8)}] selado.`,
      correlationIdentifier: validatedTrace.correlationIdentifier
    });

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-INT-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: tracePayload?.correlationIdentifier || 'ORPHAN_TRACE',
      severity: 'HIGH'
    });
  }
};
