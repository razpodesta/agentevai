/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 2.0.0
 * @protocol OEDP-V5.5.1
 * @description Ponto de ignição para transmutação de fatos em rastro editorial.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { NewsArticleRepository } from '../../../infrastructure/NewsArticleRepository.js';
import { NewsArticleSchema, type INewsArticle } from '../../../infrastructure/schemas/NewsArticle.schema.js';
import { EditorialWorkflowEngine } from '../editorial-workflow-engine/schemas/EditorialWorkflowEngine.js';

// Cluster Handlers & Schemas
import { NewsCreationInputSchema } from './schemas/NewsCreation.schema.js';
import { SealNewsViaBlockchain } from './handlers/SealNewsViaBlockchain.js';

export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';

  public static async ignite(
    rawInput: unknown,
    correlationIdentifier: string
  ): Promise<INewsArticle> {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/NewsCreationService.ts';

    try {
      // 1. ADUANA DE ADN
      const input = NewsCreationInputSchema.parse(rawInput);

      // 2. ORQUESTRAÇÃO DE IMUTABILIDADE (Condicional)
      let merkleRoot = input.merkleRootAnchor;
      if (!merkleRoot && input.forceBlockchainSealing) {
        merkleRoot = SealNewsViaBlockchain(input.content, correlationIdentifier);
      }

      // 3. RESOLUÇÃO DE WORKFLOW
      const targetState = EditorialWorkflowEngine.calculateNextState({
        currentState: 'DRAFT',
        requestedAction: 'SUBMIT_FOR_REVIEW',
        correlationIdentifier
      });

      // 4. COMPOSIÇÃO DE ARTEFATO FINAL (PERFECT STATE)
      const newsArticle = NewsArticleSchema.parse({
        ...input,
        merkleRootAnchor: merkleRoot,
        editorialStatus: targetState,
        updatedAt: new Date().toISOString()
      });

      // 5. PERSISTÊNCIA NO COFRE RELACIONAL
      await NewsArticleRepository.persistNewArticle(newsArticle);

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
