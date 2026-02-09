/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManager
 * @version 3.0.0
 * @protocol OEDP-V5.5 - High Precision & Territorial Sovereignty
 * @description Orquestrador de inteligência geográfica brasileira.
 * Refatorado para Responsabilidade Única (SRP): Delega formatação e valida ADN Soberano.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 */

import { z } from 'zod';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  RegionSlugSchema,
  SovereignCountrySchema
} from '@agentevai/sovereign-context';

/**
 * @section Injeção de Foundation
 * Consumo do aparato atômico para erradicação de lógica redundante.
 */
import { TransmuteTextToSlug } from '@agentevai/types-common';

import {
  BrazilianMunicipalitySchema,
  IbgeCodeSchema,
  BrazilianStateCodeSchema,
  type IBrazilianMunicipality
} from './schemas/GeographicRegion.schema.js';

/**
 * @section Aduana de Entrada (Contrato Externo IBGE)
 * Define a estrutura bruta esperada da API governamental para purificação.
 */
const IbgeExternalPayloadSchema = z.object({
  id: z.number().describe('ID numérico original do IBGE.'),
  nome: z.string().describe('Nome por extenso da localidade.'),
  microrregiao: z.object({
    mesorregiao: z.object({
      UF: z.object({
        sigla: z.string().length(2).describe('Sigla da Unidade Federativa.')
      })
    })
  })
}).readonly();

/**
 * @name TransmuteIbgeToMunicipality
 * @function
 * @description Transmuta o payload volátil do IBGE no ADN estrutural Agentevai com precisão de milissegundos.
 *
 * @param {unknown} rawPayload - JSON bruto da API do IBGE.
 * @param {string} correlationIdentifier - UUID para rastro forense e correlação de logs.
 * @returns {IBrazilianMunicipality} Dados da cidade purificados, tipados e selados.
 */
export const TransmuteIbgeToMunicipality = (
  rawPayload: unknown,
  correlationIdentifier: string
): IBrazilianMunicipality => {
  const startTimestamp = performance.now();
  const apparatusName = 'GeographicContextManager';
  const fileLocation = 'libs/realms/geographic-context/src/lib/GeographicContextManager.ts';

  try {
    // 1. Validação de Integridade da Fonte (Aduana IBGE)
    const externalData = IbgeExternalPayloadSchema.parse(rawPayload);

    // 2. Orquestração de Transmutação (Delegação para Foundation)
    // Erradicamos a lógica de regex interna para garantir consistência global de URLs.
    const generatedSlug = TransmuteTextToSlug(externalData.nome);

    /**
     * @section Composição de Snapshot Territorial
     * Mapeamento estrito para o ADN SovereignCountry (Manifesto 0018).
     */
    const municipalitySnapshot = {
      identifier: IbgeCodeSchema.parse(externalData.id),
      name: externalData.nome.trim(),
      slug: RegionSlugSchema.parse(generatedSlug),
      stateCode: BrazilianStateCodeSchema.parse(externalData.microrregiao.mesorregiao.UF.sigla),
      countryCode: SovereignCountrySchema.parse('BR')
    };

    // 3. Selagem e Validação de ADN Final (Status PERFECT)
    const validatedMunicipality = BrazilianMunicipalitySchema.parse(municipalitySnapshot);

    // 4. Telemetria de Performance e Sucesso
    const endTimestamp = performance.now();
    const transmutationLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TERRITORIAL_IGNITION_SUCCESS',
      message: `Consciência geográfica estabelecida para ${validatedMunicipality.name} [${validatedMunicipality.stateCode}].`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        latencyInMilliseconds: transmutationLatency,
        ibgeIdentifier: validatedMunicipality.identifier,
        regionalSlug: validatedMunicipality.slug
      }
    });

    return validatedMunicipality;

  } catch (error) {
    /**
     * @section Protocolo de Resiliência
     * Falhas na transmutação geográfica são impeditivos para o ruteamento dinâmico.
     */
    throw SovereignError.transmute(error, {
      code: 'OS-GEO-1001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Verificar se o contrato da API do IBGE sofreu mutação estrutural.'
    });
  }
};
