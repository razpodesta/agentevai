/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TranslatePostalCodeToMunicipality
 * @version 2.1.0
 * @protocol OEDP-V5.5 - High Precision & Zero-Any
 * @description Transmuta um rastro postal (CEP) em um Município Soberano completo.
 * Implementa ruteamento dinâmico automático e resolve conflitos de importação de malha.
 * @policy ZERO-ANY: Saneamento total de tipos via aduana Zod.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica absoluta.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  PostalCodeSchema,
  TransmuteTextToSlug
} from '@agentevai/types-common';

/**
 * @section CORREÇÃO_TS2307
 * Alinhamento com o mapeamento de paths do tsconfig.base.json do Monorepo Nx.
 */
import { BrazilApiPostalDriver } from '@agentevai/search-engine';

// Importação dos contratos de ADN local
import {
  TranslatePostalCodeResultSchema,
  type ITranslatePostalCodeResult
} from './schemas/TranslatePostalCodeToMunicipality.schema.js';

/**
 * @name TranslatePostalCodeToMunicipality
 * @function
 * @async
 * @description Ponto de entrada de Reino para converter CEP em contexto geográfico auditável.
 *
 * @param {string} rawPostalCode - Texto bruto do código postal.
 * @param {string} correlationIdentifier - UUID para rastro forense.
 * @returns {Promise<ITranslatePostalCodeResult>} Município validado e pronto para ruteamento.
 */
export const TranslatePostalCodeToMunicipality = async (
  rawPostalCode: string,
  correlationIdentifier: string
): Promise<ITranslatePostalCodeResult> => {
  const apparatusName = 'TranslatePostalCodeToMunicipality';
  const fileLocation = 'libs/realms/geographic-context/src/lib/TranslatePostalCodeToMunicipality.ts';

  try {
    // 1. Higienização e Validação do Rastro Postal
    const numericPostalCode = rawPostalCode.replace(/\D/g, '');
    const validatedPostalCode = PostalCodeSchema.parse(numericPostalCode);

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'POSTAL_RESOLUTION_STARTED',
      message: `Iniciando tradução territorial para o CEP: ${validatedPostalCode}`,
      traceIdentifier: correlationIdentifier
    });

    // 2. Execução via Driver de Integração (Nivelado para number-branded)
    const postalLocationSnapshot = await BrazilApiPostalDriver.resolve(
      validatedPostalCode,
      correlationIdentifier
    );

    // 3. Orquestração de Ruteamento (Geração de Slug Soberano)
    const regionalSlug = TransmuteTextToSlug(postalLocationSnapshot.city);

    // 4. Composição e Mapeamento de ADN (Erradicação do 'as any')
    const translatedResult: ITranslatePostalCodeResult = TranslatePostalCodeResultSchema.parse({
      identifier: postalLocationSnapshot.ibgeCode,
      name: postalLocationSnapshot.city,
      stateCode: postalLocationSnapshot.stateCode,
      slug: regionalSlug
    });

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'POSTAL_RESOLUTION_SUCCESS',
      message: `CEP ${validatedPostalCode} transmutado para o slug: ${translatedResult.slug}`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        cityName: translatedResult.name,
        stateCode: translatedResult.stateCode
      }
    });

    return translatedResult;

  } catch (error) {
    /**
     * @section Protocolo de Falha Geográfica
     * Captura erros de formato ou de localização inexistente e transmuta para falha de Reino.
     */
    throw SovereignError.transmute(error, {
      code: 'OS-GEO-4001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'MEDIUM',
      recoverySuggestion: 'Verificar se o CEP informado pertence ao território brasileiro ativo.'
    });
  }
};
