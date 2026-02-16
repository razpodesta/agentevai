/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EntityMetadataRegistry
 * @version 6.6.0
 * @protocol OEDP-V6.5 - High Performance B2B
 * @description Guardião do rastro institucional. Vincula o território à autoridade legal.
 * CURADO: Implementada busca de jurisdição O(1) e registro no Cartório Técnico.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignApparatusRegistry, 
  ApparatusIdentifierSchema, 
  StabilityScoreSchema 
} from '@agentevai/apparatus-metadata-registry';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { type H3Index } from '@agentevai/types-common';

/** @section Sincronia de ADN Local */
import { 
  SovereignEntitySchema, 
  type ISovereignEntity,
  type EntityIdentifier 
} from './schemas/EntityMetadataRegistry.schema.js';

export class EntityMetadataRegistry {
  private static readonly apparatusName = 'EntityMetadataRegistry';
  private static readonly fileLocation = 'libs/realms/governance-domain/src/lib/EntityMetadataRegistry/EntityMetadataRegistry.ts';
  
  /** @section Memória_Inalterável_de_Jurisdição */
  private static readonly jurisdictionMap = new Map<H3Index, EntityIdentifier>();

  /**
   * @method registerInstitutionalEntity
   * @async
   * @description Sela uma nova instituição no búnquer de governança e indexa sua jurisdição.
   */
  public static async registerInstitutionalEntity(
    rawParameters: unknown,
    dictionary: ISovereignDictionary
  ): Promise<ISovereignEntity> {
    const startTimestamp = performance.now();

    try {
      // 1. ADUANA DE ADN (Ingresso Seguro)
      const validatedEntity = SovereignEntitySchema.parse(rawParameters);
      const { correlationIdentifier, identifier, legalName, jurisdictionHexagons } = validatedEntity;

      // 2. REGISTRO TÉCNICO (Pilar I - SSOT)
      SovereignApparatusRegistry.registerApparatus({
        identifier: ApparatusIdentifierSchema.parse(this.apparatusName),
        authorName: 'Raz Podestá',
        semanticVersion: '6.6.0',
        complexityTier: 'REALM_LOGIC',
        stabilityScore: StabilityScoreSchema.parse(100),
        isSealedForProduction: true,
        registeredAt: new Date().toISOString()
      }, correlationIdentifier);

      const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
        dictionary, this.apparatusName, key, variables, correlationIdentifier
      );

      // 3. INDEXAÇÃO GEOESPACIAL (Mira o Dor Logic)
      // Mapeia cada hexágono à entidade para busca instantânea.
      jurisdictionHexagons.forEach(hex => {
        this.jurisdictionMap.set(hex, identifier);
      });

      const executionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));

      // 4. TELEMETRIA ZENITH
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ENTITY_SEALED',
        message: translate('logEntityRegistered', { name: legalName }),
        correlationIdentifier,
        latencyInMilliseconds: executionLatency,
        metadata: { 
          entityIdentifier: identifier, 
          hexCount: jurisdictionHexagons.length 
        }
      });

      return validatedEntity;

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-GOV-3001'),
        apparatus: this.apparatusName,
        location: this.fileLocation,
        correlationIdentifier: (rawParameters as any)?.correlationIdentifier || crypto.randomUUID(),
        severity: 'CRITICAL'
      });
    }
  }

  /**
   * @method findResponsibleEntityByH3Cell
   * @description Localiza a autoridade responsável por um hexágono específico em O(1).
   */
  public static findResponsibleEntityByH3Cell(
    h3IndexIdentifier: H3Index
  ): EntityIdentifier | null {
    return this.jurisdictionMap.get(h3IndexIdentifier) || null;
  }
}