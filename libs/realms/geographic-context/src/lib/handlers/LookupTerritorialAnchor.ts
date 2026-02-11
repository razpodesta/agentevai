/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchor
 * @version 4.1.0
 * @protocol OEDP-V6.0 - Forensic Precision & Edge Compatibility
 * @description Ponto de controle mestre para determinação de soberania territorial.
 * CURA TS2769: Implementada interface de extensão para compatibilidade com Next.js Fetch.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { 
  SovereignCountrySchema, 
  RegionSlugSchema 
} from '@agentevai/sovereign-context';

/** @section Sincronia de ADN Local */
import {
  BrazilianMunicipalityBaseSchema,
  BrazilianStateCodeSchema,
  type IBrazilianMunicipality
} from '../schemas/GeographicRegion.schema.js';
import { LookupTerritorialAnchorInputSchema } from '../schemas/LookupTerritorialAnchor.schema.js';

/**
 * @interface INextFetchRequestInit
 * @description Ponte de Soberania para suportar extensões do Next.js em bibliotecas puras.
 */
interface INextFetchRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * @name LookupTerritorialAnchor
 * @function
 * @async
 * @description Determina a localização geográfica baseada no IP com fallback resiliente.
 */
export const LookupTerritorialAnchor = async (
  internetProtocolAddress: string,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): Promise<Partial<IBrazilianMunicipality>> => {
  const apparatusName = 'LookupTerritorialAnchor';
  const fileLocation = 'libs/realms/geographic-context/src/lib/handlers/LookupTerritorialAnchor.ts';

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  // 1. ADUANA DE ENTRADA
  LookupTerritorialAnchorInputSchema.parse({
    internetProtocolAddress,
    correlationIdentifier
  });

  const certify = (data: object) => BrazilianMunicipalityBaseSchema.partial().parse(data);

  // 2. PROTOCOLO LOCALHOST
  if (internetProtocolAddress === '::1' || internetProtocolAddress === '127.0.0.1') {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'LOCAL_ANCHOR_IGNITED',
      message: translate('logLocalAnchor'),
      correlationIdentifier
    });

    return certify({
      name: 'Nacional (Localhost)',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }

  try {
    /** 
     * @section INFRAESTRUTURA_EXTERNA
     * CURA TS2769: Casting controlado para interface extendida.
     * Isso preserva o rastro de tipos e habilita o cache ISR (Incremental Static Regeneration).
     */
    const requestOptions: INextFetchRequestInit = {
      next: { revalidate: 86400 } // Cache de 24 horas no território
    };

    const response = await fetch(
      `https://ipapi.co/${internetProtocolAddress}/json/`, 
      requestOptions
    );

    if (!response.ok) throw new Error('EXTERNAL_GEO_PROVIDER_UNAVAILABLE');

    const externalData = await response.json();

    // 3. DETECÇÃO DE SOBERANIA NACIONAL
    if (externalData.country_code !== 'BR') {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'EXTERNAL_NATION_DETECTED',
        message: translate('logExternalNation', { countryCode: externalData.country_code }),
        correlationIdentifier
      });

      return certify({
        name: externalData.country_name || 'International',
        stateCode: BrazilianStateCodeSchema.parse('EX'),
        countryCode: SovereignCountrySchema.parse(externalData.country_code || 'US'),
        slug: RegionSlugSchema.parse('global')
      });
    }

    return certify({
      name: externalData.city ?? 'Localidade Desconhecida',
      stateCode: BrazilianStateCodeSchema.parse(externalData.region_code ?? 'BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
    });

  } catch (caughtError) {
    const diagnostic = SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GEO-5001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH'
    });

    SovereignLogger({
      severity: 'ERROR',
      apparatus: apparatusName,
      operation: 'GEO_LOOKUP_FALLBACK',
      message: translate('logFallbackActive'),
      correlationIdentifier,
      metadata: { diagnosticReport: diagnostic.getDiagnosticReport() }
    });

    return certify({
      name: 'Brasil',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }
};