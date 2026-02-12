/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchor
 * @version 6.1.0
 * @protocol OEDP-V6.0 - High Precision Orchestration
 * @description Ponto de controle mestre para determinação de soberania territorial.
 * CURA TS2554: Sincronização de rastro forense com ExecuteExternalGeographicLookup.
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

/** @section Sincronia de ADN Local */
import { BrazilianStateCodeSchema } from '../schemas/GeographicRegion.schema.js';
import { 
  LookupTerritorialAnchorInputSchema, 
  TerritorialAnchorResultSchema,
  type ITerritorialAnchorResult 
} from '../schemas/LookupTerritorialAnchor.schema.js';

/** @section Handlers Atômicos */
import { ExecuteExternalGeographicLookup } from './ExecuteExternalGeographicLookup.js';

/**
 * @name LookupTerritorialAnchor
 * @function
 * @async
 * @description Determina a localização baseada no IP com fallback de soberania nacional automática.
 */
export const LookupTerritorialAnchor = async (
  internetProtocolAddress: string,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): Promise<ITerritorialAnchorResult> => {
  const apparatusName = 'LookupTerritorialAnchor';
  const fileLocation = 'libs/realms/geographic-context/src/lib/handlers/LookupTerritorialAnchor.ts';

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  // 1. ADUANA DE ENTRADA (Validando rastro técnico)
  LookupTerritorialAnchorInputSchema.parse({ 
    internetProtocolAddress, 
    correlationIdentifier 
  });

  // 2. PROTOCOLO LOCALHOST (Ambiente de Desenvolvimento)
  if (internetProtocolAddress === '::1' || internetProtocolAddress === '127.0.0.1') {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'LOCAL_ANCHOR_IGNITED',
      message: translate('logLocalAnchor'),
      correlationIdentifier
    });

    return TerritorialAnchorResultSchema.parse({
      name: 'Nacional (Localhost)',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }

  try {
    // 3. EXECUÇÃO DE I/O ATÔMICO (CURA TS2554: Injeção de Rastro)
    const externalSnapshot = await ExecuteExternalGeographicLookup(
      internetProtocolAddress,
      correlationIdentifier
    );

    // 4. DETECÇÃO DE SOBERANIA INTERNACIONAL (Fronteira Externa)
    if (externalSnapshot.country_code !== 'BR') {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'EXTERNAL_NATION_DETECTED',
        message: translate('logExternalNation', { 
          countryCode: externalSnapshot.country_code || 'EX' 
        }),
        correlationIdentifier
      });

      return TerritorialAnchorResultSchema.parse({
        name: externalSnapshot.country_name || 'International',
        stateCode: BrazilianStateCodeSchema.parse('EX'),
        countryCode: SovereignCountrySchema.parse(externalSnapshot.country_code || 'US'),
        slug: RegionSlugSchema.parse('global')
      });
    }

    // 5. ANCORAGEM NACIONAL (Brasil)
    return TerritorialAnchorResultSchema.parse({
      name: externalSnapshot.city || 'Brasil',
      city: externalSnapshot.city,
      stateCode: BrazilianStateCodeSchema.parse(externalSnapshot.region_code || 'BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
    });

  } catch (caughtError) {
    // 6. PROTOCOLO DE RESILIÊNCIA NEURAL (Cura de Colapso)
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

    return TerritorialAnchorResultSchema.parse({
      name: 'Brasil',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }
};