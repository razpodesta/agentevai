/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestrator
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Performance Curatorship
 * @description Cérebro editorial que calcula a hierarquia do enxame de notícias.
 * Saneado contra TS2353 e radiação de números mágicos.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Parâmetros */
import {
  NewsRankingInputSchema,
  RankedArticleSchema,
  RelevanceScoreSchema,
  type IRankedArticle
} from './schemas/NewsRankingOrchestrator.schema.js';
import { SOVEREIGN_RANKING_PARAMETERS } from './constants/SovereignRankingParameters.js';

/**
 * @name OrchestrateNewsRanking
 * @function
 * @description Transmuta um pacote bruto de notícias em um feed hierarquizado por mérito.
 * 
 * @param {unknown} rawArticleBundle - Lista de candidatos para processamento.
 * @param {string} correlationIdentifier - UUID obrigatório para rastro forense.
 * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria semântica.
 * @returns {IRankedArticle[]} Lista de notícias rankeadas e seladas.
 */
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
    // 1. ADUANA DE ADN (Ingresso Seguro)
    const candidateArticles = NewsRankingInputSchema.parse(rawArticleBundle);

    // 2. ORQUESTRAÇÃO DE RANKING (Soberania Matemática)
    const rankedCollection = candidateArticles.map(candidateArticle => {
      const millisecondsSincePublished = Date.now() - new Date(candidateArticle.publishedAt).getTime();
      const hoursSincePublished = millisecondsSincePublished / (1000 * 60 * 60);

      /**
       * @formula Índice de Relevância Soberana (IRS)
       * (Apoio * Peso) + (Boost Blockchain) + (Peso Gravidade) - (Decaimento Temporal)
       */
      const rawRelevanceScore =
        (candidateArticle.supportCount * SOVEREIGN_RANKING_PARAMETERS.CITIZEN_SUPPORT_MULTIPLIER) +
        (candidateArticle.isBlockchainVerified ? SOVEREIGN_RANKING_PARAMETERS.BLOCKCHAIN_VERACITY_BOOST : 0) +
        (candidateArticle.severityWeight * SOVEREIGN_RANKING_PARAMETERS.IA_SEVERITY_WEIGHT_BASE) -
        (hoursSincePublished * SOVEREIGN_RANKING_PARAMETERS.HOURLY_DECAY_PENALTY);

      const validatedScore = RelevanceScoreSchema.parse(rawRelevanceScore);

      // 3. DETERMINAÇÃO DE SEÇÃO (Lógica de Patamares)
      let recommendedSection: IRankedArticle['recommendedSection'] = 'REGIONAL_PULSE';

      if (validatedScore > SOVEREIGN_RANKING_PARAMETERS.THRESHOLDS.NATIONAL_ZENITH) {
        recommendedSection = 'NATIONAL_ZENITH';
        SovereignLogger({
          severity: 'INFO',
          apparatus: apparatusName,
          operation: 'ZENITH_REACHED',
          message: translate('logZenithAssigned', { identifier: candidateArticle.identifier }),
          correlationIdentifier
        });
      } else if (candidateArticle.isBlockchainVerified && validatedScore > SOVEREIGN_RANKING_PARAMETERS.THRESHOLDS.INVESTIGATIVE_VAULT) {
        recommendedSection = 'INVESTIGATIVE_VAULT';
      }

      return RankedArticleSchema.parse({
        identifier: candidateArticle.identifier,
        rankingScore: validatedScore,
        recommendedSection
      });
    });

    // 4. ORDENAÇÃO DE ELITE (Maior IRS primeiro)
    const finalSortedRanking = [...rankedCollection].sort((alpha, beta) => beta.rankingScore - alpha.rankingScore);

    // 5. TELEMETRIA SOBERANA (CURA TS2353: correlationIdentifier)
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'RANKING_PROCESS_SEALED',
      message: translate('logRankingComplete', { count: finalSortedRanking.length }),
      correlationIdentifier,
      metadata: { 
        totalProcessed: finalSortedRanking.length,
        zenithCount: finalSortedRanking.filter(item => item.recommendedSection === 'NATIONAL_ZENITH').length
      }
    });

    return finalSortedRanking;

  } catch (caughtError) {
    // 6. CAPTURA FORENSE DE FALHA ALGORÍTMICA
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-ED-1001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Validar integridade dos timestamps de publicação e contadores de apoio popular.'
    });
  }
};