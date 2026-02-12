/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsDomainHub
 * @version 4.0.0
 */

/* --- 🧠 ORQUESTRADORES --- */
export { NewsCreationService } from './lib/orchestrators/news-creation-service/NewsCreationService.js';
export { EditorialWorkflowEngine } from './lib/orchestrators/editorial-workflow-engine/EditorialWorkflowEngine.js';

/* --- 🏛️ INFRAESTRUTURA --- */
export { NewsArticleRepository } from './lib/infrastructure/NewsArticleRepository.js';
export { NewsArticleQuery } from './lib/infrastructure/repositories/NewsArticleQuery.js';
export { NewsArticleCommand } from './lib/infrastructure/repositories/NewsArticleCommand.js';
export { NewsArticleMapper } from './lib/infrastructure/mappers/NewsArticleMapper.js';
export { NewsArticleSchema, type INewsArticle } from './lib/infrastructure/schemas/NewsArticle.schema.js';

/* --- 🌍 ADN DE WORKFLOW --- */
export * from './lib/orchestrators/schemas/EditorialWorkflow.schema.js';