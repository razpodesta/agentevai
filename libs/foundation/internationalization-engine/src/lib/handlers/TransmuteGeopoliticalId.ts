/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TransmuteGeopoliticalId
 * @version 1.2.0
 * @protocol OEDP-V5.5 - High Performance & Neural Resilience
 * @description Motor de conversão estrita entre as dimensões da Trindade Geopolítica.
 * Implementa a lógica de transmutação entre Locales (Cultura), Países (Nação) e Rotas (Navegação).
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
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

/**
 * @section Mapas de Soberania (Estáticos)
 * Definidos fora da classe para otimização de memória e acesso em tempo constante O(1).
 */
const ROUTE_TO_LOCALE_MAP: Record<string, SovereignLocale> = {
  'br': 'pt-BR' as SovereignLocale,
  'es': 'es-ES' as SovereignLocale,
  'us': 'en-US' as SovereignLocale,
};

const LOCALE_TO_COUNTRY_MAP: Record<string, SovereignCountry> = {
  'pt-BR': 'BR' as SovereignCountry,
  'es-ES': 'ES' as SovereignCountry,
  'en-US': 'US' as SovereignCountry,
};

/**
 * @class TransmuteGeopoliticalId
 * @description Handler de elite para orquestração de IDs geopolíticos.
 */
export class TransmuteGeopoliticalId {

  /**
   * @method routeToLocale
   * @description Transmuta um slug de rota (ex: 'br') para um Locale BCP 47.
   * @param {string} route - O slug extraído da URL.
   * @returns {SovereignLocale} Identidade cultural validada.
   */
  public static routeToLocale(route: string): SovereignLocale {
    const normalizedRoute = route.toLowerCase();
    const resolvedLocale = ROUTE_TO_LOCALE_MAP[normalizedRoute];

    if (!resolvedLocale) {
      this.reportInconsistency('ROUTE_NOT_MAPPED', { route });
      return SovereignLocaleSchema.parse('pt-BR'); // Fallback Soberano
    }

    return resolvedLocale;
  }

  /**
   * @method localeToCountry
   * @description Extrai a Soberania Nacional de um Locale.
   * @param {SovereignLocale} locale - Identidade cultural.
   * @returns {SovereignCountry} Código ISO do país em caixa alta.
   */
  public static localeToCountry(locale: string): SovereignCountry {
    const resolvedCountry = LOCALE_TO_COUNTRY_MAP[locale];

    if (!resolvedCountry) {
      // Caso não esteja no mapa, tenta inferência via split (Resiliência)
      const parts = locale.split('-');
      if (parts.length === 2) {
        return SovereignCountrySchema.parse(parts[1].toUpperCase());
      }

      this.reportInconsistency('LOCALE_CORRUPTED', { locale });
      return SovereignCountrySchema.parse('BR'); // Fallback Nacional
    }

    return resolvedCountry;
  }

  /**
   * @method countryToRoute
   * @description Converte a Soberania Nacional em um slug de navegação.
   * @param {SovereignCountry} country - Identificador da Nação.
   * @returns {SovereignRoute} Slug de ruteamento em caixa baixa.
   */
  public static countryToRoute(country: string): SovereignRoute {
    const route = country.toLowerCase();

    // Validação de ADN antes de retornar
    const validation = SovereignRouteSchema.safeParse(route);

    if (!validation.success) {
      this.reportInconsistency('COUNTRY_CODE_INVALID', { country });
      return SovereignRouteSchema.parse('br');
    }

    return validation.data;
  }

  /**
   * @method reportInconsistency
   * @private
   * @description Notifica o sistema sobre dados geopolíticos fora do padrão.
   */
  private static reportInconsistency(errorType: string, metadata: object): void {
    SovereignLogger({
      severity: 'WARN',
      apparatus: 'TransmuteGeopoliticalId',
      operation: 'GEOPOLITICAL_ENTROPY',
      message: `Inconsistência detectada: ${errorType}`,
      metadata
    });
  }
}
