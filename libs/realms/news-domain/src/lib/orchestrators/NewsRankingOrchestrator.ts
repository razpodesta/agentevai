/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestrator
 * @version 6.5.0
 * @protocol OEDP-V6.5 - High Performance Curatorship
 * @description Cérebro editorial que ordena o enxame de notícias via IRS.
 * Saneado: Implementada medição de performance Zenith e Resiliência Forense.
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

/** @section Sincronia de ADN e Atuadores */
import {
  NewsRankingInputSchema,
  RankedArticleSchema,
  type IRankedArticle,
} from './schemas/NewsRankingOrchestrator.schema.js';
import { SOVEREIGN_RANKING_PARAMETERS } from './constants/SovereignRankingParameters.js';
import { CalculateSovereignRelevanceScore } from './handlers/CalculateSovereignRelevanceScore.js';

/**
 * @name OrchestrateNewsRanking
 * @function
 * @description Transmuta uma coleção bruta de notícias em um feed hierarquizado por mérito.
 *
 * @param {unknown} properties - Coleção de candidatos a serem auditados pelo motor.
 * @param {string} correlationIdentifier - UUID inalterável da jornada forense.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria.
 * @returns {IRankedArticle[]} Lista ordenada por IRS (Índice de Relevância Soberana).
 */
export const OrchestrateNewsRanking = (
  properties: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): IRankedArticle[] => {
  const apparatusName = 'NewsRankingOrchestrator';
  const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/NewsRankingOrchestrator.ts';
  const startTimestamp = performance.now();

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 1. ADUANA DE ADN (Ingresso Coletivo Seguro)
    const candidates = NewsRankingInputSchema.parse(properties);

    // 2. PROCESSAMENTO DE ENXAME (Orquestração de Mérito)
    const rankedCollection = candidates.map((candidate) => {
  

      const validatedScore = CalculateSovereignRelevanceScore(candidate);


      // 3. DETERMINAÇÃO DE SEÇÃO (Thresholds Zenitais)
      let recommendedSection: IRankedArticle['recommendedSection'] = 'REGIONAL_PULSE';

      if (validatedScore > SOVEREIGN_RANKING_PARAMETERS.THRESHOLDS.NATIONAL_ZENITH) {
        recommendedSection = 'NATIONAL_ZENITH';
        SovereignLogger({
          severity: 'INFO',
          apparatus: apparatusName,
          operation: 'ZENITH_ASCENSION_DETECTED',
          message: translate('logZenithAssigned', { identifier: candidate.identifier }),
          correlationIdentifier
        });
      } else if (candidate.isBlockchainVerified && validatedScore > SOVEREIGN_RANKING_PARAMETERS.THRESHOLDS.INVESTIGATIVE_VAULT) {
        recommendedSection = 'INVESTIGATIVE_VAULT';
      }

      return RankedArticleSchema.parse({
        identifier: candidate.identifier,
        rankingScore: validatedScore,
        recommendedSection
      });
    });

    // 4. ORDENAÇÃO POR MÉRITO MATEMÁTICO (Sort Imutável)
    const finalSortedRanking = [...rankedCollection].sort((alpha, beta) => beta.rankingScore - alpha.rankingScore);

    // 5. TELEMETRIA ZENITH E PERFORMANCE
    const endTimestamp = performance.now();
    const totalLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'RANKING_CONSOLIDATED',
      message: translate('logRankingComplete', { count: finalSortedRanking.length }),
      correlationIdentifier,
      metadata: {
        totalLatencyMs: totalLatency,
        itemCount: finalSortedRanking.length,
        topRelevance: finalSortedRanking[0]?.rankingScore
      }
    });

    return finalSortedRanking;

  } catch (caughtError) {
    // 6. RESILIÊNCIA FORENSE (Cura de Colapso Algorítmico)
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ED-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Validar a integridade dos timestamps publishedAt e a presença de supportCount negativo na coleção.'
    });
  }
};
