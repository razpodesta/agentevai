/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SealNewsViaBlockchain
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - High Precision & Immutability
 * @description Handler especializado na transmutação de conteúdo textual em 
 * prova matemática inalterável. Utiliza o motor BlockchainLedger para selagem.
 */

import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import { BlockchainLedger } from '@agentevai/blockchain-ledger';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';

/**
 * @name SealNewsViaBlockchain
 * @function
 * @description Gera o selo de fé pública para um artigo jornalístico.
 * 
 * @param {string} articleContentBody - O corpo textual completo da notícia.
 * @param {string} correlationIdentifier - Identificador para rastro forense.
 * @returns {string} Merkle Root gerada (Âncora de Veracidade).
 */
export const SealNewsViaBlockchain = (
  articleContentBody: string,
  correlationIdentifier: string
): string => {
  const apparatusName = 'SealNewsViaBlockchain';
  const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/handlers/SealNewsViaBlockchain.ts';

  try {
    // 1. Geração de Digital Criptográfica (Leaf Generation)
    // Evitamos o Buffer. Usamos o motor Noble (SSOT do Agentevai) para o rastro inicial.
    const encoder = new TextEncoder();
    const contentAsUint8Array = encoder.encode(articleContentBody);
    const contentHashHex = bytesToHex(sha256(contentAsUint8Array));

    // 2. Ignição do Motor de Selagem (Merkle Tree Orchestration)
    const blockSummary = BlockchainLedger.sealSignatureBlock(
      [contentHashHex],
      correlationIdentifier
    );

    // 3. Telemetria de Soberania
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'BLOCKCHAIN_SEAL_GENERATED',
      message: `Âncora de fé pública gerada com sucesso para rastro: ${correlationIdentifier}`,
      traceIdentifier: correlationIdentifier,
      metadata: { 
        merkleRoot: blockSummary.merkleRoot,
        algorithm: 'SHA-256'
      }
    });

    return blockSummary.merkleRoot;

  } catch (caughtError) {
    // 4. Captura Forense de Falha Criptográfica
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-INT-8002'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier,
      severity: 'CRITICAL',
      recoverySuggestion: 'Falha ao gerar prova matemática. Verifique a integridade do motor Noble Hashes.'
    });
  }
};