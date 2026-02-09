/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - High Performance Orchestration
 * @description Orquestrador de ignição para novos artigos jornalísticos. 
 * Integra o rastro de imutabilidade blockchain e a persistência no cofre relacional.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { NewsArticleRepository } from '../../infrastructure/NewsArticleRepository.js';
import { 
  NewsArticleSchema, 
  type INewsArticle 
} from '../../infrastructure/schemas/NewsArticle.schema.js';
import { EditorialWorkflowEngine } from '../editorial-workflow-engine/EditorialWorkflowEngine.js';
import { 
  EditorialStateSchema, 
  WorkflowActionSchema 
} from '../schemas/EditorialWorkflow.schema.js';

// Cluster de Handlers e ADN Local
import { NewsCreationInputSchema } from './schemas/NewsCreation.schema.js';
import { SealNewsViaBlockchain } from './handlers/SealNewsViaBlockchain.js';

/**
 * @class NewsCreationService
 * @description Executor de elite para transmutação de fatos em rastro editorial oficial.
 */
export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';

  /**
   * @method igniteNewsArticleCreation
   * @async
   * @description Ponto de entrada que valida o ADN, sela a verdade matemática e persiste a notícia.
   * 
   * @param {unknown} rawInput - Dados brutos vindo da interface ou API.
   * @param {string} correlationIdentifier - UUID de rastro forense.
   * @returns {Promise<INewsArticle>} Artigo selado e pronto para o feed.
   */
  public static async igniteNewsArticleCreation(
    rawInput: unknown,
    correlationIdentifier: string
  ): Promise<INewsArticle> {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/NewsCreationService.ts';

    try {
      // 1. ADUANA DE ADN (Validando a entrada de criação)
      const validatedCreationInput = NewsCreationInputSchema.parse(rawInput);

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_IGNITION_STARTED',
        message: `Iniciando criação de notícia: ${validatedCreationInput.title.substring(0, 30)}...`,
        traceIdentifier: correlationIdentifier
      });

      // 2. ORQUESTRAÇÃO DE IMUTABILIDADE (Fé Pública)
      let merkleRootAnchor = validatedCreationInput.merkleRootAnchor;
      
      if (!merkleRootAnchor && validatedCreationInput.forceBlockchainSealing) {
        merkleRootAnchor = SealNewsViaBlockchain(
          validatedCreationInput.content, 
          correlationIdentifier
        );
      }

      // 3. RESOLUÇÃO DE WORKFLOW (Cura do Erro TS2322 - Branded Types)
      // Transmutamos strings em ADN validado antes da orquestração de estado.
      const targetState = EditorialWorkflowEngine.calculateNextState({
        currentState: EditorialStateSchema.parse('DRAFT'),
        requestedAction: WorkflowActionSchema.parse('SUBMIT_FOR_REVIEW'),
        correlationIdentifier
      });

      // 4. COMPOSIÇÃO DE ARTEFATO FINAL (Estado PERFECT)
      const finalNewsArticle = NewsArticleSchema.parse({
        ...validatedCreationInput,
        merkleRootAnchor,
        editorialStatus: targetState,
        updatedAt: new Date().toISOString()
      });

      // 5. SELAGEM NO COFRE RELACIONAL
      await NewsArticleRepository.persistNewArticle(finalNewsArticle);

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_SEALED_SUCCESSFULLY',
        message: `Notícia [${finalNewsArticle.identifier}] selada e enviada para revisão neural.`,
        traceIdentifier: correlationIdentifier
      });

      return finalNewsArticle;

    } catch (caughtError) {
      // 6. CAPTURA FORENSE DE FALHA
      throw SovereignError.transmute(caughtError, {
        code: SovereignErrorCodeSchema.parse('OS-ED-3001'),
        apparatus: this.apparatusName,
        location: fileLocation,
        correlationIdentifier,
        severity: 'HIGH'
      });
    }
  }
}