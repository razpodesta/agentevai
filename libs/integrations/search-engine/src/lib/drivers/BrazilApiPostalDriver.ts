/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus BrazilApiPostalDriver
 * @version 2.0.0
 * @protocol OEDP-V5.5 - High Precision Integration
 * @description Driver de integração soberana com a infraestrutura da BrasilAPI para resolução de CEPs.
 * Realiza a transmutação de dados brutos externos para o ADN Branded do Agentevai.
 * @policy ZERO-ANY: Saneamento total de tipos.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza semântica absoluta.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  type PostalCode,
  type IPostalLocation,
  PostalLocationSchema
} from '@agentevai/types-common';

/**
 * @class BrazilApiPostalDriver
 * @description Handler de baixo nível para comunicação HTTP e normalização de rastro geográfico.
 */
export class BrazilApiPostalDriver {
  /**
   * @method resolve
   * @static
   * @description Consulta a infraestrutura externa e purifica o resultado contra o ADN de Foundation.
   *
   * @param {PostalCode} postalCode - Identificador postal validado (8 dígitos).
   * @param {string} correlationIdentifier - UUID para rastro forense e auditoria de latência.
   * @returns {Promise<IPostalLocation>} Localização selada e tipada.
   */
  public static async resolve(
    postalCode: PostalCode,
    correlationIdentifier: string
  ): Promise<IPostalLocation> {
    const apparatusName = 'BrazilApiPostalDriver';
    const endpointUrl = `https://brasilapi.com.br/api/cep/v2/${postalCode}`;

    try {
      /**
       * @section EXECUÇÃO_DE_REDE
       * O motor 'fetch' nativo do Node 22+ é superior para orquestração de cache.
       */
      const response = await fetch(endpointUrl);

      if (response.status === 404) {
        throw new Error('POSTAL_CODE_NOT_FOUND_IN_SOVEREIGN_DATABASE');
      }

      if (!response.ok) {
        throw new Error('EXTERNAL_INFRASTRUCTURE_LATENCY_OR_FAILURE');
      }

      const externalApiResponse = await response.json();

      /**
       * @section TRANSMUTAÇÃO_DE_ADN
       * Erradicação do 'as any': Transmutamos o IBGE string para number e mapeamos
       * as chaves para conformidade com o Manifesto 0018 e o novo PostalLocationSchema.
       */
      const mappedLocationData = {
        postalCode: postalCode,
        street: externalApiResponse.street || 'LOGRADOURO_NAO_IDENTIFICADO',
        neighborhood: externalApiResponse.neighborhood || 'BAIRRO_NAO_IDENTIFICADO',
        city: externalApiResponse.city,
        stateCode: externalApiResponse.state, // De stateAbbreviation para stateCode
        ibgeCode: Number(externalApiResponse.city_ibge), // Transmutação segura para number
        coordinates: externalApiResponse.location?.coordinates
      };

      /**
       * @section ADUANA_DE_SAÍDA
       * Validação final via Zod para garantir que nenhuma radiação técnica cruze o driver.
       */
      const validatedPostalLocation = PostalLocationSchema.parse(mappedLocationData);

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'POSTAL_RESOLUTION_SUCCESS',
        message: `Localização ancorada com sucesso via CEP: ${postalCode}`,
        traceIdentifier: correlationIdentifier,
        metadata: {
          city: validatedPostalLocation.city,
          state: validatedPostalLocation.stateCode
        }
      });

      return validatedPostalLocation;

    } catch (error) {
      /**
       * @section CAPTURA_FORENSE
       * Converte exceções de rede ou parsing em Diagnostic Packets para o AI-Neural-Auditor.
       */
      throw SovereignError.transmute(error, {
        code: 'OS-INT-3001',
        apparatus: apparatusName,
        location: 'libs/integrations/search-engine/src/lib/drivers/BrazilApiPostalDriver.ts',
        correlationIdentifier,
        severity: 'MEDIUM',
        recoverySuggestion: 'Verificar status da BrasilAPI ou integridade do rastro de rede do cliente.'
      });
    }
  }
}
