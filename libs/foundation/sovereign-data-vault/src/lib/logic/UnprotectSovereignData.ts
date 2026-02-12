/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UnprotectSovereignData
 * @version 6.0.0
 * @protocol OEDP-V6.0 - High Performance Cryptography
 * @description Atuador de decifragem com verificação de integridade matemática (AEAD).
 * Realiza a perícia reversa de rastros PII selados via AES-GCM-256.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total via ADN nominal e Recuperação Estrutural.
 */

import { gcm } from '@noble/ciphers/aes.js';
import { hexToBytes } from '@noble/hashes/utils.js';
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
  EncryptedDataSchema, 
  type EncryptedData 
} from '../schemas/VaultContracts.schema.js';

/** 
 * @section Constantes de Protocolo Zenith
 */
const SOVEREIGN_DECODER = new TextDecoder();
const EXPECTED_VERSION_PREFIX = 'v1:gcm:';
const AUTHENTICATED_NONCE_SIZE_BYTES = 12;

/**
 * @name UnprotectSovereignData
 * @function
 * @async
 * @description Decifra rastro PII e valida sua integridade através da Tag de Autenticação.
 * 
 * @param {EncryptedData} encryptedData - O rastro Branded vindo da persistência.
 * @param {string} correlationIdentifier - UUID inalterável da jornada forense.
 * @param {ISovereignDictionary} dictionary - Silo linguístico regionalizado.
 * @returns {Promise<string>} O texto claro original após certificação de integridade.
 */
export const UnprotectSovereignData = async (
  encryptedData: EncryptedData,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): Promise<string> => {
  const apparatusName = 'UnprotectSovereignData';
  const fileLocation = 'libs/foundation/sovereign-data-vault/src/lib/logic/UnprotectSovereignData.ts';

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, 
    apparatusName, 
    key, 
    variables, 
    correlationIdentifier
  );

  try {
    // 1. ADUANA DE ADN (Validando formato e versão do rastro)
    const validatedEncryptedString = EncryptedDataSchema.parse(encryptedData);

    if (!validatedEncryptedString.startsWith(EXPECTED_VERSION_PREFIX)) {
      throw new Error('INVALID_CIPHER_VERSION_OR_CORRUPTED_PREFIX');
    }

    // 2. RECUPERAÇÃO DE CHAVE MESTRE (Cofre de Ambiente)
    const masterKeyHexadecimal = process.env['SOVEREIGN_MASTER_KEY'];
    if (!masterKeyHexadecimal) {
      throw new Error('VAULT_MASTER_KEY_MISSING_IN_ENVIRONMENT');
    }

    const masterKeyBytes = hexToBytes(masterKeyHexadecimal);

    // 3. DESCONSTRUÇÃO DO RASTRO (Hexadecimal para Binário)
    const hexadecimalCipherPayload = validatedEncryptedString.replace(EXPECTED_VERSION_PREFIX, '');
    const fullBinaryBuffer = hexToBytes(hexadecimalCipherPayload);

    // 4. ISOLAMENTO DE ENTROPIA E CARGA (Nonce + Ciphertext/Tag)
    const extractedNonce = fullBinaryBuffer.slice(0, AUTHENTICATED_NONCE_SIZE_BYTES);
    const cipherTextWithAuthTag = fullBinaryBuffer.slice(AUTHENTICATED_NONCE_SIZE_BYTES);

    // 5. EXECUÇÃO DO MOTOR DE DECIFRAGEM (Noble AEAD)
    const cipherEngine = gcm(masterKeyBytes, extractedNonce);
    
    /**
     * @note O método .decrypt lança uma exceção se a Auth Tag (Integridade) falhar.
     * Isso garante que dados alterados no banco nunca retornem à aplicação.
     */
    const decryptedBinaryBuffer = cipherEngine.decrypt(cipherTextWithAuthTag);
    const plainTextResult = SOVEREIGN_DECODER.decode(decryptedBinaryBuffer);

    // 6. TELEMETRIA DE ACESSO AUTORIZADO (Pilar VI)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'PII_ACCESS_AUTHORIZED',
      message: translate('logSuccess', { correlationIdentifier }),
      correlationIdentifier,
      metadata: { 
        operation: 'DECRYPT',
        integrity: 'MATHEMATICALLY_VERIFIED'
      }
    });

    return plainTextResult;

  } catch (caughtError) {
    // 7. PROTOCOLO DE DEFESA: Identificação de Adulteração (Tampering)
    const errorIsStructural = caughtError instanceof Error;
    const errorMessage = errorIsStructural ? caughtError.message : String(caughtError);
    
    const isTamperingDetected = errorMessage.includes('auth tag') || errorMessage.includes('MAC');

    if (isTamperingDetected) {
      SovereignLogger({
        severity: 'CRITICAL',
        apparatus: apparatusName,
        operation: 'TAMPERING_ALERT',
        message: translate('errorTampering'),
        correlationIdentifier,
        metadata: { 
          faultyTrace: encryptedData.substring(0, 20) + '...',
          threatLevel: 'MAXIMUM'
        }
      });
    }

    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-2003'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: isTamperingDetected ? 'FATAL' : 'CRITICAL',
      recoverySuggestion: isTamperingDetected 
        ? 'ALERTA DE SEGURANÇA: O rastro de dados foi violado ou a chave mestra de cifragem foi alterada.'
        : 'Verificar integridade da SOVEREIGN_MASTER_KEY no ambiente de execução.'
    });
  }
};