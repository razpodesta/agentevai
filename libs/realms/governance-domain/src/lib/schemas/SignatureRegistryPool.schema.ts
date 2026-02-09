/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SignatureRegistryPoolSchema
 * @version 1.0.0
 * @description ADN que define o agrupamento regional de assinaturas para selagem massiva.
 */

import { z } from 'zod';

export const PoolStatusSchema = z.enum([
  'OPEN',      // Recebendo novas assinaturas
  'SEALING',   // Bloqueado para cálculo da Merkle Root
  'ANCHORED',  // Selado e enviado para a Blockchain
  'CORRUPTED'  // Falha de integridade detectada pelo Auditor Neural
]).brand<'PoolStatus'>();

/**
 * @name SignatureRegistryPoolSchema
 * @description ADN do lote regional (ex: Pool de Florianópolis - Fevereiro 2026).
 */
export const SignatureRegistryPoolSchema = z.object({
  poolIdentifier: z.uuid(),

  regionalSlug: z.string().min(2)
    .describe('Âncora geográfica (ex: florianopolis).'),

  currentStatus: PoolStatusSchema.default('OPEN'),

  /** 
   * @section Sincronia Zod V4 
   * Definição explícita de par Chave/Valor para o rastro do lote.
   */
  merkleRootAnchor: z.string().length(64).optional()
    .describe('A prova matemática final do lote (Selo de Fé Pública).'),

  totalWeightInGroup: z.number().nonnegative().default(0)
    .describe('Soma ponderada do poder de voto (IAL3 vale mais que IAL1).'),

  openedAt: z.string().datetime(),

  closedAt: z.string().datetime().optional(),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISignatureRegistryPool = z.infer<typeof SignatureRegistryPoolSchema>;