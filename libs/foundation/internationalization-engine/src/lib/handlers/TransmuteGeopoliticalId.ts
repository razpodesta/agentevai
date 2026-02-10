/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalId
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - High Performance Geopolitical Logic
 * @description Motor atômico de conversão entre Locale, Country e Route.
 * Erradica falhas de indexação e garante a integridade da Trindade Geopolítica.
 * @policy ZERO-ANY: Saneamento total via ADN Zod.
 * @policy ESM-STRICT: Extensões .js obrigatórias.
 */

import {
  SovereignLocale,
  SovereignCountry,
  SovereignRoute,
  SovereignLocaleSchema,
  SovereignCountrySchema,
  SovereignRouteSchema
} from '@agentevai/types-common';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { TransmutationInputSchema } from '../schemas/TransmuteGeopoliticalId.schema.js';

/**
 * @section Mapas de Soberania (O(1) Access)
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
 * @description Central de inteligência para normalização de identificadores nacionais.
 */
export class TransmuteGeopoliticalId {
  private static readonly apparatusName = 'TransmuteGeopoliticalId';

  /**
   * @method routeToLocale
   * @description Transmuta um slug de rota URL em um Locale BCP 47 validado.
   */
  public static routeToLocale(routeSlug: string, correlationIdentifier: string): SovereignLocale {
    const input = TransmutationInputSchema.parse({ rawInput: routeSlug, correlationIdentifier });
    const normalizedRoute = input.rawInput.toLowerCase();
    const resolvedLocale = ROUTE_TO_LOCALE_MAP[normalizedRoute];

    if (!resolvedLocale) {
      this.reportEntropy('errorRouteNotMapped', normalizedRoute, correlationIdentifier);
      return SovereignLocaleSchema.parse('pt-BR');
    }

    return resolvedLocale;
  }

  /**
   * @method localeToCountry
   * @description Extrai a Soberania Nacional de uma Identidade Cultural.
   */
  public static localeToCountry(sovereignLocale: string, correlationIdentifier: string): SovereignCountry {
    const input = TransmutationInputSchema.parse({ rawInput: sovereignLocale, correlationIdentifier });
    const resolvedCountry = LOCALE_TO_COUNTRY_MAP[input.rawInput];

    if (!resolvedCountry) {
      // Resiliência: Tentativa de extração por sufixo ISO
      const parts = input.rawInput.split('-');
      if (parts.length === 2) {
        const inferredCountry = parts[1].toUpperCase();
        const validation = SovereignCountrySchema.safeParse(inferredCountry);
        if (validation.success) return validation.data;
      }

      this.reportEntropy('errorLocaleCorrupted', input.rawInput, correlationIdentifier);
      return SovereignCountrySchema.parse('BR');
    }

    return resolvedCountry;
  }

  /**
   * @method countryToRoute
   * @description Converte o Código do País em um slug de navegação amigável.
   */
  public static countryToRoute(sovereignCountry: string, correlationIdentifier: string): SovereignRoute {
    const input = TransmutationInputSchema.parse({ rawInput: sovereignCountry, correlationIdentifier });
    const normalizedRoute = input.rawInput.toLowerCase();

    const validation = SovereignRouteSchema.safeParse(normalizedRoute);

    if (!validation.success) {
      this.reportEntropy('errorRouteNotMapped', input.rawInput, correlationIdentifier);
      return SovereignRouteSchema.parse('br');
    }

    return validation.data;
  }

  /**
   * @method reportEntropy
   * @private
   * @description Registra falhas de mapeamento com metadados estritos.
   * Resolve o Erro TS2322 garantindo rastro técnico Record<string, unknown>.
   */
  private static reportEntropy(key: string, input: string, correlationIdentifier: string): void {
    const forensicMetadata: Record<string, unknown> = {
      faultyInput: input,
      apparatusVersion: '2.0.0'
    };

    SovereignLogger({
      severity: 'WARN',
      apparatus: this.apparatusName,
      operation: 'GEOPOLITICAL_ENTROPY',
      message: `Falha na transmutação: ${key} para a entrada ${input}`,
      traceIdentifier: correlationIdentifier,
      metadata: forensicMetadata
    });
  }
}
