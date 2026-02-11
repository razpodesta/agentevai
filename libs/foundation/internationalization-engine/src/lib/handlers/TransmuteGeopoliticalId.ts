/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalId
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance Geopolitical Logic
 * @description Motor atômico de conversão entre Locale, Country e Route.
 * Saneado contra TS2459 e TS2353. Garante a integridade da Trindade Geopolítica.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total via ADN Zod V4.
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
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from './SovereignTranslationEngine.js';
import { 
  TransmutationInputSchema 
} from '../schemas/TransmuteGeopoliticalId.schema.js';

/** 
 * @section Mapas de Soberania (O(1) Access) 
 * Mapeamentos imutáveis para garantir latência zero na borda.
 */
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
 * @class TransmuteGeopoliticalId
 * @description Central de inteligência para normalização de identificadores territoriais.
 */
export class TransmuteGeopoliticalId {
  private static readonly apparatusName = 'TransmuteGeopoliticalId';

  /**
   * @method routeToLocale
   * @description Transmuta um slug de rota URL (br) em um Locale BCP 47 (pt-BR).
   * 
   * @param {string} routeSlug - O fragmento de navegação da URL.
   * @param {string} correlationIdentifier - UUID de rastro forense.
   * @param {ISovereignDictionary} dictionary - Dicionário para logs de entropia.
   */
  public static routeToLocale(
    routeSlug: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): SovereignLocale {
    const validatedInput = TransmutationInputSchema.parse({ 
      rawInput: routeSlug, 
      correlationIdentifier 
    });

    const normalizedRoute = validatedInput.rawInput.toLowerCase();
    const resolvedLocale = ROUTE_TO_LOCALE_MAP[normalizedRoute];

    if (!resolvedLocale) {
      this.reportGeopoliticalEntropy('errorRouteNotMapped', normalizedRoute, correlationIdentifier, dictionary);
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
    const validatedInput = TransmutationInputSchema.parse({ 
      rawInput: sovereignLocale, 
      correlationIdentifier 
    });

    const resolvedCountry = LOCALE_TO_COUNTRY_MAP[validatedInput.rawInput];

    if (!resolvedCountry) {
      // Protocolo de Resiliência: Extração via sufixo ISO-3166
      const localeSegments = validatedInput.rawInput.split('-');
      
      if (localeSegments.length === 2) {
        const inferredCountryCode = localeSegments[1].toUpperCase();
        const validationResult = SovereignCountrySchema.safeParse(inferredCountryCode);
        
        if (validationResult.success) {
          return validationResult.data;
        }
      }

      this.reportGeopoliticalEntropy('errorLocaleCorrupted', validatedInput.rawInput, correlationIdentifier, dictionary);
      return SovereignCountrySchema.parse('BR');
    }

    return resolvedCountry;
  }

  /**
   * @method countryToRoute
   * @description Converte o Código do País (BR) em um slug de navegação (br).
   */
  public static countryToRoute(
    sovereignCountry: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): SovereignRoute {
    const validatedInput = TransmutationInputSchema.parse({ 
      rawInput: sovereignCountry, 
      correlationIdentifier 
    });

    const normalizedRouteSlug = validatedInput.rawInput.toLowerCase();
    const validationResult = SovereignRouteSchema.safeParse(normalizedRouteSlug);

    if (!validationResult.success) {
      this.reportGeopoliticalEntropy('errorRouteNotMapped', validatedInput.rawInput, correlationIdentifier, dictionary);
      return SovereignRouteSchema.parse('br');
    }

    return validationResult.data;
  }

  /**
   * @method reportGeopoliticalEntropy
   * @private
   * @description Registra falhas de mapeamento territorial no rastro forense.
   */
  private static reportGeopoliticalEntropy(
    semanticKey: string, 
    faultyInput: string, 
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): void {
    const semanticMessage = SovereignTranslationEngine.translate(
      dictionary, 
      this.apparatusName, 
      semanticKey, 
      { input: faultyInput }, 
      correlationIdentifier
    );

    SovereignLogger({
      severity: 'WARN',
      apparatus: this.apparatusName,
      operation: 'GEOPOLITICAL_ENTROPY_DETECTED',
      message: semanticMessage,
      correlationIdentifier, // Protocolo V6.0: Unificação de Rastro
      metadata: { 
        inputTrace: faultyInput, 
        apparatusVersion: '4.0.0' 
      }
    });
  }
}