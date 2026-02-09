/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestratorSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Mathematical Curatorship
 * @description ADN que define os critérios de entrada e saída para o motor de ranking.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const RelevanceScoreSchema = z.number()
  .describe('Pontuação algorítmica de relevância editorial.')
  .brand<'RelevanceScore'>();

export type RelevanceScore = z.infer<typeof RelevanceScoreSchema>;

/**
 * @name NewsRankingInputSchema
 * @description Contrato de entrada para os candidatos ao feed.
 */
export const NewsRankingInputSchema = z.array(z.object({
  identifier: z.uuid(),
  supportCount: z.number().int().nonnegative(),
  isBlockchainVerified: z.boolean(),
  publishedAt: z.string().datetime(),
  severityWeight: z.number().min(1).max(10).default(1),
})).min(1).readonly();

export type INewsRankingInput = z.infer<typeof NewsRankingInputSchema>;

/**
 * @name RankedArticleSchema
 * @description ADN de saída contendo a recomendação de seção.
 */
export const RankedArticleSchema = z.object({
  identifier: z.uuid(),
  rankingScore: RelevanceScoreSchema,
  recommendedSection: z.enum(['NATIONAL_ZENITH', 'REGIONAL_PULSE', 'INVESTIGATIVE_VAULT'])
}).readonly();

export type IRankedArticle = z.infer<typeof RankedArticleSchema>;
