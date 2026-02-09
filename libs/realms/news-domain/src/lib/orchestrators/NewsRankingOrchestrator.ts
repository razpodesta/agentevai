/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestrator
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Performance Logic
 * @description Cérebro editorial que calcula a hierarquia das notícias.
 * Implementa o algoritmo de Decaimento Temporal e Bônus de Fé Pública.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em clareza técnica absoluta.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import {
  NewsRankingInputSchema,
  RankedArticleSchema,
  type INewsRankingInput,
  type IRankedArticle,
  type RelevanceScore
} from './schemas/NewsRankingOrchestrator.schema.js';

/**
 * @section Constantes de Soberania Matemática
 */
const BLOCKCHAIN_VERACITY_BOOST = 500; // Peso da verdade inalterável
const SUPPORT_WEIGHT_MULTIPLIER = 5;    // Peso da voz do cidadão
const HOURLY_DECAY_PENALTY = 10;        // Perda de relevância por hora

/**
 * @name OrchestrateNewsRanking
 * @function
 * @description Transmuta uma lista bruta de notícias em um feed hierarquizado.
 */
export const OrchestrateNewsRanking = (
  rawNewsList: unknown,
  correlationIdentifier: string
): IRankedArticle[] => {
  const apparatusName = 'NewsRankingOrchestrator';
  const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/NewsRankingOrchestrator.ts';

  try {
    // 1. Aduana de ADN
    const newsItems = NewsRankingInputSchema.parse(rawNewsList);

    // 2. Processamento de Ranking (IRS - Índice de Relevância Soberana)
    const rankedResults = newsItems.map(item => {
      const hoursSincePublished = (Date.now() - new Date(item.publishedAt).getTime()) / (1000 * 60 * 60);

      // Algoritmo: (Apoio * Peso) + (Selo Blockchain) + (Gravidade) - (Decaimento)
      const calculatedScore =
        (item.supportCount * SUPPORT_WEIGHT_MULTIPLIER) +
        (item.isBlockchainVerified ? BLOCKCHAIN_VERACITY_BOOST : 0) +
        (item.severityWeight * 20) -
        (hoursSincePublished * HOURLY_DECAY_PENALTY);

      // 3. Recomendação de Seção baseada em Patamares (Thresholds)
      let section: IRankedArticle['recommendedSection'] = 'REGIONAL_PULSE';
      if (calculatedScore > 1000) section = 'NATIONAL_ZENITH';
      else if (item.isBlockchainVerified && calculatedScore > 500) section = 'INVESTIGATIVE_VAULT';

      return RankedArticleSchema.parse({
        identifier: item.identifier,
        rankingScore: calculatedScore,
        recommendedSection: section
      });
    });

    // 4. Ordenação Final (Maior Score Primeiro)
    const sortedRanking = [...rankedResults].sort((a, b) => b.rankingScore - a.rankingScore);

    // 5. Telemetria Editorial
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'RANKING_CONSOLIDATED',
      message: `Ranking processado para ${sortedRanking.length} itens. Destaque: ${sortedRanking[0].identifier}`,
      traceIdentifier: correlationIdentifier
    });

    return sortedRanking;

  } catch (error) {
    throw SovereignError.transmute(error, {
      code: 'OS-ED-1001',
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Falha no algoritmo de ranking. Verificar integridade dos timestamps e contadores de apoio.'
    });
  }
};
