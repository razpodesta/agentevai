/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AnonymizeSovereignData
 */
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { AnonymizedIdentifierSchema, type AnonymizedIdentifier } from '../schemas/VaultContracts.schema.js';

export const AnonymizeSovereignData = (
  plainText: string,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): AnonymizedIdentifier => {
  const apparatusName = 'AnonymizeSovereignData';
  const encoder = new TextEncoder();

  try {
    const salt = process.env['SOVEREIGN_VAULT_SALT'];
    if (!salt) throw new Error('VAULT_SALT_MISSING');

    const hashBuffer = sha256(encoder.encode(plainText + salt));
    const hexHash = bytesToHex(hashBuffer);

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'ANONYMIZATION_SEALED',
      message: SovereignTranslationEngine.translate(dictionary, apparatusName, 'logSuccess', {}, correlationIdentifier),
      correlationIdentifier
    });

    return AnonymizedIdentifierSchema.parse(hexHash);
  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-SEC-2001'),
      apparatus: apparatusName,
      location: 'libs/foundation/sovereign-data-vault/src/lib/logic/AnonymizeSovereignData.ts',
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
};
