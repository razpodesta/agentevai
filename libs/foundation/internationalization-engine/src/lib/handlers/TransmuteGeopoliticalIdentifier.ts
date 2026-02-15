/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalIdentifier
 * @version 6.5.1
 * @protocol OEDP-V6.5 - High Performance Geopolitical Logic
 * @description Motor atômico de conversão entre Locale, Country e Route.
 * CURADO: Erradicado erro TS2307 (import fix), TS2353 e radiação 'any'.
 * @policy ZERO-ANY: Saneamento total via Apparatus Registry nominal.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
 */

import {
  type SovereignLocale,
  type SovereignCountry,
  type SovereignRoute,
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema
} from '@agentevai/types-common';
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
} from './SovereignTranslationEngine.js';

/** 
 * @section Sincronia de ADN 
 * CURA TS2307: Extensão corrigida para .js conforme Doutrina NodeNext.
 */
import { 
  TransmutationInputSchema 
} from '../schemas/TransmuteGeopoliticalIdentifier.schema.js';

const ROUTE_TO_LOCALE_MAP: Readonly<Record<string, SovereignLocale>> = Object.freeze({
  'br': 'pt-BR' as SovereignLocale,
  'es': 'es-ES' as SovereignLocale,
  'us': 'en-US' as SovereignLocale,
});

const LOCALE_TO_COUNTRY_MAP: Readonly<Record<string, SovereignCountry>> = Object.freeze({
  'pt-BR': 'BR' as SovereignCountry,
  'es-ES': 'ES' as SovereignCountry,
  'en-US': 'US' as SovereignCountry,
});

/**
 * @class TransmuteGeopoliticalIdentifier
 * @description Central de inteligência para normalização de identificadores nacionais.
 */
export class TransmuteGeopoliticalIdentifier {
  private static readonly apparatusName = 'TransmuteGeopoliticalIdentifier';
  private static readonly fileLocation = 'libs/foundation/internationalization-engine/src/lib/handlers/TransmuteGeopoliticalIdentifier.ts';

  /**
   * @method igniteRegistry
   * @private Realiza a selagem da identidade técnica no Cartório.
   */
  private static igniteRegistry(correlationIdentifier: string): void {
    SovereignApparatusRegistry.registerApparatus({
      identifier: ApparatusIdentifierSchema.parse(this.apparatusName),
      authorName: 'Raz Podestá',
      semanticVersion: '6.5.1',
      complexityTier: 'INTEGRATION_DRIVER',
      stabilityScore: StabilityScoreSchema.parse(100),
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, correlationIdentifier);
  }

  /**
   * @method routeToLocale
   * @description Transmuta um slug de rota URL (br) em um Locale BCP 47 (pt-BR).
   */
  public static routeToLocale(
    routeSlug: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): SovereignLocale {
    this.igniteRegistry(correlationIdentifier);
    
    const input = TransmutationInputSchema.parse({ 
      rawInputPayload: routeSlug, 
      correlationIdentifier 
    });

    const normalizedRoute = input.rawInputPayload.toLowerCase();
    const resolvedLocale = ROUTE_TO_LOCALE_MAP[normalizedRoute];

    if (!resolvedLocale) {
      this.reportEntropy('errorRouteNotMapped', normalizedRoute, correlationIdentifier, dictionary);
      return SovereignLocaleSchema.parse('pt-BR');
    }

    return resolvedLocale;
  }

  /**
   * @method localeToCountry
   * @description Extrai o código de Soberania Nacional (BR) de uma Identidade Cultural.
   */
  public static localeToCountry(
    sovereignLocale: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): SovereignCountry {
    this.igniteRegistry(correlationIdentifier);
    
    const input = TransmutationInputSchema.parse({ 
      rawInputPayload: sovereignLocale, 
      correlationIdentifier 
    });

    const resolvedCountry = LOCALE_TO_COUNTRY_MAP[input.rawInputPayload];

    if (!resolvedCountry) {
      const segments = input.rawInputPayload.split('-');
      if (segments.length === 2) {
        const inferred = SovereignCountrySchema.safeParse(segments[1].toUpperCase());
        if (inferred.success) return inferred.data;
      }

      this.reportEntropy('errorLocaleCorrupted', input.rawInputPayload, correlationIdentifier, dictionary);
      return SovereignCountrySchema.parse('BR');
    }

    return resolvedCountry;
  }

  /**
   * @method countryToRoute
   */
  public static countryToRoute(
    sovereignCountry: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): SovereignRoute {
    this.igniteRegistry(correlationIdentifier);

    const input = TransmutationInputSchema.parse({ 
      rawInputPayload: sovereignCountry, 
      correlationIdentifier 
    });

    const normalized = input.rawInputPayload.toLowerCase();
    const validated = SovereignRouteSchema.safeParse(normalized);

    if (!validated.success) {
      this.reportEntropy('errorRouteNotMapped', input.rawInputPayload, correlationIdentifier, dictionary);
      return SovereignRouteSchema.parse('br');
    }

    return validated.data;
  }

  /**
   * @method reportEntropy
   * @private
   */
  private static reportEntropy(
    semanticKey: string, 
    faultyInput: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): void {
    const apparatusIdentifier = ApparatusIdentifierSchema.parse(this.apparatusName);
    const fingerprint = SovereignApparatusRegistry.getApparatusFingerprint(apparatusIdentifier);
    
    const message = SovereignTranslationEngine.translate(
      dictionary, this.apparatusName, semanticKey, { input: faultyInput }, correlationIdentifier
    );

    SovereignLogger({
      severity: 'WARN',
      apparatus: this.apparatusName,
      operation: 'GEOPOLITICAL_ENTROPY',
      message: `[${fingerprint}] ${message}`,
      correlationIdentifier,
      metadata: { inputTrace: faultyInput }
    });

    throw SovereignError.transmute(new Error(message), {
      code: SovereignErrorCodeSchema.parse('OS-INTL-4002'),
      apparatus: this.apparatusName,
      location: this.fileLocation,
      correlationIdentifier,
      severity: 'LOW'
    });
  }
}