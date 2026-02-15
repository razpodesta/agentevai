/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchor
 * @version 6.6.0
 * @protocol OEDP-V6.5 - High Precision IP Anchor
 * @description Resolve a localização baseada no IP com resiliência militar.
 * CURADO: Erradicada radiação técnica e implementado rastro IAL2 selado.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { 
  SovereignCountrySchema, 
  RegionSlugSchema 
} from '@agentevai/sovereign-context';
import { TransmuteTextToSlug } from '@agentevai/types-common';

/** @section Sincronia de ADN Local */
import { BrazilianStateCodeSchema } from '../schemas/GeographicRegion.schema.js';
import { 
  TerritorialAnchorOutputSchema, 
  type ITerritorialAnchorOutput 
} from '../schemas/LookupTerritorialAnchor.schema.js';

/**
 * @name LookupTerritorialAnchor
 * @function
 * @async
 * @description Sonda a infraestrutura de rede para ancorar a consciência do sistema.
 */
export const LookupTerritorialAnchor = async (
  internetProtocolAddress: string,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): Promise<ITerritorialAnchorOutput> => {
  const apparatusName = 'LookupTerritorialAnchor';
  const fileLocation = 'libs/realms/geographic-context/src/lib/handlers/LookupTerritorialAnchor.ts';
  
  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  // 1. PROTOCOLO DE DESENVOLVIMENTO (Localhost Shield)
  const isLocalHost = internetProtocolAddress === '::1' || internetProtocolAddress === '127.0.0.1';
  if (isLocalHost) {
    return TerritorialAnchorOutputSchema.parse({
      territoryName: 'Brasil (Sede)',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      regionalSlug: RegionSlugSchema.parse('nacional'),
      internetProtocolAddress,
      isExternalSovereignty: false
    });
  }

  try {
    // 2. EXECUÇÃO COM TIMEOUT MILITAR (Resiliência de Borda)
    const controller = new AbortController();
    const timeoutIdentifier = setTimeout(() => controller.abort(), 2500);

    const infrastructureResponse = await fetch(`https://ipapi.co/${internetProtocolAddress}/json/`, {
      signal: controller.signal,
      next: { revalidate: 86400 } // Cache soberano de 24h
    });

    clearTimeout(timeoutIdentifier);

    if (!infrastructureResponse.ok) throw new Error('EXTERNAL_GEO_API_COLLAPSE');

    const rawTrace = await infrastructureResponse.json();

    // 3. TRANSMUTAÇÃO E SELAGEM
    const isBrazil = rawTrace.country_code === 'BR';
    const city = rawTrace.city || 'Brasil';
    
    return TerritorialAnchorOutputSchema.parse({
      territoryName: isBrazil ? city : rawTrace.country_name,
      stateCode: BrazilianStateCodeSchema.parse(isBrazil ? rawTrace.region_code : 'EX'),
      countryCode: SovereignCountrySchema.parse(rawTrace.country_code || 'US'),
      regionalSlug: RegionSlugSchema.parse(isBrazil ? TransmuteTextToSlug(city) : 'global'),
      internetProtocolAddress,
      isExternalSovereignty: !isBrazil
    });

  } catch (caughtError) {
    // 4. PROTOCOLO DE FALLBACK SOBERANO
    SovereignLogger({
      severity: 'ERROR',
      apparatus: apparatusName,
      operation: 'IP_LOOKUP_FAILURE',
      message: translate('logFallbackActive'),
      correlationIdentifier
    });

    return TerritorialAnchorOutputSchema.parse({
      territoryName: 'Brasil',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      regionalSlug: RegionSlugSchema.parse('nacional'),
      internetProtocolAddress,
      isExternalSovereignty: false
    });
  }
};