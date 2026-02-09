/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserAgentCollectorDriver
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Forensic Persistence
 * @description Driver atômico para persistência de assinaturas de rede no Supabase.
 */

import { createClient } from '@supabase/supabase-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { 
  UserAgentTraceSchema, 
  type IUserAgentTrace 
} from '../schemas/UserAgentCollector.schema.js';

/**
 * @name UserAgentCollectorDriver
 * @function
 * @async
 * @description Insere o rastro de inteligência na tabela de auditoria de segurança.
 */
export const UserAgentCollectorDriver = async (
  trace: IUserAgentTrace
): Promise<void> => {
  const apparatusName = 'UserAgentCollectorDriver';
  const fileLocation = 'libs/integrations/supabase-bridge/src/lib/drivers/UserAgentCollectorDriver.ts';

  try {
    // 1. Validação de ADN
    const validatedTrace = UserAgentTraceSchema.parse(trace);

    // 2. Configuração de Client (Uso de Service Role para Bypass de RLS em Auditoria)
    const supabaseUrl = process.env['SUPABASE_URL'] || '';
    const supabaseKey = process.env['SUPABASE_SERVICE_ROLE_KEY'] || '';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('MISSING_PERSISTENCE_INFRASTRUCTURE_KEYS');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Execução de Persistência
    const { error } = await supabase
      .from('agv_security_audit_traces')
      .insert([{
        fingerprint: validatedTrace.fingerprint,
        user_agent_raw: validatedTrace.userAgentRaw,
        is_suspicious: validatedTrace.isSuspicious,
        correlation_id: validatedTrace.correlationIdentifier,
        detected_at: new Date().toISOString()
      }]);

    if (error) throw error;

    // 4. Telemetria de Sucesso
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TRACE_PERSISTED',
      message: `Rastro de inteligência [${validatedTrace.fingerprint.substring(0, 8)}] selado no cofre.`,
      traceIdentifier: validatedTrace.correlationIdentifier
    });

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-INT-1001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: trace?.correlationIdentifier || 'NO_TRACE',
      severity: 'HIGH',
      recoverySuggestion: 'Verificar status da instância do Supabase e permissões da tabela agv_security_audit_traces.'
    });
  }
};