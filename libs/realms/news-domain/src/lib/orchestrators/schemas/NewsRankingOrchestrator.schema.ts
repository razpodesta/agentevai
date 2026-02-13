/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsRankingOrchestrator.schema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN mestre para curadoria matemática. Sincronizado para Zod V4.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded) 
 * Impede que números comuns vazem para o Índice de Relevância Soberana.
 */
export const RelevanceScoreSchema = z.number()
  .describe('Índice de Relevância Soberana (IRS) - Mérito editorial calculado.')
  .brand<'RelevanceScore'>();

export type RelevanceScore = z.infer<typeof RelevanceScoreSchema>;

/**
 * @name RankingCandidateBaseSchema
 * @description Estrutura fundamental para itens elegíveis ao ranking.
 */
export const RankingCandidateBaseSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da notícia no cofre.'),
  
  supportCount: z.number().int().nonnegative()
    .describe('Volume total de assinaturas de apoio popular.'),
  
  isBlockchainVerified: z.boolean()
    .describe('Sinalizador de imutabilidade matemática garantida.'),
  
  publishedAt: z.string().datetime()
    .describe('Timestamp de ignição do fato no enxame público.'),
  
  severityWeight: z.number().min(1).max(10).default(1)
    .describe('Peso de urgência atribuído pela perícia neural (1-10).'),
});

/** @name RankedArticleSchema */
export const RankedArticleSchema = z.object({
  identifier: z.uuid(),
  rankingScore: RelevanceScoreSchema,
  recommendedSection: z.enum(['NATIONAL_ZENITH', 'REGIONAL_PULSE', 'INVESTIGATIVE_VAULT'])
})
.brand<'RankedArticle'>()
.readonly();

/** 
 * @name NewsRankingInputSchema 
 * @section Selagem Nominal Zenith
 */
export const NewsRankingInputSchema = z.array(RankingCandidateBaseSchema)
  .min(1)
  .brand<'NewsRankingInput'>()
  .readonly();

export type IRankingCandidate = z.infer<typeof RankingCandidateBaseSchema>;
export type IRankedArticle = z.infer<typeof RankedArticleSchema>;
export type INewsRankingInput = z.infer<typeof NewsRankingInputSchema>;