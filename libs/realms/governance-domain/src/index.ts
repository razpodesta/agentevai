/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus GovernanceDomainHub
 * @protocol OEDP-V5.5.2
 */

/* --- ADN de Definição --- */
export * from './lib/schemas/PopularSupportSignature.schema.js';
export * from './lib/schemas/SignatureRegistryPool.schema.js';

/* --- Motores de Orquestração --- */
export { SignaturePoolingOrchestrator } from './lib/orchestrators/signature-pooling/SignaturePoolingOrchestrator.js';
export * from './lib/orchestrators/signature-pooling/schemas/SignaturePooling.schema.js';