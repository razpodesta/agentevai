/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus LookupTerritorialAnchor
 * @version 3.0.1
 * @protocol OEDP-V5.5 - High Precision & Neural Resilience
 * @description Ponto de controle para determinar a soberania territorial do visitante.
 * Refatorado: Resolução de erro TS2339 (partial em readonly) e limpeza de rastro técnico.
 * @policy ZERO-ANY: Saneamento total de tipos e mapeamento de severidade determinístico.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza semântica absoluta.
 */

import { SovereignLogger, type ISovereignLog } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  SovereignCountrySchema,
  RegionSlugSchema
} from '@agentevai/sovereign-context';

import {
  BrazilianMunicipalityBaseSchema, // ADN Base para permitir transformações parciais
  BrazilianStateCodeSchema,
  type IBrazilianMunicipality
} from '../schemas/GeographicRegion.schema.js';

// ADN de Entrada para validação de rastro técnico
import { LookupTerritorialAnchorInputSchema } from '../schemas/LookupTerritorialAnchor.schema.js';

/**
 * @name LookupTerritorialAnchor
 * @function
 * @async
 * @description Determina a localização geográfica baseada no IP com fallback resiliente.
 *
 * @param {string} internetProtocolAddress - Endereço IP bruto da requisição.
 * @param {string} correlationIdentifier - UUID para rastro forense e correlação de logs.
 * @returns {Promise<Partial<IBrazilianMunicipality>>} Snapshot territorial selado.
 */
export const LookupTerritorialAnchor = async (
  internetProtocolAddress: string,
  correlationIdentifier: string
): Promise<Partial<IBrazilianMunicipality>> => {
  const apparatusName = 'LookupTerritorialAnchor';
  const fileLocation = 'libs/realms/geographic-context/src/lib/handlers/LookupTerritorialAnchor.ts';

  /**
   * @section ADUANA_DE_ENTRADA
   * Sincronia Zod v4: Valida o rastro técnico antes da orquestração.
   */
  const validatedInput = LookupTerritorialAnchorInputSchema.parse({
    internetProtocolAddress,
    correlationIdentifier
  });

  const { internetProtocolAddress: clientInternetProtocol } = validatedInput;

  /**
   * @method certify
   * @private
   * @section CORREÇÃO_TS2339
   * Utilizamos a BaseSchema para permitir .partial() antes da selagem imutável.
   */
  const certify = (data: unknown) => BrazilianMunicipalityBaseSchema.partial().parse(data);

  // 1. PROTOCOLO DE DESENVOLVIMENTO (Localhost Shield)
  if (clientInternetProtocol === '::1' || clientInternetProtocol === '127.0.0.1') {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'LOCAL_ANCHOR_IGNITED',
      message: 'Ambiente local detectado. Ignificando rastro Nacional.',
      traceIdentifier: correlationIdentifier
    });

    return certify({
      name: 'Nacional (Localhost)',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }

  const timeoutController = new AbortController();
  const timeoutTrigger = setTimeout(() => timeoutController.abort(), 1800);

  try {
    const response = await fetch(`https://ipapi.co/${clientInternetProtocol}/json/`, {
      signal: timeoutController.signal
    });

    clearTimeout(timeoutTrigger);
    if (!response.ok) throw new Error('EXTERNAL_GEO_SERVICE_UNAVAILABLE');

    const externalData = await response.json();

    // 2. DETECÇÃO DE SOBERANIA ESTRANGEIRA (Fronteira Geopolítica)
    if (externalData.country_code !== 'BR') {
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'EXTERNAL_NATION_DETECTED',
        message: `Acesso externo detectado: ${externalData.country_code}.`,
        traceIdentifier: correlationIdentifier
      });

      return certify({
        name: externalData.country_name || 'International',
        stateCode: BrazilianStateCodeSchema.parse('EX'),
        countryCode: SovereignCountrySchema.parse(externalData.country_code || 'US'),
        slug: RegionSlugSchema.parse('global')
      });
    }

    // 3. ANCORAGEM NACIONAL CERTIFICADA (Brasil)
    return certify({
      name: externalData.city ?? 'Localidade Desconhecida',
      stateCode: BrazilianStateCodeSchema.parse(externalData.region_code ?? 'BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
    });

  } catch (error: unknown) {
    /**
     * @section PROTOCOLO_DE_RESILIÊNCIA
     * Em caso de falha na infraestrutura externa, o sistema ancora na Soberania Nacional.
     */
    const diagnosticError = SovereignError.transmute(error, {
      code: 'OS-GEO-5001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH'
    });

    /** @section MAPEAMENTO_DE_SEVERIDADE (Zero Any) */
    const severityMap: Record<string, ISovereignLog['severity']> = {
      HIGH: 'ERROR',
      CRITICAL: 'CRITICAL',
      MEDIUM: 'WARN',
      LOW: 'INFO'
    };

    SovereignLogger({
      severity: severityMap[diagnosticError.packet.severity] ?? 'ERROR',
      apparatus: apparatusName,
      operation: 'GEO_LOOKUP_FALLBACK',
      message: `Ativando resiliência nacional: ${diagnosticError.message}`,
      traceIdentifier: correlationIdentifier,
      metadata: {
        clientInternetProtocol,
        diagnosticReport: diagnosticError.getDiagnosticReport()
      }
    });

    return certify({
      name: 'Brasil',
      stateCode: BrazilianStateCodeSchema.parse('BR'),
      countryCode: SovereignCountrySchema.parse('BR'),
      slug: RegionSlugSchema.parse('nacional')
    });
  }
};
