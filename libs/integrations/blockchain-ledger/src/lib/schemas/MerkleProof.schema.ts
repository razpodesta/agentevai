/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus MerkleProofSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - Cryptographic Integrity
 * @description ADN para validação de provas de inclusão e raízes de Merkle.
 */

import { z } from 'zod';

/** Identificador de Hash SHA-256 (64 hex chars) */
export const CryptographicHashSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .brand<'CryptographicHash'>();

export type CryptographicHash = z.infer<typeof CryptographicHashSchema>;

/**
 * @name MerkleTreeSummarySchema
 * @description Snapshot de um bloco de assinaturas selado.
 */
export const MerkleTreeSummarySchema = z.object({
  merkleRoot: CryptographicHashSchema
    .describe('Raiz mestre que condensa matematicamente todas as assinaturas do bloco.'),
  
  totalSignatureCount: z.number().int().positive()
    .describe('Quantidade de vontades cidadãs contidas neste selo.'),

  blockTimestamp: z.string().datetime()
    .describe('Marca temporal da selagem inalterável.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type IMerkleTreeSummary = z.infer<typeof MerkleTreeSummarySchema>;