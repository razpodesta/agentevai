/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDataVault
 * @version 2.3.3
 * @protocol OEDP-V5.5 - High Performance & Forensic Integrity
 * @description Motor de blindagem PII (Personally Identifiable Information).
 * Implementa AES-GCM-256 e SHA-256 determinístico via @noble v2.
 * @policy ZERO-ANY: Erradicação total de tipagem anárquica.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ESM-STRICT: Uso de extensões explícitas para compatibilidade NodeNext/2026.
 */

import { gcm } from '@noble/ciphers/aes.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';

/**
 * CORREÇÃO TS2307: Adição de extensão .js para conformidade com o motor ESM.
 */
import {
  EncryptedDataSchema,
  AnonymizedIdentifierSchema,
  VaultPayloadSchema,
  type IVaultPayload
} from './schemas/VaultContratos.schema.js';

/**
 * @class SovereignDataVault
 * @description Câmara acouraçada para purificação e proteção de dados sensíveis.
 * Garante que informações críticas nunca transitem em texto claro.
 */
export class SovereignDataVault {
  private static readonly ALGORITHM_VERSION = 'v1:gcm:';
  private static readonly NONCE_LENGTH_BYTES = 12;

  // Otimização de Performance: Reuso de instâncias de encoders e decoders para evitar GC Pressure.
  private static readonly UTF8_ENCODER = new TextEncoder();
  private static readonly UTF8_DECODER = new TextDecoder();

  /**
   * @method anonymize
   * @description Transmuta um dado sensível em um identificador único irreversível (Hash Salgado).
   *
   * @param {string} plainText - O dado a ser anonimizado.
   * @param {string} correlationIdentifier - ID de correlação para rastro forense.
   * @returns {string} Identificador anonimizado Branded.
   */
  public static anonymize(
    plainText: string,
    correlationIdentifier: string
  ): string {
    const apparatusName = 'SovereignDataVault:anonymize';

    try {
      const salt = process.env['SOVEREIGN_VAULT_SALT'];
      if (!salt) throw new Error('VAULT_SALT_MISSING_IN_ENVIRONMENT');

      // SHA-256 Determinístico com Salt de Soberania (Noble v2)
      const combinedData = this.UTF8_ENCODER.encode(plainText + salt);
      const hashBuffer = sha256(combinedData);
      const hexHash = bytesToHex(hashBuffer);

      return AnonymizedIdentifierSchema.parse(hexHash);

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-SEC-2001',
        apparatus: apparatusName,
        location: 'libs/foundation/sovereign-data-vault/src/lib/SovereignDataVault.ts',
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }

  /**
   * @method protect
   * @description Cifra um dado PII usando Criptografia Autenticada (AEAD).
   *
   * @param {IVaultPayload} payload - Carga útil contendo o texto e o contexto da proteção.
   * @returns {Promise<string>} String cifrada com versão e integridade garantida.
   */
  public static async protect(payload: IVaultPayload): Promise<string> {
    const apparatusName = 'SovereignDataVault:protect';

    // 1. Validação Aduaneira de Entrada (ADN Check)
    const data = VaultPayloadSchema.parse(payload);

    try {
      const masterKeyHex = process.env['SOVEREIGN_MASTER_KEY'];
      if (!masterKeyHex) throw new Error('VAULT_KEY_MISSING_IN_ENVIRONMENT');

      const keyBytes = hexToBytes(masterKeyHex);

      // Resiliência de Ambiente: Seleção do motor de entropia disponível
      const systemCrypto = typeof window !== 'undefined' ? window.crypto : globalThis.crypto;
      const nonce = systemCrypto.getRandomValues(new Uint8Array(this.NONCE_LENGTH_BYTES));

      const plainTextBytes = this.UTF8_ENCODER.encode(data.plainText);

      // AES-GCM (Motor Noble v2 gerencia Tag de autenticação internamente)
      const cipher = gcm(keyBytes, nonce);
      const cipherTextWithTag = cipher.encrypt(plainTextBytes);

      // Composição Soberana: Nonce (12) + CipherText + Tag
      const combinedPayload = new Uint8Array(nonce.length + cipherTextWithTag.length);
      combinedPayload.set(nonce);
      combinedPayload.set(cipherTextWithTag, nonce.length);

      const finalCipherString = `${this.ALGORITHM_VERSION}${bytesToHex(combinedPayload)}`;

      // 2. Telemetria de Segurança
      SovereignLogger({
        severity: 'INFO',
        apparatus: 'SovereignDataVault',
        operation: 'DATA_PROTECTED',
        message: 'Proteção de PII concluída com sucesso.',
        traceIdentifier: data.correlationIdentifier,
        metadata: { dataContext: data.context }
      });

      return EncryptedDataSchema.parse(finalCipherString);

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-SEC-2002',
        apparatus: apparatusName,
        location: 'libs/foundation/sovereign-data-vault/src/lib/SovereignDataVault.ts',
        correlationIdentifier: data.correlationIdentifier,
        severity: 'FATAL'
      });
    }
  }

  /**
   * @method unprotect
   * @description Decifra um dado previamente protegido e valida sua integridade estrutural.
   */
  public static async unprotect(
    encryptedData: string,
    correlationIdentifier: string
  ): Promise<string> {
    const apparatusName = 'SovereignDataVault:unprotect';

    try {
      const masterKeyHex = process.env['SOVEREIGN_MASTER_KEY'];
      if (!masterKeyHex) throw new Error('VAULT_KEY_MISSING_IN_ENVIRONMENT');

      // 1. Verificação de Versão e Integridade
      if (!encryptedData.startsWith(this.ALGORITHM_VERSION)) {
        throw new Error('INVALID_CIPHER_VERSION_OR_CORRUPTED_DATA');
      }

      const rawHexData = encryptedData.replace(this.ALGORITHM_VERSION, '');
      const fullBuffer = hexToBytes(rawHexData);

      // 2. Separação de Nonce e Carga Útil (Tag incluída)
      const nonce = fullBuffer.slice(0, this.NONCE_LENGTH_BYTES);
      const cipherTextWithTag = fullBuffer.slice(this.NONCE_LENGTH_BYTES);

      const keyBytes = hexToBytes(masterKeyHex);
      const cipher = gcm(keyBytes, nonce);

      const decryptedBytes = cipher.decrypt(cipherTextWithTag);

      return this.UTF8_DECODER.decode(decryptedBytes);

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-SEC-2003',
        apparatus: apparatusName,
        location: 'libs/foundation/sovereign-data-vault/src/lib/SovereignDataVault.ts',
        correlationIdentifier,
        severity: 'CRITICAL',
        recoverySuggestion: 'O dado pode ter sido adulterado ou a chave mestra de rotação foi alterada.'
      });
    }
  }
}
