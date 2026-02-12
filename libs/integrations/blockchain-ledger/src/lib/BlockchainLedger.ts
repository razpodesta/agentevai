/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus BlockchainLedger
 * @version 4.1.0
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description Motor de selagem criptográfica de alta fidelidade. 
 * CURADO: Resolvido o erro TS2345 (Incompatibilidade binária com @noble/hashes).
 * @policy ZERO-ANY: Saneamento total via normalização binária mandatória.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 */

import { MerkleTree } from 'merkletreejs';
import { sha256 } from '@noble/hashes/sha2.js';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN */
import { 
  MerkleTreeSummarySchema, 
  type IMerkleTreeSummary
} from './schemas/MerkleProof.schema.js';

/**
 * @class BlockchainLedger
 * @description Orquestrador de imutabilidade regional. Transmuta listas de 
 * assinaturas em raízes de Merkle inalteráveis para fé pública digital.
 */
export class BlockchainLedger {
  private static readonly apparatusName = 'BlockchainLedger';
  
  /** 
   * @section Otimização de Performance 
   * Instância única do encoder para evitar overhead de alocação no rastro binário.
   */
  private static readonly SOVEREIGN_ENCODER = new TextEncoder();

  /**
   * @method sealSignatureBlock
   * @static
   * @description Gera uma raiz de Merkle a partir de um conjunto de hashes hexadecimais.
   * 
   * @param {string[]} signatureHashes - Lista de SHAs das assinaturas eletrônicas.
   * @param {string} correlationIdentifier - UUID obrigatório para rastro forense.
   * @returns {IMerkleTreeSummary} Resumo técnico do bloco selado.
   */
  public static sealSignatureBlock(
    signatureHashes: string[],
    correlationIdentifier: string
  ): IMerkleTreeSummary {
    const fileLocation = 'libs/integrations/blockchain-ledger/src/lib/BlockchainLedger.ts';

    try {
      if (signatureHashes.length === 0) {
        throw new Error('CANNOT_SEAL_EMPTY_SIGNATURE_BLOCK');
      }

      // 1. PREPARAÇÃO DE FOLHAS (Leaves)
      // Transmuta strings hexadecimais em Buffers (Uint8Arrays) para processamento.
      const binaryLeaves = signatureHashes.map(hash => Buffer.from(hash, 'hex'));

      /**
       * @section CURA_TS2345
       * Implementação de Normalização Binária Sincronizada.
       * Garante que o input para o sha256 seja sempre Uint8Array.
       */
      const hashFunction = (binaryDataPayload: Uint8Array | string): Buffer => {
        const normalizedInput = typeof binaryDataPayload === 'string'
          ? this.SOVEREIGN_ENCODER.encode(binaryDataPayload)
          : binaryDataPayload;

        return Buffer.from(sha256(normalizedInput));
      };

      // 2. CONSTRUÇÃO DA ÁRVORE (SHA-256 Nativo via Noble)
      const tree = new MerkleTree(binaryLeaves, hashFunction);
      const masterMerkleRootHexadecimal = tree.getHexRoot().replace('0x', '');

      // 3. ADUANA DE ADN (Selagem de Saída)
      const summary = MerkleTreeSummarySchema.parse({
        merkleRoot: masterMerkleRootHexadecimal,
        totalSignatureCount: signatureHashes.length,
        blockTimestamp: new Date().toISOString(),
        correlationIdentifier
      });

      // 4. TELEMETRIA SOBERANA (Protocolo V6.0)
      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'BLOCK_SEALED',
        message: `Selo de Imutabilidade gerado para ${summary.totalSignatureCount} assinaturas.`,
        correlationIdentifier,
        metadata: { 
          merkleRoot: summary.merkleRoot,
          hashingAlgorithm: 'SHA-256'
        }
      });

      return summary;

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-INT-8001'),
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier,
        severity: 'FATAL',
        recoverySuggestion: 'Falha crítica no motor criptográfico. Validar integridade das folhas hexadecimais.'
      });
    }
  }
}