/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ProtectSovereignData
 */
import { gcm } from '@noble/ciphers/aes.js';
import { hexToBytes, bytesToHex } from '@noble/hashes/utils.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { EncryptedDataSchema, VaultPayloadSchema, type IVaultPayload, type EncryptedData } from '../schemas/VaultContracts.schema.js';

export const ProtectSovereignData = async (
  payload: IVaultPayload,
  dictionary: ISovereignDictionary
): Promise<EncryptedData> => {
  const apparatusName = 'ProtectSovereignData';
  const data = VaultPayloadSchema.parse(payload);

  try {
    const masterKey = hexToBytes(process.env['SOVEREIGN_MASTER_KEY'] || '');
    const nonce = crypto.getRandomValues(new Uint8Array(12));
    const cipher = gcm(masterKey, nonce);

    const cipherText = cipher.encrypt(new TextEncoder().encode(data.plainText));
    const finalBuffer = new Uint8Array(nonce.length + cipherText.length);
    finalBuffer.set(nonce);
    finalBuffer.set(cipherText, nonce.length);

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'PII_PROTECTED',
      message: SovereignTranslationEngine.translate(dictionary, apparatusName, 'logSuccess', { context: data.context }, data.correlationIdentifier),
      correlationIdentifier: data.correlationIdentifier
    });

    return EncryptedDataSchema.parse(`v1:gcm:${bytesToHex(finalBuffer)}`);
  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-2002'),
      apparatus: apparatusName,
      location: 'libs/foundation/sovereign-data-vault/src/lib/logic/ProtectSovereignData.ts',
      correlationIdentifier: data.correlationIdentifier,
      severity: 'FATAL'
    });
  }
};
