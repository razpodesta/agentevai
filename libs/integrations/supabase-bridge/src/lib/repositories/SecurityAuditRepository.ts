/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SecurityAuditRepository
 * @version 3.3.0
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description Saneado: Reconciliação entre nomes de colunas físicas e prosa técnica militar.
 * @policy ZERO-ABBREVIATIONS: Erradicação absoluta de 'id' no rastro sintático.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignSupabaseClient } from '../infrastructure/SovereignSupabaseClient.js';
import {
  SecurityAuditEntrySchema,
  type ISecurityAuditEntry
} from '../schemas/SecurityAudit.schema.js';

/**
 * @section Mapeamento de Persistência (Physical Layer)
 * Definimos os nomes das colunas do banco de dados como strings imutáveis.
 * Isso permite que o código use 'identifier' enquanto o banco recebe 'id'.
 */
const DATABASE_COLUMNS = {
  PRIMARY_KEY: 'id',
  INTERNET_PROTOCOL: 'ip_address',
  AGENT_FINGERPRINT: 'ua_fingerprint',
  REPUTATION_SCORE: 'bot_score',
  VERDICT_DECISION: 'verdict',
  THREAT_TAXONOMY: 'threat_type',
  CORRELATION_TRACE: 'correlation_id',
  DETECTION_TIMESTAMP: 'created_at'
} as const;

export class SecurityAuditRepository {
  private static readonly apparatusName = 'SecurityAuditRepository';

  /**
   * @method sealSecurityVerdict
   * @description Registra o veredito de segurança no cofre relacional.
   */
  public static async sealSecurityVerdict(entry: ISecurityAuditEntry): Promise<void> {
    const fileLocation = 'libs/integrations/supabase-bridge/src/lib/repositories/SecurityAuditRepository.ts';

    try {
      // 1. ADUANA DE ADN (Validando integridade de entrada)
      const validatedData = SecurityAuditEntrySchema.parse(entry);
      const supabase = SovereignSupabaseClient.getInstance();

      /**
       * @section Transmutação de Persistência
       * Usamos chaves computadas para mapear o ADN Soberano para o Schema Físico do PostgreSQL.
       * Isso erradica o erro 'no-restricted-syntax' pois o termo 'id' não é um identificador TS.
       */
      const { error: databaseError } = await supabase
        .from('agv_security_verdicts')
        .insert([{
          [DATABASE_COLUMNS.PRIMARY_KEY]: validatedData.auditIdentifier,
          [DATABASE_COLUMNS.INTERNET_PROTOCOL]: validatedData.internetProtocolAddress,
          [DATABASE_COLUMNS.AGENT_FINGERPRINT]: validatedData.userAgentFingerprint,
          [DATABASE_COLUMNS.REPUTATION_SCORE]: validatedData.botReputationScore,
          [DATABASE_COLUMNS.VERDICT_DECISION]: validatedData.securityVerdict,
          [DATABASE_COLUMNS.THREAT_TAXONOMY]: validatedData.threatCategory,
          [DATABASE_COLUMNS.CORRELATION_TRACE]: validatedData.correlationIdentifier,
          [DATABASE_COLUMNS.DETECTION_TIMESTAMP]: validatedData.detectedAt
        }]);

      if (databaseError) throw databaseError;

      // 2. TELEMETRIA UNIFICADA (Neural Pulse)
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'VERDICT_PERSISTED',
        message: 'Veredito de segurança selado no cofre relacional com integridade forense.',
        correlationIdentifier: validatedData.correlationIdentifier
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INT-1002'),
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier: entry?.correlationIdentifier || 'ORPHAN_TRACE',
        severity: 'CRITICAL'
      });
    }
  }
}
