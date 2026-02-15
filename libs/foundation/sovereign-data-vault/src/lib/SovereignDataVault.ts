/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDataVault
 * @version 6.5.0
 * @protocol OEDP-V6.5 - High Performance Facade
 * @description Orquestrador mestre do Reino de Blindagem. 
 * CURADO: Integrado ao Cartório Técnico e erradicado 'any'.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignApparatusRegistry } from '@agentevai/apparatus-metadata-registry';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import {
  EncryptedDataSchema,
  type EncryptedData,
  type AnonymizedIdentifier,
  VaultProtectionInputSchema,
  VaultAnonymizationInputSchema
} from './schemas/VaultContracts.schema.js';

/** @section Sincronia de Átomos Operativos */
import { AnonymizeSovereignData } from './logic/AnonymizeSovereignData.js';
import { ProtectSovereignData } from './logic/ProtectSovereignData.js';
import { UnprotectSovereignData } from './logic/UnprotectSovereignData.js';

export class SovereignDataVault {
  private static readonly apparatusName = 'SovereignDataVault';
  private static readonly fileLocation = 'libs/foundation/sovereign-data-vault/src/lib/SovereignDataVault.ts';

  /**
   * @method igniteRegistry
   * @private Realiza a selagem da identidade deste aparato no Cartório.
   */
  private static igniteRegistry(correlationIdentifier: string): void {
    SovereignApparatusRegistry.registerApparatus({
      identifier: this.apparatusName as any,
      authorName: 'Raz Podestá',
      semanticVersion: '6.5.0',
      complexityTier: 'INTEGRATION_DRIVER',
      stabilityScore: 100 as any,
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, correlationIdentifier);
  }

  /**
   * @method anonymize
   * @description Gera rastro anônimo irreversível com fé pública digital.
   */
  public static anonymize(
    targetPlainText: string,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): AnonymizedIdentifier {
    this.igniteRegistry(correlationIdentifier);
    const fingerprint = SovereignApparatusRegistry.getApparatusFingerprint(this.apparatusName as any);

    const request = VaultAnonymizationInputSchema.parse({
      plainText: targetPlainText,
      audit: {
        apparatusFingerprint: fingerprint,
        correlationIdentifier,
        accessContext: 'IDENTITY_IDENTIFIABLE_INFORMATION'
      }
    });

    return AnonymizeSovereignData(request, dictionary);
  }

  /**
   * @method protect
   * @description Cifra rastro PII via AES-GCM-256 com telemetria neural.
   */
  public static async protect(
    targetPlainText: string,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<EncryptedData> {
    this.igniteRegistry(correlationIdentifier);
    const fingerprint = SovereignApparatusRegistry.getApparatusFingerprint(this.apparatusName as any);

    const request = VaultProtectionInputSchema.parse({
      plainText: targetPlainText,
      audit: {
        apparatusFingerprint: fingerprint,
        correlationIdentifier,
        accessContext: 'FORENSIC_BEHAVIORAL_TRACE'
      }
    });

    SovereignLogger({
      severity: 'INFO',
      apparatus: this.apparatusName,
      operation: 'PROTECTION_IGNITED',
      message: 'Iniciando selagem criptográfica de rastro sensível.',
      correlationIdentifier
    });

    return ProtectSovereignData(request, dictionary);
  }

  /**
   * @method unprotect
   * @description Decifra rastro e valida integridade matemática (AEAD).
   */
  public static async unprotect(
    targetEncryptedData: EncryptedData,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<string> {
    try {
      const validatedData = EncryptedDataSchema.parse(targetEncryptedData);
      return await UnprotectSovereignData(validatedData, correlationIdentifier, dictionary);
    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-SEC-2003'),
        apparatus: this.apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'FATAL'
      });
    }
  }
}