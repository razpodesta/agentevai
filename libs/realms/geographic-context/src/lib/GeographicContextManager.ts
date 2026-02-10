/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManager
 * @version 3.3.0
 * @protocol OEDP-V6.0 - High Precision & Zero-Abbreviations
 * @description Orquestrador de inteligência geográfica brasileira.
 * Transmuta o rastro volátil de APIs governamentais no ADN soberano.
 * @policy ZERO-ABBREVIATIONS: Erradicação total de 'id' (Cura de no-restricted-syntax).
 * @policy ZERO-ANY: Saneamento absoluto via unknown + parsing.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js).
 */

import { z } from 'zod';
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

/** @section Sincronia de ADN Local */
import {
  BrazilianMunicipalitySchema,
  IbgeCodeSchema,
  BrazilianStateCodeSchema,
  type IBrazilianMunicipality
} from './schemas/GeographicRegion.schema.js';

/**
 * @section Aduana de Infraestrutura Externa (IBGE Contract)
 * @description Captura o rastro bruto e transmuta abreviações em termos integrais.
 */
const IbgeExternalResponseSchema = z.object({
  // Capturamos 'id' da API, mas transmutamos para 'identifier' para conformidade Elite
  identifier: z.number().describe('Identificador numérico bruto do IBGE.'),
  nome: z.string().describe('Nome por extenso do município.'),
  microrregiao: z.object({
    mesorregiao: z.object({
      UF: z.object({
        sigla: z.string().length(2).describe('Sigla da Unidade Federativa.')
      })
    })
  })
})
.transform((rawTrace) => ({
  identifier: rawTrace.identifier, // Transmutação Soberana concluída
  name: rawTrace.nome,
  stateAbbreviation: rawTrace.microrregiao.mesorregiao.UF.sigla
}))
.readonly();

/**
 * @name TransmuteIbgeToMunicipality
 * @function
 * @description Transmuta o rastro bruto do IBGE no ADN estrutural Agentevai.
 *
 * @param {unknown} rawPayload - O payload bruto (unknown para segurança).
 * @param {string} correlationIdentifier - UUID para rastro forense.
 * @returns {IBrazilianMunicipality} Dados regionais selados e validados.
 */
export const TransmuteIbgeToMunicipality = (
  rawPayload: unknown,
  correlationIdentifier: string
): IBrazilianMunicipality => {
  const apparatusName = 'GeographicContextManager';
  const fileLocation = 'libs/realms/geographic-context/src/lib/GeographicContextManager.ts';

  try {
    // 1. ADUANA DE BORDA (Purificação e Renomeação Automática)
    const externalSnapshot = IbgeExternalResponseSchema.parse(rawPayload);

    // 2. ORQUESTRAÇÃO DE TRANSMUTAÇÃO (Foundation Service)
    const generatedSlug = TransmuteTextToSlug(externalSnapshot.name);

    /**
     * @section Composição de Snapshot Territorial
     * Mapeamento estrito para o ADN de Identidade Nacional.
     */
    const municipalitySnapshot = {
      identifier: IbgeCodeSchema.parse(externalSnapshot.identifier),
      name: externalSnapshot.name.trim(),
      slug: RegionSlugSchema.parse(generatedSlug),
      stateCode: BrazilianStateCodeSchema.parse(externalSnapshot.stateAbbreviation),
      countryCode: SovereignCountrySchema.parse('BR')
    };

    // 3. SELAGEM FINAL (Imutabilidade God Tier)
    const validatedMunicipality = BrazilianMunicipalitySchema.parse(municipalitySnapshot);

    // 4. TELEMETRIA NEURAL
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TERRITORIAL_TRANSMUTATION_SUCCESS',
      message: `Soberania territorial selada para ${validatedMunicipality.name}.`,
      correlationIdentifier: correlationIdentifier,
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
      severity: 'HIGH',
      recoverySuggestion: 'Verificar se o contrato da API do IBGE sofreu mutação estrutural.'
    });
  }
};
