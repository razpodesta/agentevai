/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsCreationService
 * @version 5.0.0
 * @protocol OEDP-V6.0 - God Tier Orchestration
 * @description Orquestrador mestre para ignição de fatos jornalísticos.
 * Integra imutabilidade Blockchain, Workflow de Estado e Persistência Relacional.
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

/** @section ADN e Handlers Atômicos */
import { 
  NewsCreationInputSchema } from './schemas/NewsCreation.schema.js';
import { SealNewsViaBlockchain } from './handlers/SealNewsViaBlockchain.js';

/**
 * @class NewsCreationService
 * @description Gerencia o ciclo de vida inicial de uma notícia, desde a validação do ADN até a selagem no cofre.
 */
export class NewsCreationService {
  private static readonly apparatusName = 'NewsCreationService';
  private static readonly fileLocation = 'libs/realms/news-domain/src/lib/orchestrators/news-creation-service/NewsCreationService.ts';

  /**
   * @method igniteNewsArticleCreation
   * @static
   * @async
   * @description Ponto de ignição soberano. Transmuta fatos brutos em rastro editorial selado.
   * 
   * @param {unknown} rawInputParameters - Dados brutos oriundos da interface ou gateway.
   * @param {string} correlationIdentifier - Identificador inalterável da jornada forense.
   * @param {ISovereignDictionary} dictionary - Silo linguístico regionalizado para telemetria.
   * @returns {Promise<INewsArticle>} Artigo selado e persistido com sucesso.
   * 
   * @throws {SovereignError} Se o ADN for violado ou houver colapso na infraestrutura.
   */
  public static async igniteNewsArticleCreation(
    rawInputParameters: unknown,
    correlationIdentifier: string,
    dictionary: ISovereignDictionary
  ): Promise<INewsArticle> {
    const apparatusName = this.apparatusName;

    /** 
     * @section Soberania Linguística (Pilar V)
     * Higiene Lexical: Tradução resolvida via motor de elite.
     */
    const translate = (key: string, variables = {}) => SovereignTranslationEngine.translate(
      dictionary, apparatusName, key, variables, correlationIdentifier
    );

    try {
      // 1. ADUANA DE ADN (Ingresso Seguro no Domínio)
      const validatedCreationData = NewsCreationInputSchema.parse(rawInputParameters);

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'ARTICLE_IGNITION_STARTED',
        message: translate('logIgnition', { identifier: validatedCreationData.identifier }),
        correlationIdentifier
      });

      // 2. ORQUESTRAÇÃO DE IMUTABILIDADE (Fé Pública Digital)
      let merkleRootVerificationAnchor = validatedCreationData.merkleRootAnchor;

      if (!merkleRootVerificationAnchor && validatedCreationData.forceBlockchainSealing) {
        merkleRootVerificationAnchor = SealNewsViaBlockchain(
          validatedCreationData.content,
          correlationIdentifier
        );
      }

      // 3. RESOLUÇÃO DE WORKFLOW (Selagem Nominal de Transição)
      const editorialTransitionParameters = EditorialWorkflowInputSchema.parse({
        currentState: EditorialStateSchema.parse('DRAFT'),
        requestedAction: WorkflowActionSchema.parse('SUBMIT_FOR_REVIEW'),
        correlationIdentifier
      });

      const targetEditorialStatus = EditorialWorkflowEngine.calculateNextState(
        editorialTransitionParameters, 
        dictionary
      );

      // 4. COMPOSIÇÃO DO ARTEFATO FINAL (Selagem de Domínio)
      const finalNewsArticle = NewsArticleSchema.parse({
        ...validatedCreationData,
        merkleRootAnchor: merkleRootVerificationAnchor,
        editorialStatus: targetEditorialStatus,
        updatedAt: new Date().toISOString()
      });

      // 5. SELAGEM NO COFRE RELACIONAL (Persistência Sincronizada)
      await NewsArticleRepository.sealNewsArticleInVault(finalNewsArticle, dictionary);

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'ARTICLE_SEALED_SUCCESSFULLY',
        message: translate('statusBlockchain', { identifier: finalNewsArticle.identifier }),
        correlationIdentifier
      });

      return Object.freeze(finalNewsArticle);

    } catch (caughtError) {
      // 6. CAPTURA FORENSE DE FALHA (Pilar VI)
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