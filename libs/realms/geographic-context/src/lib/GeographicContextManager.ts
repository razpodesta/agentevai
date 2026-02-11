/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManager
 * @version 4.1.0
 * @protocol OEDP-V6.0 - Forensic Sovereignty
 * @description Orquestrador de inteligência geográfica brasileira.
 * CURA TS2305: Realinhamento de importação do TransmuteTextToSlug para a types-common.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
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

/** 
 * @section Sincronia de Borda (Cura de Roteamento)
 * TransmuteTextToSlug é um alicerce de tipos comuns.
 */
import { 
  TransmuteTextToSlug 
} from '@agentevai/types-common';

import { 
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section ADN Local e Aduana */
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
 * @description Transmuta o rastro bruto do IBGE no ADN estrutural Agentevai.
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
    // 1. ADUANA DE BORDA (Purificação via ADN Zod)
    const externalSnapshot = IbgeMunicipalityAduanaSchema.parse(rawPayload);

    // 2. ORQUESTRAÇÃO DE TRANSMUTAÇÃO (Consumo correto do alicerce types-common)
    const generatedSlug = TransmuteTextToSlug(externalSnapshot.name);
    
    if (!generatedSlug) {
      throw new Error('SLUG_GENERATION_COLLAPSE');
    }

    /**
     * @section Composição de Snapshot Territorial
     */
    const municipalitySnapshot = {
      identifier: IbgeCodeSchema.parse(externalSnapshot.identifier),
      name: externalSnapshot.name.trim(),
      slug: RegionSlugSchema.parse(generatedSlug),
      stateCode: BrazilianStateCodeSchema.parse(externalSnapshot.stateAbbreviation),
      countryCode: SovereignCountrySchema.parse('BR')
    };

    // 3. SELAGEM FINAL (Imutabilidade)
    const validatedMunicipality = BrazilianMunicipalitySchema.parse(municipalitySnapshot);

    // 4. TELEMETRIA SOBERANA
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TERRITORIAL_TRANSMUTATION_COMPLETE',
      message: translate('logTransmutationSuccess', { 
        name: validatedMunicipality.name, 
        stateCode: validatedMunicipality.stateCode 
      }),
      correlationIdentifier,
      metadata: {
        ibgeIdentifier: validatedMunicipality.identifier,
        regionalSlug: validatedMunicipality.slug
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