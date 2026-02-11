/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchor
 * @version 5.0.0
 * @protocol OEDP-V6.0 - High Precision Orchestration
 * @description Ponto de controle mestre para determinação de soberania territorial.
 * Pulverizado: Consome ExecuteExternalGeographicLookup para I/O.
 * @policy ZERO-ANY: Saneamento total via ADN nominal.
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

/** @section Handlers Atômicos */
import { ExecuteExternalGeographicLookup } from './ExecuteExternalGeographicLookup.js';

/**
 * @name LookupTerritorialAnchor
 * @function
 * @async
 * @description Determina a localização baseada no IP com fallback de soberania nacional.
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

  // 1. ADUANA DE ENTRADA (Validando rastro técnico)
  LookupTerritorialAnchorInputSchema.parse({ internetProtocolAddress, correlationIdentifier });

  const certifySovereignty = (data: object) => BrazilianMunicipalityBaseSchema.partial().parse(data);

  // 2. PROTOCOLO LOCALHOST (Ambiente Controlado)
  if (internetProtocolAddress === '::1' || internetProtocolAddress === '127.0.0.1') {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'LOCAL_ANCHOR_IGNITED',
      message: translate('logLocalAnchor'),
      correlationIdentifier
    });

    return certifySovereignty({
      name: 'Nacional (Localhost)',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }

  try {
    // 3. EXECUÇÃO DE I/O ATÔMICO
    const externalSnapshot = await ExecuteExternalGeographicLookup(internetProtocolAddress);

    // 4. DETECÇÃO DE SOBERANIA INTERNACIONAL
    if (externalSnapshot.country_code !== 'BR') {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'EXTERNAL_NATION_DETECTED',
        message: translate('logExternalNation', { countryCode: externalSnapshot.country_code }),
        correlationIdentifier
      });

      return certifySovereignty({
        name: externalSnapshot.country_name || 'International',
        stateCode: BrazilianStateCodeSchema.parse('EX'),
        countryCode: SovereignCountrySchema.parse(externalSnapshot.country_code || 'US'),
        slug: RegionSlugSchema.parse('global')
      });
    }

    // 5. ANCORAGEM NACIONAL (Brasil)
    return certifySovereignty({
      name: externalSnapshot.city ?? 'Localidade Desconhecida',
      stateCode: BrazilianStateCodeSchema.parse(externalSnapshot.region_code ?? 'BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
    });

  } catch (caughtError) {
    // 6. PROTOCOLO DE RESILIÊNCIA NEURAL
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

    return certifySovereignty({
      name: 'Brasil',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }
};