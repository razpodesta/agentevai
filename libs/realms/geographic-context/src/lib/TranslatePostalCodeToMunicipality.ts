/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslatePostalCodeToMunicipality
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance & Zero-Any
 * @description Transmuta um rastro postal (CEP) em um Município Soberano completo.
 * CURA TS4111: Implementada desestruturação imediata do rastro validado.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import {
  PostalCodeSchema,
  TransmuteTextToSlug
} from '@agentevai/types-common';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { BrazilApiPostalDriver } from '@agentevai/search-engine';

/** @section Sincronia de ADN Local */
import {
  TranslatePostalCodeResultSchema,
  type ITranslatePostalCodeResult
} from './schemas/TranslatePostalCodeToMunicipality.schema.js';

/**
 * @name TranslatePostalCodeToMunicipality
 * @function
 * @async
 * @description Converte CEP em contexto geográfico auditável com telemetria Zenith.
 */
export const TranslatePostalCodeToMunicipality = async (
  rawPostalCode: string,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): Promise<ITranslatePostalCodeResult> => {
  const apparatusName = 'TranslatePostalCodeToMunicipality';
  const fileLocation = 'libs/realms/geographic-context/src/lib/TranslatePostalCodeToMunicipality.ts';

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 1. HIGIENIZAÇÃO E ADUANA DE ENTRADA
    const numericPostalCode = rawPostalCode.replace(/\D/g, '');
    const validatedPostalCode = PostalCodeSchema.parse(numericPostalCode);

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'POSTAL_RESOLUTION_STARTED',
      message: translate('logResolutionStarted', { postalCode: validatedPostalCode }),
      correlationIdentifier
    });

    // 2. EXECUÇÃO VIA DRIVER DE INFRAESTRUTURA
    const postalLocationSnapshot = await BrazilApiPostalDriver.resolve(
      validatedPostalCode,
      correlationIdentifier
    );

    // 3. ORQUESTRAÇÃO DE RUTEAMENTO (Geração de Slug)
    const regionalSlug = TransmuteTextToSlug(postalLocationSnapshot.city);

    // 4. COMPOSIÇÃO E SELAGEM DE ADN
    const rawResult = {
      identifier: postalLocationSnapshot.ibgeCode,
      name: postalLocationSnapshot.city,
      stateCode: postalLocationSnapshot.stateCode,
      slug: regionalSlug
    };

    /**
     * @section CURA_TS4111
     * Realizamos o parse e desestruturamos IMEDIATAMENTE.
     * Isso converte o tipo branded em constantes nominais puras no escopo.
     */
    const validatedResult = TranslatePostalCodeResultSchema.parse(rawResult);
    const { identifier, name, stateCode, slug } = validatedResult;

    // 5. TELEMETRIA NEURAL SINCRO (Utilizando constantes locais resolvidas)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'POSTAL_RESOLUTION_SUCCESS',
      message: translate('logResolutionSuccess', { cityName: name }),
      correlationIdentifier,
      metadata: {
        municipalityIdentifier: identifier,
        regionalSlug: slug,
        territorialState: stateCode
      }
    });

    return validatedResult;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-GEO-4001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'MEDIUM',
      recoverySuggestion: 'Validar integridade da conexão com o driver BrasilAPI ou formato do rastro postal.'
    });
  }
};