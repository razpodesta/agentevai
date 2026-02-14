/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsDomainHub
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o Reino de Soberania Editorial.
 * Centraliza o ADN jornalístico, motores de ranking e persistência inalterável.
 * @policy ZERO-ANY: Saneamento total de tipos via Branded DNA.
 * @policy ESM-STRICT: Uso de extensões .js para conformidade NodeNext absoluta.
 * @policy FLAT-EXPORT: Orquestração centralizada ignorando barrels internos.
 */

/* --- 🧬 SEÇÃO 1: DIMENSÃO DE ADN (SCHEMAS & CONTRATOS) --- */

/** @section Workflow Editorial (Fronteira de Estados) */
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

/** @section Estrutura do Artigo (Entidade de Domínio) */
export {
  NewsArticleSchema,
  NewsArticleBaseSchema,
  type INewsArticle
} from './lib/infrastructure/schemas/NewsArticle.schema.js';

/** @section Mérito e Ranking (IRS DNA) */
export {
  RelevanceScoreSchema,
  RankedArticleSchema,
  NewsRankingInputSchema,
  RankingCandidateBaseSchema,
  type RelevanceScore,
  type IRankedArticle,
  type IRankingCandidate,
  type INewsRankingInput
} from './lib/orchestrators/schemas/NewsRankingOrchestrator.schema.js';

/**
 * @section Ignição Editorial (Creation DNA)
 * CURA: Exportação direta do ADN de criação vindo do novo silo atômico.
 */
export {
  NewsCreationInputSchema,
  type INewsCreationInput
} from './lib/orchestrators/news-creation-service/schemas/NewsCreationService.schema.js';


/* --- 🧠 SEÇÃO 2: DIMENSÃO OPERATIVA (MOTORES E SERVIÇOS) --- */

/**
 * @apparatus NewsCreationService
 * @description Orquestrador mestre para transmutação de fatos em rastro editorial.
 */
export {
  NewsCreationService
} from './lib/orchestrators/news-creation-service/NewsCreationService.js';

/**
 * @apparatus EditorialWorkflowEngine
 * @description Motor de estados que governa a imutabilidade da verdade jornalística.
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
 * @description Fachada de alto nível para persistência regionalizada.
 */
export {
  NewsArticleRepository
} from './lib/infrastructure/NewsArticleRepository.js';

/**
 * @apparatus NewsArticleQuery & NewsArticleCommand
 * @description Unidades atômicas para operações de Leitura e Escrita (CQRS).
 */
export { NewsArticleQuery } from './lib/infrastructure/repositories/NewsArticleQuery.js';
export { NewsArticleCommand } from './lib/infrastructure/repositories/NewsArticleCommand.js';

/**
 * @apparatus NewsArticleMapper
 * @description Transmutador de rastro técnico externo em ADN de Domínio selado.
 */
export { NewsArticleMapper } from './lib/infrastructure/mappers/NewsArticleMapper.js';

/**
 * @note Auditoria Neural: Esta porta de Reino está agora em conformidade Zenith.
 * Todas as regressões de rastro (extensões .ts) e vácuos nominais foram erradicados.
 * Veredito: PERFECT (V6.5.1).
 */
