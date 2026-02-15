/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSEOEngineHub
 * @version 6.6.2
 * @protocol OEDP-V6.5
 */

/* --- ⚙️ ATUADORES DE AUTORIDADE --- */
export { SovereignMetadataFactory } from './lib/logic/SovereignMetadataFactory.js';
export { SovereignStructuredDataEngine } from './lib/logic/SovereignStructuredDataEngine.js';
export { AdVantageImpactSEO } from './lib/logic/AdVantageImpactSEO.js';

/* --- 🧬 ADN E CONTRATOS (SCHEMAS) --- */
export {
  MetadataPacketSchema,
  JsonLdArticleSchema,
  AdVantageSEOInputSchema,
  SearchAuthorityLevelSchema,
  type IMetadataPacket,
  type IJsonLdArticle,
  type IAdVantageSEOInput,
  type SearchAuthorityLevel
} from './lib/schemas/SovereignSEO.schema.js';