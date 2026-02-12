/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 6.0.0
 * @protocol OEDP-V6.0 - God Tier Orchestration
 * @description Orquestrador mestre para transmutação de fatos em rastro editorial.
 * CURADO: Sincronização de Branded Types e Telemetria de Alta Performance.
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

/** @section ADN e Atuadores Atômicos */
import { 
  NewsCreationInputSchema } from './schemas/NewsCreation.schema.js';
import { SealNewsViaBlockchain } from './handlers/SealNewsViaBlockchain.js';

export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';
  private static readonly fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/NewsCreationService.ts';

  /**
   * @method igniteNewsArticleCreation
   * @static
   * @async
   * @description Ponto de ignição soberano para novos artigos.
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
      // 1. ADUANA DE ADN (Ingresso Seguro no Domínio)
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
        merkleRootAnchor = SealNewsViaBlockchain(content, correlationIdentifier);
        
        SovereignLogger({
          severity: 'INFO',
          apparatus: apparatusName,
          operation: 'BLOCKCHAIN_SEAL_APPLIED',
          message: translate('statusBlockchainSealed', { identifier }),
          correlationIdentifier,
          metadata: { merkleRootAnchor }
        });
      }

      // 3. RESOLUÇÃO DE WORKFLOW (Transmuta de DRAFT para REVIEW)
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

      // 5. SELAGEM NO COFRE RELACIONAL
      await NewsArticleRepository.sealNewsArticleInVault(newsArticleSnapshot, dictionary);

      // 6. TELEMETRIA ZENITH (Medição de Latência e Nota Interna)
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
          hasNote: !!internalSubmissionNote,
          submissionNote: internalSubmissionNote // Rastro preservado para Auditoria Neural
        }
      });

      return Object.freeze(newsArticleSnapshot);

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