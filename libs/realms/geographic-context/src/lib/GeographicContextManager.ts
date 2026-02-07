/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GeographicContextManager
 * @version 2.1.0
 * @description Gerenciador de inteligência geográfica brasileira.
 * Transmuta Dados Abertos do IBGE (gov.br) no ADN estrutural do ecossistema.
 * @protocol OEDP-V5.5 - Standard MetaShark
 */

import { z } from 'zod';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import { RegionSlugSchema } from '@agentevai/sovereign-context';
import {
  BrazilianMunicipalitySchema,
  IBrazilianMunicipality,
  IbgeCodeSchema
} from './schemas/GeographicRegion.schema';

/**
 * @section Aduana Externa (IBGE Payload Schema)
 * Define o que esperamos da API oficial governamental brasileira.
 */
const IbgeExternalPayloadSchema = z.object({
  id: z.number().describe('ID numérico oficial do município no IBGE.'),
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
 * @description Purifica e transmuta dados brutos governamentais aplicando branding de tipos.
 *
 * @param {unknown} rawPayload - JSON bruto vindo da API do IBGE.
 * @param {string} correlationIdentifier - Identificador único da jornada para rastro forense.
 * @returns {IBrazilianMunicipality} Dados da cidade purificados e "carimbados".
 */
export const TransmuteIbgeToMunicipality = (
  rawPayload: unknown,
  correlationIdentifier: string
): IBrazilianMunicipality => {
  const apparatusName = 'GeographicContextManager';
  const fileLocation = 'libs/realms/geographic-context/src/lib/GeographicContextManager.ts';

  try {
    // 1. Validação da Fonte Externa (Contrato IBGE)
    const externalData = IbgeExternalPayloadSchema.parse(rawPayload);

    // 2. Normalização de Slug (Soberania Linguística)
    const normalizedSlugString = externalData.nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // 3. Composição e Branding (Erradicação de 'any')
    // Utilizamos os Schemas para "carimbar" os tipos primitivos com suas Brands oficiais.
    const municipality: IBrazilianMunicipality = {
      identifier: IbgeCodeSchema.parse(externalData.id),
      name: externalData.nome.trim(),
      slug: RegionSlugSchema.parse(normalizedSlugString),
      stateAbbreviation: externalData.microrregiao.mesorregiao.UF.sigla,
    };

    // 4. Validação de Integridade Final (ADN Agentevai)
    const validatedMunicipality = BrazilianMunicipalitySchema.parse(municipality);

    // 5. Telemetria de Inteligência Territorial
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TERRITORIAL_TRANSMUTATION',
      message: `Município processado: ${validatedMunicipality.name} (${validatedMunicipality.stateAbbreviation})`,
      traceIdentifier: correlationIdentifier,
      metadata: { ibgeIdentifier: validatedMunicipality.identifier }
    });

    return validatedMunicipality;

  } catch (error) {
    /**
     * @section Resiliência de Erro
     * Transmuta falhas de validação ou rede no rastro diagnóstico da IA.
     */
    throw new SovereignError({
      uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-GEO-1001'),
      i18nMappingKey: 'GEOGRAPHIC_DATA_CORRUPTION',
      severity: 'HIGH',
      apparatusMetadata: {
        name: apparatusName,
        version: '2.1.0',
        fileLocation
      },
      runtimeSnapshot: {
        inputPayload: rawPayload,
        correlationIdentifier,
        validationIssues: error instanceof z.ZodError ? error.issues : undefined
      },
      forensicTrace: {
        timestamp: new Date().toISOString(),
        stack: error instanceof Error ? error.stack || 'ST_UNAVAILABLE' : 'NON_ERROR_THROWN'
      },
      recoverySuggestion: 'A API do IBGE pode ter alterado o contrato ou o payload de entrada é nulo/inválido.'
    });
  }
};
