/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicAuditRepository
 * @version 1.0.0
 * @protocol OEDP-V6.5 - High Performance Persistence
 * @description Guardião do cofre geoespacial. Sela o rastro territorial no Supabase.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy REAL-INFRASTRUCTURE: Conexão direta com SovereignSupabaseClient.
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
  GeographicAuditEntrySchema, 
  type IGeographicAuditEntry 
} from '../schemas/GeographicAudit.schema.js';

export class GeographicAuditRepository {
  private static readonly apparatusName = 'GeographicAuditRepository';
  private static readonly fileLocation = 'libs/integrations/supabase-bridge/src/lib/repositories/GeographicAuditRepository.ts';
  private static readonly DATABASE_TABLE = 'agv_geographic_audits';

  /**
   * @method sealGeographicAudit
   * @static
   * @async
   * @description Grava permanentemente o rastro de localização no búnquer relacional.
   */
  public static async sealGeographicAudit(
    rawParameters: unknown,
    dictionary: ISovereignDictionary
  ): Promise<void> {
    
    try {
      // 1. ADUANA DE ADN (Ingresso Seguro)
      const validatedEntry = GeographicAuditEntrySchema.parse(rawParameters);
      const { correlationIdentifier, identifier } = validatedEntry;

      const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
        dictionary, this.apparatusName, key, variables, correlationIdentifier
      );

      // 2. HANDSHAKE COM INFRAESTRUTURA
      const supabase = SovereignSupabaseClient.getClient();

      // 3. EXECUÇÃO DE PERSISTÊNCIA (Mapeamento Nominal)
      const { error: databaseError } = await supabase
        .from(this.DATABASE_TABLE)
        .insert([{
          identifier: validatedEntry.identifier,
          fidelity_level: validatedEntry.fidelityLevel,
          h3_index_hex: validatedEntry.h3IndexHexadecimal,
          latitude: validatedEntry.latitude,
          longitude: validatedEntry.longitude,
          region_name: validatedEntry.regionName,
          state_code: validatedEntry.stateCode,
          correlation_id: validatedEntry.correlationIdentifier,
          detected_at: validatedEntry.detectedAt
        }]);

      if (databaseError) throw databaseError;

      // 4. TELEMETRIA SOBERANA
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'GEOGRAPHIC_AUDIT_SEALED',
        message: translate('logAuditSuccess', { identifier: identifier.substring(0, 8) }),
        correlationIdentifier,
        metadata: { 
          table: this.DATABASE_TABLE, 
          fidelity: validatedEntry.fidelityLevel 
        }
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INT-3001'),
        apparatus: this.apparatusName,
        location: this.fileLocation,
        correlationIdentifier: (rawParameters as IGeographicAuditEntry)?.correlationIdentifier || 'NO_TRACE',
        severity: 'CRITICAL',
        recoverySuggestion: 'Verificar integridade da tabela agv_geographic_audits ou chaves de acesso ao Supabase.'
      });
    }
  }
}