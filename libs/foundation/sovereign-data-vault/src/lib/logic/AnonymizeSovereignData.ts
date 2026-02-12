/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AnonymizeSovereignData
 * @version 6.0.0
 * @protocol OEDP-V6.0 - High Performance Cryptography
 * @description Transmuta dados sensíveis em identificadores irreversíveis via SHA-256 + Sal de Soberania.
 * Garante o cumprimento da LGPD através da desidentificação técnica de PII.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total via ADN nominal e Recuperação Estrutural.
 */

import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import { 
  VaultAnonymizationInputSchema,
  AnonymizedIdentifierSchema, 
  type AnonymizedIdentifier 
} from '../schemas/VaultContracts.schema.js';

/** 
 * @section Otimização de Performance 
 * Instância única do encoder para minimizar a pressão sobre o Garbage Collector (GC).
 */
const SOVEREIGN_ENCODER = new TextEncoder();

/**
 * @name AnonymizeSovereignData
 * @function
 * @description Executa a selagem determinística de PII com rastro forense inalterável.
 * 
 * @param {unknown} rawParameters - Parâmetros contendo plainText e objeto audit (Fingerprint + Correlation).
 * @param {ISovereignDictionary} dictionary - Silo linguístico regionalizado para telemetria.
 * @returns {AnonymizedIdentifier} Hash selado com marca nominal Branded.
 */
export const AnonymizeSovereignData = (
  rawParameters: unknown,
  dictionary: ISovereignDictionary
): AnonymizedIdentifier => {
  const apparatusName = 'AnonymizeSovereignData';
  const fileLocation = 'libs/foundation/sovereign-data-vault/src/lib/logic/AnonymizeSovereignData.ts';

  try {
    // 1. ADUANA DE ADN (Saneamento Zod V4 Zenith)
    const validatedData = VaultAnonymizationInputSchema.parse(rawParameters);
    const { plainText, audit } = validatedData;

    // Pilar V: Soberania Linguística
    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, 
      apparatusName, 
      key, 
      variables, 
      audit.correlationIdentifier
    );

    // 2. RECUPERAÇÃO DE ENTROPIA (Sal de Soberania)
    const sovereignSalt = process.env['SOVEREIGN_VAULT_SALT'];
    if (!sovereignSalt) {
      throw new Error('VAULT_SALT_MISSING_IN_ENVIRONMENT');
    }

    // 3. EXECUÇÃO CRIPTOGRÁFICA (Noble Engine Sync)
    // O rastro é concatenado com o Salt para prevenir ataques de força bruta.
    const combinedBuffer = SOVEREIGN_ENCODER.encode(plainText + sovereignSalt);
    const hashBuffer = sha256(combinedBuffer);
    const hexadecimalHash = bytesToHex(hashBuffer);

    // 4. TELEMETRIA NEURAL SINCRO (Protocolo V6.0)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'ANONYMIZATION_SEALED',
      message: translate('logSuccess'),
      correlationIdentifier: audit.correlationIdentifier,
      metadata: { 
        apparatusFingerprint: audit.apparatusFingerprint,
        accessContext: audit.accessContext
      }
    });

    return AnonymizedIdentifierSchema.parse(hexadecimalHash);

  } catch (caughtError) {
    /** 
     * @section Protocolo de Resiliência (Pilar VI)
     * Recuperação segura do rastro de correlação sem uso de 'any'.
     */
    const hasAuditTrace = (input: unknown): input is { audit: { correlationIdentifier: string } } => {
      return typeof input === 'object' && input !== null && 'audit' in input;
    };

    const correlationIdentifierFallback = hasAuditTrace(rawParameters)
      ? rawParameters.audit.correlationIdentifier
      : crypto.randomUUID();

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-2001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: correlationIdentifierFallback,
      severity: 'HIGH',
      recoverySuggestion: 'Validar a presença da variável SOVEREIGN_VAULT_SALT ou a integridade do rastro de auditoria injetado.'
    });
  }
};