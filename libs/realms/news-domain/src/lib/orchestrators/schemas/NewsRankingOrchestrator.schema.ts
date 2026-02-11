/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestratorSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Mathematical Curatorship
 * @description ADN que define a soberania do ranking editorial.
 */

import { z } from 'zod';

/** @section Tipagem Nominal (Branded) */
export const RelevanceScoreSchema = z.number()
  .describe('Pontuação algorítmica de relevância editorial (IRS).')
  .brand<'RelevanceScore'>();

export type RelevanceScore = z.infer<typeof RelevanceScoreSchema>;

/**
 * @name RankingCandidateSchema
 * @description ADN individual de uma notícia para processamento de mérito.
 */
export const RankingCandidateSchema = z.object({
  identifier: z.uuid().describe('ID inalterável da notícia.'),
  supportCount: z.number().int().nonnegative().describe('Volume de assinaturas.'),
  isBlockchainVerified: z.boolean().describe('Sinalizador de fé pública digital.'),
  publishedAt: z.string().datetime().describe('Timestamp de ignição pública.'),
  severityWeight: z.number().min(1).max(10).default(1),
}).readonly();

export type IRankingCandidate = z.infer<typeof RankingCandidateSchema>;

/** @name RankedArticleSchema */
export const RankedArticleSchema = z.object({
  identifier: z.uuid(),
  rankingScore: RelevanceScoreSchema,
  recommendedSection: z.enum(['NATIONAL_ZENITH', 'REGIONAL_PULSE', 'INVESTIGATIVE_VAULT'])
}).readonly();

export type IRankedArticle = z.infer<typeof RankedArticleSchema>;

/** @name NewsRankingInputSchema */
export const NewsRankingInputSchema = z.array(RankingCandidateSchema).min(1).readonly();
