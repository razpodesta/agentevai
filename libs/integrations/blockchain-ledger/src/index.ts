/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus BlockchainLedgerHub
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - Export Sovereignty
 * @description Ponto único de exposição para o motor de imutabilidade.
 * Erradica falhas de rastro de importação e sela a exportação nominal.
 */

/**
 * @section Camada Operativa (Motor de Selagem)
 * Sincronia ESM: Extensão .js obrigatória para compatibilidade NodeNext.
 */
export { BlockchainLedger } from './lib/BlockchainLedger.js';

/**
 * @section Camada de Definição (ADN Criptográfico)
 */
export {
  MerkleTreeSummarySchema,
  type IMerkleTreeSummary,
  type CryptographicHash
} from './lib/schemas/MerkleProof.schema.js';