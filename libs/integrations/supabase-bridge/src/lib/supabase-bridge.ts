/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SecurityAuditRepository
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Performance Integration
 * @description Braço de persistência soberana para rastros de segurança.
 * Orquestra a selagem de dados no Supabase (PostgreSQL).
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  SecurityAuditEntrySchema,
  type ISecurityAuditEntry
} from './schemas/SecurityAudit.schema.js';

/**
 * @class SecurityAuditRepository
 * @description Executor de baixo nível para persistência de dados forenses.
 */
export class SecurityAuditRepository {
  private static readonly apparatusName = 'SecurityAuditRepository';
  private static clientInstance: SupabaseClient | null = null;

  /**
   * @method getClient
   * @private Singleton de infraestrutura para evitar exaustão de conexões.
   */
  private static getClient(): SupabaseClient {
    if (this.clientInstance) return this.clientInstance;

    const supabaseUrl = process.env['SUPABASE_URL'] || '';
    const supabaseServiceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'] || '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('PERSISTENCE_INFRASTRUCTURE_KEYS_MISSING');
    }

    this.clientInstance = createClient(supabaseUrl, supabaseServiceKey);
    return this.clientInstance;
  }

  /**
   * @method sealSecurityVerdict
   * @description Grava permanentemente o veredito de segurança no cofre relacional.
   *
   * @param {ISecurityAuditEntry} entry - Os dados da auditoria validados por ADN.
   * @returns {Promise<void>}
   */
  public static async sealSecurityVerdict(entry: ISecurityAuditEntry): Promise<void> {
    const fileLocation = 'libs/integrations/supabase-bridge/src/lib/supabase-bridge.ts';

    try {
      // 1. Validação de Integridade Final
      const validatedData = SecurityAuditEntrySchema.parse(entry);

      // 2. Ignição do Canal de Dados
      const supabase = this.getClient();

      // 3. Execução de Persistência (Mapeamento para snake_case do Postgres)
      const { error } = await supabase
        .from('agv_security_verdicts')
        .insert([{
          id: validatedData.auditIdentifier,
          ip_address: validatedData.internetProtocolAddress,
          ua_fingerprint: validatedData.userAgentFingerprint,
          bot_score: validatedData.botReputationScore,
          verdict: validatedData.securityVerdict,
          threat_type: validatedData.threatCategory,
          correlation_id: validatedData.correlationIdentifier,
          created_at: validatedData.detectedAt
        }]);

      if (error) throw error;

      // 4. Telemetria de Sucesso
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'VERDICT_PERSISTED',
        message: `Veredito de segurança selado para o rastro ${validatedData.correlationIdentifier}.`,
        traceIdentifier: validatedData.correlationIdentifier
      });

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-INT-1002',
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier: entry?.correlationIdentifier || 'NO_TRACE',
        severity: 'CRITICAL',
        recoverySuggestion: 'Verificar conexão com Supabase e integridade da tabela agv_security_verdicts.'
      });
    }
  }
}
