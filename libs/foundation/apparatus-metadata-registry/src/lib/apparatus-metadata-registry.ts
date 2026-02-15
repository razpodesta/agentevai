/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignApparatusRegistry
 * @version 1.0.0
 * @protocol OEDP-V6.5 - High Performance Infrastructure
 * @description Singleton inalterável que mantém o inventário técnico do ecossistema.
 * Erradica o anonimato de rastro e permite auditoria de versão em tempo real.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  ApparatusTechnicalPassportSchema, 
  type IApparatusTechnicalPassport,
  type ApparatusIdentifier 
} from './schemas/ApparatusRegistry.schema.js';

/**
 * @class SovereignApparatusRegistry
 * @description Repositório volátil de metadados técnicos.
 */
export class SovereignApparatusRegistry {
  private static readonly apparatusName = 'SovereignApparatusRegistry';
  private static readonly fileLocation = 'libs/foundation/apparatus-metadata-registry/src/lib/apparatus-metadata-registry.ts';
  
  /** @section Búnquer de Memória */
  private static readonly inventory = new Map<string, IApparatusTechnicalPassport>();

  /**
   * @method registerApparatus
   * @description Sela a identidade de um novo Lego no cartório.
   */
  public static registerApparatus(
    passportInput: unknown,
    correlationIdentifier: string
  ): void {
    try {
      // 1. ADUANA DE ADN
      const validatedPassport = ApparatusTechnicalPassportSchema.parse(passportInput);
      const { identifier } = validatedPassport;

      // 2. SELAGEM NO INVENTÁRIO
      this.inventory.set(identifier as unknown as string, validatedPassport);

      // 3. TELEMETRIA DE REGISTRO
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'LEGO_IDENTITY_SEALED',
        message: `Aparato [${identifier}] registrado com sucesso na versão ${validatedPassport.semanticVersion}.`,
        correlationIdentifier,
        metadata: { 
          author: validatedPassport.authorName,
          tier: validatedPassport.complexityTier 
        }
      });

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-CORE-4001'),
        apparatus: this.apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'CRITICAL'
      });
    }
  }

  /**
   * @method getApparatusFingerprint
   * @description Recupera o rastro de versão para injeção em logs de auditoria.
   */
  public static getApparatusFingerprint(identifier: ApparatusIdentifier): string {
    const passport = this.inventory.get(identifier as unknown as string);
    if (!passport) return `UNKNOWN-V0.0.0`;
    
    return `${passport.identifier}-V${passport.semanticVersion}`;
  }

  /**
   * @method getTechnicalInventory
   * @description Exporta o snapshot completo para o Auditor Neural.
   */
  public static getTechnicalInventory(): IApparatusTechnicalPassport[] {
    return Array.from(this.inventory.values());
  }
}