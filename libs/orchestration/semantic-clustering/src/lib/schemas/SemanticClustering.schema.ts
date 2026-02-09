/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SemanticClusteringSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Neural Intelligence
 * @description ADN para o motor de detecção de duplicidade semântica.
 */

import { z } from 'zod';

/**
 * @name ClusteringVerdictSchema
 * @description O resultado da análise de similaridade.
 */
export const ClusteringVerdictSchema = z.object({
  isDuplicate: z.boolean()
    .describe('Sinaliza se a denúncia candidata é semânticamente idêntica a uma existente.'),

  targetClusterIdentifier: z.uuid().optional()
    .describe('O identificador da denúncia original (âncora) para unificação.'),

  similarityConfidence: z.number().min(0).max(1)
    .describe('Nível de certeza da IA sobre o agrupamento (0.0 a 1.0).'),

  suggestedAction: z.enum(['CREATE_NEW', 'MERGE_INTO_EXISTING', 'REQUIRE_HUMAN_REVIEW'])
    .describe('Ação recomendada para o braço de persistência.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type IClusteringVerdict = z.infer<typeof ClusteringVerdictSchema>;