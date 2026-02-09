/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 1.0.0
 * @protocol OEDP-V5.5.1 - High Precision & Immutability
 * @description Orquestrador de criação de notícias. Integra validação de ADN,
 * selagem via Blockchain Ledger e persistência no Relational Vault.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError } from '@agentevai/sovereign-error-observability';
import { BlockchainLedger } from '@agentevai/blockchain-ledger';
import { NewsArticleRepository } from '../infrastructure/NewsArticleRepository.js';
import { NewsArticleSchema, type INewsArticle } from '../infrastructure/schemas/NewsArticle.schema.js';
import { EditorialWorkflowEngine } from './editorial-workflow-engine/schemas/EditorialWorkflowEngine.js';

export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';

  /**
   * @method igniteArticle
   * @description Ponto de ignição para novas notícias ou transmutação de denúncias.
   */
  public static async igniteArticle(
    rawInput: unknown,
    correlationIdentifier: string
  ): Promise<INewsArticle> {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/NewsCreationService.ts';

    try {
      // 1. ADUANA DE ADN: Validação de entrada bruta
      const validatedData = NewsArticleSchema.parse(rawInput);

      // 2. PROTOCOLO DE IMUTABILIDADE: Se for notícia de impacto, sela na Blockchain
      let merkleRoot: string | undefined = validatedData.merkleRootAnchor;

      if (!merkleRoot && validatedData.editorialStatus === 'BLOCKCHAIN_SEALED') {
        SovereignLogger({
          severity: 'INFO',
          apparatus: this.apparatusName,
          operation: 'BLOCKCHAIN_SEALING_TRIGGERED',
          message: 'Notícia de alta severidade detectada. Gerando âncora matemática.',
          traceIdentifier: correlationIdentifier
        });

        // Simulamos a geração de hash do conteúdo para a folha da árvore
        const contentHash = crypto.randomUUID().replace(/-/g, ''); // Placeholder para SHA-256 real
        const blockSummary = BlockchainLedger.sealSignatureBlock([contentHash], correlationIdentifier);
        merkleRoot = blockSummary.merkleRoot;
      }

      // 3. RESOLUÇÃO DE WORKFLOW: Garantir estado inicial coerente
      const initialState = EditorialWorkflowEngine.calculateNextState({
        currentState: 'DRAFT',
        requestedAction: 'SUBMIT_FOR_REVIEW',
        correlationIdentifier
      });

      // 4. COMPOSIÇÃO DE ARTEFATO FINAL
      const newsArticle: INewsArticle = NewsArticleSchema.parse({
        ...validatedData,
        merkleRootAnchor: merkleRoot,
        editorialStatus: initialState,
        updatedAt: new Date().toISOString()
      });

      // 5. SELAGEM NO COFRE (Persistência)
      await NewsArticleRepository.persistNewArticle(newsArticle);

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_CREATED_SUCCESSFULLY',
        message: `Notícia ${newsArticle.identifier} pronta para rastro regional.`,
        traceIdentifier: correlationIdentifier
      });

      return newsArticle;

    } catch (error) {
      throw SovereignError.transmute(error, {
        code: 'OS-ED-3001',
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }
}
