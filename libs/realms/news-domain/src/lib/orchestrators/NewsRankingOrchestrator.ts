/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestrator
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Performance Curatorship
 * @description Cérebro editorial que ordena o enxame de notícias via IRS.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Atuadores */
import {
  NewsRankingInputSchema,
  RankedArticleSchema,
  type IRankedArticle
} from './schemas/NewsRankingOrchestrator.schema.js';
import { SOVEREIGN_RANKING_PARAMETERS } from './constants/SovereignRankingParameters.js';
import { CalculateSovereignRelevanceScore } from './handlers/CalculateSovereignRelevanceScore.js';

export const OrchestrateNewsRanking = (
  rawArticleBundle: unknown,
  correlationIdentifier: string,
  dictionary: ISovereignDictionary
): IRankedArticle[] => {
  const apparatusName = 'NewsRankingOrchestrator';
  const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/NewsRankingOrchestrator.ts';

  const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
    dictionary, apparatusName, key, variables, correlationIdentifier
  );

  try {
    // 1. ADUANA DE ADN (Ingresso Coletivo)
    const candidateCollection = NewsRankingInputSchema.parse(rawArticleBundle);

    // 2. PROCESSAMENTO DE ENXAME (Orquestração Atômica)
    const rankedCollection = candidateCollection.map(candidate => {
      const validatedScore = CalculateSovereignRelevanceScore(candidate);

      // 3. DETERMINAÇÃO DE SEÇÃO (Thresholds)
      let recommendedSection: IRankedArticle['recommendedSection'] = 'REGIONAL_PULSE';

      if (validatedScore > SOVEREIGN_RANKING_PARAMETERS.THRESHOLDS.NATIONAL_ZENITH) {
        recommendedSection = 'NATIONAL_ZENITH';
      } else if (candidate.isBlockchainVerified && validatedScore > SOVEREIGN_RANKING_PARAMETERS.THRESHOLDS.INVESTIGATIVE_VAULT) {
        recommendedSection = 'INVESTIGATIVE_VAULT';
      }

      return RankedArticleSchema.parse({
        identifier: candidate.identifier,
        rankingScore: validatedScore,
        recommendedSection
      });
    });

    // 4. ORDENAÇÃO POR MÉRITO MATEMÁTICO
    const finalSortedRanking = [...rankedCollection].sort((alpha, beta) => beta.rankingScore - alpha.rankingScore);

    // 5. TELEMETRIA SOBERANA
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'RANKING_CONSOLIDATED',
      message: translate('logRankingComplete', { count: finalSortedRanking.length }),
      correlationIdentifier,
      metadata: {
        topStory: finalSortedRanking[0]?.identifier,
        zenithCount: finalSortedRanking.filter(item => item.recommendedSection === 'NATIONAL_ZENITH').length
      }
    });

    return finalSortedRanking;

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ED-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH'
    });
  }
};
