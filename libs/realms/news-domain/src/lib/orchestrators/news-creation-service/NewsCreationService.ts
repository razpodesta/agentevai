/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 4.0.0
 * @protocol OEDP-V6.0 - God Tier Orchestration
 * @description Orquestrador de elite para transmutação de fatos em rastro editorial.
 * Saneado: Erradicado o erro TS2345 via selagem nominal do contrato de transição.
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

/** @section ADN de Entrada e Handlers Atômicos */
import { NewsCreationInputSchema } from './schemas/NewsCreation.schema.js';
import { SealNewsViaBlockchain } from './handlers/SealNewsViaBlockchain.js';

export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';

  /**
   * @method igniteNewsArticleCreation
   * @static
   * @async
   * @description Ponto de ignição soberano. Orquestra a transmutação do fato com selagem matemática.
   *
   * @param {unknown} rawParameters - Parâmetros brutos para aduana de entrada.
   * @param {string} correlationIdentifier - UUID obrigatório para rastro forense.
   * @param {ISovereignDictionary} dictionary - Silo linguístico para telemetria semântica.
   * @returns {Promise<INewsArticle>} Artigo selado e persistido no cofre relacional.
   */
  public static async igniteNewsArticleCreation(
    rawParameters: unknown,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<INewsArticle> {
    const fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/NewsCreationService.ts';

    try {
      // 1. ADUANA DE ADN (Ingresso Seguro no Domínio)
      const validatedData = NewsCreationInputSchema.parse(rawParameters);

      // Pilar 5: Soberania Linguística
      const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
        dictionary, this.apparatusName, key, variables, correlationIdentifier
      );

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_IGNITION_STARTED',
        message: translate('logIgnition', { identifier: validatedData.identifier }),
        correlationIdentifier
      });

      // 2. ORQUESTRAÇÃO DE IMUTABILIDADE (Fé Pública Digital)
      let merkleRootAnchor = validatedData.merkleRootAnchor;

      if (!merkleRootAnchor && validatedData.forceBlockchainSealing) {
        merkleRootAnchor = SealNewsViaBlockchain(
          validatedData.content,
          correlationIdentifier
        );
      }

      // 3. RESOLUÇÃO DE WORKFLOW (Cura TS2345: Selagem Nominal do Input)
      /**
       * @section SELAGEM_DE_TRANSIÇÃO
       * Reconstruímos o contrato de transição através da aduana Zod para injetar o selo [$brand].
       */
      const transitionInput = EditorialWorkflowInputSchema.parse({
        currentState: EditorialStateSchema.parse('DRAFT'),
        requestedAction: WorkflowActionSchema.parse('SUBMIT_FOR_REVIEW'),
        correlationIdentifier
      });

      const targetState = EditorialWorkflowEngine.calculateNextState(transitionInput, dictionary);

      // 4. COMPOSIÇÃO DE ARTEFATO FINAL (Selagem de Domínio)
      const finalNewsArticle = NewsArticleSchema.parse({
        ...validatedData,
        merkleRootAnchor,
        editorialStatus: targetState,
        updatedAt: new Date().toISOString()
      });

      // 5. SELAGEM NO COFRE RELACIONAL
      await NewsArticleRepository.sealNewsArticleInVault(finalNewsArticle);

      SovereignLogger({
        severity: 'INFO',
        apparatus: this.apparatusName,
        operation: 'ARTICLE_SEALED_SUCCESSFULLY',
        message: translate('statusBlockchain', { identifier: finalNewsArticle.identifier }),
        correlationIdentifier
      });

      return finalNewsArticle;

    } catch (caughtError) {
      // 6. CAPTURA FORENSE DE FALHA (Pilar VI)
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
