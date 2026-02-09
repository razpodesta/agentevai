/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus BlockchainLedger
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Precision & Immutability
 * @description Motor de selagem criptográfica. Transmuta listas de assinaturas em 
 * raízes de Merkle inalteráveis para auditoria pública.
 */

import { MerkleTree } from 'merkletreejs';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { 
  MerkleTreeSummarySchema, 
  type IMerkleTreeSummary,
  type CryptographicHash 
} from './schemas/MerkleProof.schema.js';

/**
 * @class BlockchainLedger
 * @description Orquestrador de imutabilidade.
 */
export class BlockchainLedger {
  private static readonly apparatusName = 'BlockchainLedger';

  /**
   * @method sealSignatureBlock
   * @description Gera uma raiz de Merkle a partir de uma lista de hashes de assinaturas.
   * 
   * @param {string[]} signatureHashes - Lista de SHAs das assinaturas eletrônicas.
   * @param {string} correlationIdentifier - Rastro forense da operação.
   * @returns {IMerkleTreeSummary} Resumo do bloco selado.
   */
  public static sealSignatureBlock(
    signatureHashes: string[],
    correlationIdentifier: string
  ): IMerkleTreeSummary {
    try {
      if (signatureHashes.length === 0) {
        throw new Error('CANNOT_SEAL_EMPTY_SIGNATURE_BLOCK');
      }

      // 1. Preparação das Folhas (Leaves)
      // merkletreejs exige buffers ou hex strings. Usamos Noble para garantir o Hash.
      const leaves = signatureHashes.map(hash => Buffer.from(hash, 'hex'));

      // 2. Construção da Árvore (Algoritmo SHA-256 Nativo)
      const tree = new MerkleTree(leaves, (data) => Buffer.from(sha256(data)));
      const rootHex = tree.getHexRoot().replace('0x', '');

      // 3. Composição do Resumo (Aduana Zod)
      const summary = MerkleTreeSummarySchema.parse({
        merkleRoot: rootHex,
        totalSignatureCount: signatureHashes.length,
        blockTimestamp: new Date().toISOString(),
        correlationIdentifier
      });

      // 4. Telemetria de Soberania
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'BLOCK_SEALED',
        message: `Bloco de ${summary.totalSignatureCount} assinaturas selado. Root: ${summary.merkleRoot.substring(0, 12)}...`,
        traceIdentifier: correlationIdentifier
      });

      return summary;

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-INT-8001',
        apparatus: this.apparatusName,
        location: 'libs/integrations/blockchain-ledger/src/lib/BlockchainLedger.ts',
        correlationIdentifier,
        severity: 'FATAL',
        recoverySuggestion: 'Falha no motor criptográfico. Verifique a integridade da biblioteca @noble/hashes.'
      });
    }
  }
}