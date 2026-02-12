/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SecurityAuditRepository
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance Infrastructure
 * @description Orquestrador de persistência para rastros de segurança.
 * Saneado: Erradicados os erros TS2307 e TS2353.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica militar inalterável.
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

/** @section Sincronia de Borda */
import { SovereignSupabaseClient } from '../infrastructure/SovereignSupabaseClient.js';
import { 
  SecurityAuditEntrySchema, 
  type ISecurityAuditEntry 
} from '../schemas/SecurityAudit.schema.js';

/**
 * @section Mapeamento de Persistência (Physical Layer)
 * Centralizamos os nomes das colunas físicas para evitar abreviações no código TypeScript.
 */
const POSTGRES_TABLE_NAME = 'agv_security_verdicts';
const PHYSICAL_COLUMNS = {
  PRIMARY_KEY: 'id',
  IP_ADDRESS: 'ip_address',
  UA_FINGERPRINT: 'ua_fingerprint',
  BOT_SCORE: 'bot_score',
  VERDICT: 'verdict',
  THREAT_TYPE: 'threat_type',
  CORRELATION_ID: 'correlation_id',
  CREATED_AT: 'created_at'
} as const;

export class SecurityAuditRepository {
  private static readonly apparatusName = 'SecurityAuditRepository';
  private static readonly fileLocation = 'libs/integrations/supabase-bridge/src/lib/repositories/SecurityAuditRepository.ts';

  /**
   * @method sealSecurityVerdict
   * @static
   * @async
   * @description Registra permanentemente o veredito de segurança no cofre relacional.
   * 
   * @param {ISecurityAuditEntry} entry - Os dados da auditoria validados por ADN.
   * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria.
   */
  public static async sealSecurityVerdict(
    entry: ISecurityAuditEntry,
    dictionary: ISovereignDictionary
  ): Promise<void> {
    const apparatusName = this.apparatusName;

    try {
      // 1. ADUANA DE ADN (Validando integridade de entrada)
      const validatedData = SecurityAuditEntrySchema.parse(entry);
      const { correlationIdentifier, auditIdentifier } = validatedData;

      // Pilar 5: Soberania Linguística
      const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
        dictionary, apparatusName, key, variables, correlationIdentifier
      );

      // 2. HANDSHAKE COM INFRAESTRUTURA
      const supabase = SovereignSupabaseClient.getClient();

      // 3. EXECUÇÃO DE PERSISTÊNCIA (Mapeamento Nominal Sincronizado)
      const { error: databaseError } = await supabase
        .from(POSTGRES_TABLE_NAME)
        .insert([{
          [PHYSICAL_COLUMNS.PRIMARY_KEY]: auditIdentifier,
          [PHYSICAL_COLUMNS.IP_ADDRESS]: validatedData.internetProtocolAddress,
          [PHYSICAL_COLUMNS.UA_FINGERPRINT]: validatedData.userAgentFingerprint,
          [PHYSICAL_COLUMNS.BOT_SCORE]: validatedData.botReputationScore,
          [PHYSICAL_COLUMNS.VERDICT]: validatedData.securityVerdict,
          [PHYSICAL_COLUMNS.THREAT_TYPE]: validatedData.threatCategory,
          [PHYSICAL_COLUMNS.CORRELATION_ID]: correlationIdentifier,
          [PHYSICAL_COLUMNS.CREATED_AT]: validatedData.detectedAt
        }]);

      if (databaseError) throw databaseError;

      // 4. TELEMETRIA FORENSE SINCRO (Protocolo V6.0)
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'VERDICT_PERSISTED',
        message: translate('logVerdictPersisted'),
        correlationIdentifier,
        metadata: { 
          targetTable: POSTGRES_TABLE_NAME,
          auditIdentifier 
        }
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INT-1002'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier: entry?.correlationIdentifier || 'ORPHAN_TRACE',
        severity: 'CRITICAL',
        recoverySuggestion: 'Validar chaves de API do Supabase e existência da tabela agv_security_verdicts.'
      });
    }
  }
}