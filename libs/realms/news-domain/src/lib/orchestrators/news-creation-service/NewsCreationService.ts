/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 6.5.0
 * @protocol OEDP-V6.5 - God Tier Orchestration
 * @description Orquestrador mestre para transmutação de fatos em rastro editorial.
 * CURADO: Erradicada a radiação de Mocks e Múltiplas Fontes de Verdade.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de Borda (Infrastructure & Logic) */
import { NewsArticleRepository } from '../../infrastructure/NewsArticleRepository.js';
import {
  NewsArticleSchema,
  type INewsArticle
} from '../../infrastructure/schemas/NewsArticle.schema.js';
import { EditorialWorkflowEngine } from '../editorial-workflow-engine/EditorialWorkflowEngine.js';
import {
  EditorialStateSchema,
  WorkflowActionSchema,
  EditorialWorkflowInputSchema
} from '../schemas/EditorialWorkflow.schema.js';

/** @section ADN e Atuadores Atômicos Locais */
import { NewsCreationInputSchema  } from './schemas/NewsCreationService.schema.js';
import { SealNewsViaBlockchain } from './handlers/SealNewsViaBlockchain.js';

export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';
  private static readonly fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/NewsCreationService.ts';

  /**
   * @method igniteNewsArticleCreation
   * @static
   * @async
   * @description Ponto de ignição soberano. Valida o ADN, sela a imutabilidade e persiste no cofre.
   */
  public static async igniteNewsArticleCreation(
    rawInputParameters: unknown,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<INewsArticle> {
    const startTimestamp = performance.now();
    const apparatusName = this.apparatusName;

    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    try {
      // 1. ADUANA DE ADN (Ingresso Seguro)
      const validatedCreationData = NewsCreationInputSchema.parse(rawInputParameters);
      const { identifier, content, forceBlockchainSealing, internalSubmissionNote } = validatedCreationData;

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'ARTICLE_IGNITION_STARTED',
        message: translate('logIgnitionStarted', { identifier }),
        correlationIdentifier
      });

      // 2. ORQUESTRAÇÃO DE IMUTABILIDADE (Fé Pública Digital)
      let merkleRootAnchor: string | undefined;

      if (forceBlockchainSealing) {
        const cryptoStart = performance.now();
        merkleRootAnchor = SealNewsViaBlockchain(content, correlationIdentifier);
        const cryptoEnd = performance.now();

        SovereignLogger({
          severity: 'INFO',
          apparatus: apparatusName,
          operation: 'BLOCKCHAIN_SEAL_APPLIED',
          message: translate('statusBlockchainSealed', { identifier }),
          correlationIdentifier,
          metadata: {
            merkleRootAnchor,
            cryptoLatencyMs: parseFloat((cryptoEnd - cryptoStart).toFixed(4))
          }
        });
      }

      // 3. RESOLUÇÃO DE WORKFLOW (DRAFT ➔ REVIEW)
      const workflowInput = EditorialWorkflowInputSchema.parse({
        currentState: EditorialStateSchema.parse('DRAFT'),
        requestedAction: WorkflowActionSchema.parse('SUBMIT_FOR_REVIEW'),
        correlationIdentifier
      });

      const targetEditorialStatus = EditorialWorkflowEngine.calculateNextState(workflowInput, dictionary);

      // 4. COMPOSIÇÃO DO ARTEFATO FINAL (Selagem de Domínio)
      const newsArticleSnapshot = NewsArticleSchema.parse({
        ...validatedCreationData,
        merkleRootAnchor,
        editorialStatus: targetEditorialStatus,
        updatedAt: new Date().toISOString()
      });

      // 5. PERSISTÊNCIA NO COFRE RELACIONAL
      await NewsArticleRepository.sealNewsArticleInVault(newsArticleSnapshot, dictionary);

      // 6. TELEMETRIA ZENITH E PERFORMANCE
      const endTimestamp = performance.now();
      const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'ARTICLE_IGNITION_SUCCESS',
        message: translate('logArticleStored', { identifier }),
        correlationIdentifier,
        metadata: {
          latencyMs: ignitionLatency,
          hasInternalNote: !!internalSubmissionNote
        }
      });

      return newsArticleSnapshot;

    } catch (caughtError) {
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-ED-3001'),
        apparatus: apparatusName,
        location: this.fileLocation,
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }
}
