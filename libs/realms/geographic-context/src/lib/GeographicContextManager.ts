/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManager
 * @version 5.0.0
 * @protocol OEDP-V6.0 - Forensic Sovereignty
 * @description Orquestrador de inteligência geográfica.
 * CURA TS4111: Implementada desestruturação imediata do rastro validado.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  RegionSlugSchema, 
  SovereignCountrySchema 
} from '@agentevai/sovereign-context';
import { TransmuteTextToSlug } from '@agentevai/types-common';
import { 
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Local */
import {
  BrazilianMunicipalitySchema,
  IbgeCodeSchema,
  BrazilianStateCodeSchema,
  type IBrazilianMunicipality
} from './schemas/GeographicRegion.schema.js';
import { IbgeMunicipalityAduanaSchema } from './schemas/GeographicContextManager.schema.js';

/**
 * @name TransmuteIbgeToMunicipality
 * @function
 * @description Transmuta o rastro bruto do IBGE no ADN estrutural Agentevai com Zero Entropia.
 */
export const TransmuteIbgeToMunicipality = (
  rawPayload: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): IBrazilianMunicipality => {
  const apparatusName = 'GeographicContextManager';
  const fileLocation = 'libs/realms/geographic-context/src/lib/GeographicContextManager.ts';

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 1. ADUANA DE BORDA (Purificação de Rastro Externo)
    const externalSnapshot = IbgeMunicipalityAduanaSchema.parse(rawPayload);

    // 2. GERAÇÃO DE RASTRO DE RUTEAMENTO
    const generatedSlug = TransmuteTextToSlug(externalSnapshot.name);
    
    if (!generatedSlug) {
      throw new Error('SLUG_GENERATION_COLLAPSE');
    }

    // 3. COMPOSIÇÃO DE SNAPSHOT TERRITORIAL
    const municipalityData = {
      identifier: IbgeCodeSchema.parse(externalSnapshot.identifier),
      name: externalSnapshot.name.trim(),
      slug: RegionSlugSchema.parse(generatedSlug),
      stateCode: BrazilianStateCodeSchema.parse(externalSnapshot.stateAbbreviation),
      countryCode: SovereignCountrySchema.parse('BR')
    };

    /**
     * @section CURA_TS4111
     * Realizamos o parse e desestruturamos IMEDIATAMENTE.
     * Isso extrai constantes nominais puras, ignorando assinaturas de índice do brand.
     */
    const validatedMunicipality = BrazilianMunicipalitySchema.parse(municipalityData);
    const { identifier, name, slug, stateCode } = validatedMunicipality;

    // 4. TELEMETRIA SOBERANA (Utilizando constantes locais resolvidas)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TERRITORIAL_TRANSMUTATION_COMPLETE',
      message: translate('logTransmutationSuccess', { name, stateCode }),
      correlationIdentifier,
      metadata: {
        ibgeIdentifier: identifier,
        regionalSlug: slug,
        territorialName: name
      }
    });

    return validatedMunicipality;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GEO-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
};