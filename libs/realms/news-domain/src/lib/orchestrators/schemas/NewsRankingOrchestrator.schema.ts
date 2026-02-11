/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestratorSchema
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Mathematical Curatorship
 * @description ADN que define os critérios de entrada e saída para o motor de ranking.
 */

import { z } from 'zod';

export const RelevanceScoreSchema = z.number()
  .describe('Pontuação algorítmica de relevância editorial (IRS).')
  .brand<'RelevanceScore'>();

export type RelevanceScore = z.infer<typeof RelevanceScoreSchema>;

/**
 * @name RankedArticleSchema
 * @description ADN de saída contendo a recomendação de posicionamento.
 */
export const RankedArticleSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável do rastro de notícia.'),
  
  rankingScore: RelevanceScoreSchema,
  
  recommendedSection: z.enum(['NATIONAL_ZENITH', 'REGIONAL_PULSE', 'INVESTIGATIVE_VAULT'])
    .describe('Seção editorial sugerida baseada no impacto calculado.')
}).readonly();

export type IRankedArticle = z.infer<typeof RankedArticleSchema>;

/**
 * @name NewsRankingInputSchema
 * @description Aduana para o enxame de artigos candidatos ao feed.
 */
export const NewsRankingInputSchema = z.array(z.object({
  identifier: z.uuid(),
  supportCount: z.number().int().nonnegative(),
  isBlockchainVerified: z.boolean(),
  publishedAt: z.string().datetime(),
  severityWeight: z.number().min(1).max(10).default(1),
})).min(1).readonly();

export type INewsRankingInput = z.infer<typeof NewsRankingInputSchema>;