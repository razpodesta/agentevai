/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsDomainHub
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - Lego Matrix Entry Point
 * @description Ponto único de exposição (SSOT) para o Reino de Notícias.
 * Organiza a saída em dimensões de ADN, Orquestração e Infraestrutura.
 * @policy ZERO-ABBREVIATIONS: Exportações nomeadas com semântica integral.
 * @policy ESM-STRICT: Uso de extensões .js para compatibilidade total.
 */

/* --- 🧬 DIMENSÃO DE ADN (SCHEMAS E CONTRATOS) --- */

export {
  NewsClassificationSchema,
  EditorialStateSchema,
  WorkflowActionSchema,
  EditorialWorkflowInputSchema,
  type NewsClassification,
  type EditorialState,
  type WorkflowAction,
  type IEditorialWorkflowInput
} from './lib/orchestrators/schemas/EditorialWorkflow.schema.js';

export {
  NewsArticleSchema,
  NewsArticleBaseSchema,
  type INewsArticle
} from './lib/infrastructure/schemas/NewsArticle.schema.js';

/* --- 🧠 DIMENSÃO OPERATIVA (MOTORES E SERVIÇOS) --- */

/** 
 * @apparatus EditorialWorkflowEngine 
 * @description Executor de transições de estado jornalístico.
 */
export { EditorialWorkflowEngine } from './lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.js';

/** 
 * @apparatus EditorialTransitionMatrix 
 * @description Grafo de estados autorizados do Reino.
 */
export { EditorialTransitionMatrix } from './lib/orchestrators/editorial-workflow-engine/constants/EditorialTransitionMatrix.js';

/** 
 * @apparatus NewsCreationService 
 * @description Ponto de ignição para criação e selagem de novos artigos.
 */
export { NewsCreationService } from './lib/orchestrators/news-creation-service/NewsCreationService.ts';

/* --- 🏛️ DIMENSÃO DE INFRAESTRUTURA (PERSISTÊNCIA) --- */

/** 
 * @apparatus NewsArticleRepository 
 * @description Guardião do cofre relacional de notícias (Supabase Bridge).
 */
export { NewsArticleRepository } from './lib/infrastructure/NewsArticleRepository.js';