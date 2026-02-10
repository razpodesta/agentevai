/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SecurityAuditRepository
 * @version 3.1.0
 * @protocol OEDP-V6.0 - Forensic Precision
 * @description Saneado: Erradicada a abreviação 'id' e implementada indexação nominal.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignSupabaseClient } from '../infrastructure/SovereignSupabaseClient.js';
import {
  SecurityAuditEntrySchema,
  type ISecurityAuditEntry
} from '../schemas/SecurityAudit.schema.js';

export class SecurityAuditRepository {
  private static readonly apparatusName = 'SecurityAuditRepository';

  public static async sealSecurityVerdict(entry: ISecurityAuditEntry): Promise<void> {
    const fileLocation = 'libs/integrations/supabase-bridge/src/lib/repositories/SecurityAuditRepository.ts';

    try {
      // 1. Aduana de ADN
      const validatedData = SecurityAuditEntrySchema.parse(entry);
      const supabase = SovereignSupabaseClient.getInstance();

      /**
       * @section Cura Lexical Militar
       * Substituído 'id' por 'identifier'.
       * O mapeamento para a coluna física do Postgres é mantido pelo rastro semântico.
       */
      const { error: databaseError } = await supabase
        .from('agv_security_verdicts')
        .insert([{
          identifier: validatedData.auditIdentifier, // CURA: de 'id' para 'identifier'
          ip_address: validatedData.internetProtocolAddress,
          ua_fingerprint: validatedData.userAgentFingerprint,
          bot_score: validatedData.botReputationScore,
          verdict: validatedData.securityVerdict,
          threat_type: validatedData.threatCategory,
          correlation_id: validatedData.correlationIdentifier,
          created_at: validatedData.detectedAt
        }]);

      if (databaseError) throw databaseError;

      // 2. Telemetria Unificada (Protocolo V6.0)
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'VERDICT_PERSISTED',
        message: 'Veredito de segurança selado no cofre relacional.',
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
