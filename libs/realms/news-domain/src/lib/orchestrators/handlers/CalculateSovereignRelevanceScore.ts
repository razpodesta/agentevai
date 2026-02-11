/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateSovereignRelevanceScore
 * @protocol OEDP-V6.0 - Atomic Calculus
 * @description Unidade atômica que processa o Índice de Relevância Soberana (IRS).
 */

import {
  type IRankingCandidate,
  RelevanceScoreSchema,
  type RelevanceScore
} from '../schemas/NewsRankingOrchestrator.schema.js';
import { SOVEREIGN_RANKING_PARAMETERS } from '../constants/SovereignRankingParameters.js';

export const CalculateSovereignRelevanceScore = (
  candidate: IRankingCandidate
): RelevanceScore => {
  const millisecondsSinceIgnition = Date.now() - new Date(candidate.publishedAt).getTime();
  const hoursSinceIgnition = millisecondsSinceIgnition / (1000 * 60 * 60);

  /**
   * @formula IRS = (Apoio * Multiplicador) + (Boost_Fé_Pública) + (Gravidade * Base) - (Decaimento * Horas)
   */
  const scoreCalculus =
    (candidate.supportCount * SOVEREIGN_RANKING_PARAMETERS.CITIZEN_SUPPORT_MULTIPLIER) +
    (candidate.isBlockchainVerified ? SOVEREIGN_RANKING_PARAMETERS.BLOCKCHAIN_VERACITY_BOOST : 0) +
    (candidate.severityWeight * SOVEREIGN_RANKING_PARAMETERS.IA_SEVERITY_WEIGHT_BASE) -
    (hoursSinceIgnition * SOVEREIGN_RANKING_PARAMETERS.HOURLY_DECAY_PENALTY);

  return RelevanceScoreSchema.parse(scoreCalculus);
};
