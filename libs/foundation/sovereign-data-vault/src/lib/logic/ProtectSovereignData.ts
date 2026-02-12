/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ProtectSovereignData
 * @version 6.0.0
 * @protocol OEDP-V6.0 - High Performance Cryptography
 * @description Atuador de blindagem PII via AES-GCM-256 (Criptografia Autenticada).
 * Garante a confidencialidade e a integridade matemática do rastro de dados.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica militar.
 * @policy ZERO-ANY: Saneamento total via ADN nominal e Recuperação Estrutural.
 */

import { gcm } from '@noble/ciphers/aes.js';
import { hexToBytes, bytesToHex } from '@noble/hashes/utils.js';
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
  VaultProtectionInputSchema,
  EncryptedDataSchema,
  type EncryptedData 
} from '../schemas/VaultContracts.schema.js';

/** 
 * @section Constantes de Protocolo Zenith
 */
const SOVEREIGN_ENCODER = new TextEncoder();
const CIPHER_VERSION_PREFIX = 'v1:gcm:';
const AUTHENTICATED_NONCE_SIZE_BYTES = 12;

/**
 * @name ProtectSovereignData
 * @function
 * @async
 * @description Cifra dados sensíveis utilizando AES-GCM com rastro forense integrado.
 * 
 * @param {unknown} rawParameters - Parâmetros contendo o texto claro e o rastro de auditoria.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria de segurança.
 * @returns {Promise<EncryptedData>} Carga cifrada com tag de autenticidade selada.
 */
export const ProtectSovereignData = async (
  rawParameters: unknown,
  dictionary: ISovereignDictionary
): Promise<EncryptedData> => {
  const apparatusName = 'ProtectSovereignData';
  const fileLocation = 'libs/foundation/sovereign-data-vault/src/lib/logic/ProtectSovereignData.ts';

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro no Búnquer)
    const validatedData = VaultProtectionInputSchema.parse(rawParameters);
    const { plainText, audit } = validatedData;

    // Pilar V: Soberania Linguística
    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, 
      apparatusName, 
      key, 
      variables, 
      audit.correlationIdentifier
    );

    // 2. RECUPERAÇÃO DE CHAVE MESTRE (Cofre de Ambiente)
    const masterKeyHexadecimal = process.env['SOVEREIGN_MASTER_KEY'];
    if (!masterKeyHexadecimal) {
      throw new Error('VAULT_MASTER_KEY_MISSING_IN_ENVIRONMENT');
    }

    const masterKeyBytes = hexToBytes(masterKeyHexadecimal);
    
    // 3. GERAÇÃO DE ENTROPIA (Nonce Único para AEAD)
    const cryptographicNonce = crypto.getRandomValues(new Uint8Array(AUTHENTICATED_NONCE_SIZE_BYTES));
    const cipherEngine = gcm(masterKeyBytes, cryptographicNonce);

    // 4. EXECUÇÃO CRIPTOGRÁFICA (Noble AES-GCM)
    // O motor gera automaticamente a Tag de Autenticação (16 bytes) ao final do ciphertext.
    const plainTextBytes = SOVEREIGN_ENCODER.encode(plainText);
    const cipherTextWithAuthTag = cipherEngine.encrypt(plainTextBytes);
    
    // Composição do Rastro: [NONCE] + [CIPHERTEXT + TAG]
    const combinedPayload = new Uint8Array(cryptographicNonce.length + cipherTextWithAuthTag.length);
    combinedPayload.set(cryptographicNonce);
    combinedPayload.set(cipherTextWithAuthTag, cryptographicNonce.length);

    const encryptedString = `${CIPHER_VERSION_PREFIX}${bytesToHex(combinedPayload)}`;

    // 5. TELEMETRIA NEURAL SINCRO (Protocolo V6.0)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'PII_PROTECTED_SUCCESSFULLY',
      message: translate('logSuccess', { context: audit.accessContext }),
      correlationIdentifier: audit.correlationIdentifier,
      metadata: { 
        apparatusFingerprint: audit.apparatusFingerprint,
        accessContext: audit.accessContext,
        payloadVersion: 'v1'
      }
    });

    return EncryptedDataSchema.parse(encryptedString);

  } catch (caughtError) {
    /** 
     * @section Protocolo de Resiliência (Cura de Radiação 'any')
     * Recuperação estrutural do rastro de correlação.
     */
    const hasAuditTrace = (input: unknown): input is { audit: { correlationIdentifier: string } } => {
      return typeof input === 'object' && input !== null && 'audit' in input;
    };

    const correlationIdentifierFallback = hasAuditTrace(rawParameters)
      ? rawParameters.audit.correlationIdentifier
      : crypto.randomUUID();

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-2002'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: correlationIdentifierFallback,
      severity: 'FATAL',
      recoverySuggestion: 'Verificar integridade da SOVEREIGN_MASTER_KEY ou suporte de hardware para instruções AES.'
    });
  }
};