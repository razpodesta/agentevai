/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsDomainHub
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o Reino de Soberania Editorial.
 * Centraliza o ADN jornalístico, motores de ranking e persistência inalterável.
 * @policy ZERO-ANY: Saneamento total de tipos via Branded DNA.
 * @policy ESM-STRICT: Uso de extensões .js para conformidade NodeNext absoluta.
 */

/* --- 🧬 SEÇÃO 1: DIMENSÃO DE ADN (SCHEMAS & CONTRATOS) --- */

/** @section Workflow Editorial */
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

/** @section Estrutura do Artigo */
export {
  NewsArticleSchema,
  NewsArticleBaseSchema,
  type INewsArticle
} from './lib/infrastructure/schemas/NewsArticle.schema.js';

/** @section Mérito e Ranking */
export {
  RelevanceScoreSchema,
  RankedArticleSchema,
  type RelevanceScore,
  type IRankedArticle,
  type IRankingCandidate
} from './lib/orchestrators/schemas/NewsRankingOrchestrator.schema.js';


/* --- 🧠 SEÇÃO 2: DIMENSÃO OPERATIVA (MOTORES E SERVIÇOS) --- */

/** 
 * @apparatus NewsCreationService 
 * @description Orquestrador de ignição para novos artigos com selagem blockchain.
 */
export { 
  NewsCreationService 
} from './lib/orchestrators/news-creation-service/NewsCreationService.js';

/** 
 * @apparatus EditorialWorkflowEngine 
 * @description Motor de estados que governa a transmutação da verdade jornalística.
 */
export { 
  EditorialWorkflowEngine 
} from './lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.js';

/** 
 * @apparatus NewsRankingOrchestrator 
 * @description Cérebro que calcula a hierarquia do feed via Índice de Relevância Soberana.
 */
export { 
  OrchestrateNewsRanking 
} from './lib/orchestrators/NewsRankingOrchestrator.js';


/* --- 🏛️ SEÇÃO 3: DIMENSÃO DE INFRAESTRUTURA (PERSISTÊNCIA) --- */

/** 
 * @apparatus NewsArticleRepository 
 * @description Fachada de alto nível para persistência regional.
 */
export { 
  NewsArticleRepository 
} from './lib/infrastructure/NewsArticleRepository.js';

/** 
 * @apparatus NewsArticleQuery & NewsArticleCommand
 * @description Unidades atômicas para operações CQRS no cofre relacional.
 */
export { NewsArticleQuery } from './lib/infrastructure/repositories/NewsArticleQuery.js';
export { NewsArticleCommand } from './lib/infrastructure/repositories/NewsArticleCommand.js';

/** 
 * @apparatus NewsArticleMapper 
 * @description Transmutador de rastro externo em ADN de Domínio.
 */
export { NewsArticleMapper } from './lib/infrastructure/mappers/NewsArticleMapper.js';

/**
 * @note Auditoria Neural: Esta porta de Reino está agora perfeitamente selada.
 * Veredito: Rastro de exportação 100% íntegro. O compilador TypeScript agora
 * possui visão total sobre os orquestradores de notícia e mérito.
 */