/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ApparatusMetadataRegistryHub
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Zenith Master Hub
 * @description Ponto único de exposição para o Cartório Técnico. 
 * CURADO: Erradicado erro TS2305 via exportação explícita de ADN e Lógica.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
 */

/* --- 🏛️ CAMADA OPERATIVA (SINGLETON) --- */
export { 
  SovereignApparatusRegistry 
} from './lib/apparatus-metadata-registry.js';

/* --- 🧬 CAMADA DE ADN (SCHEMAS & BRANDED TYPES) --- */
export {
  // Construtores de Topo (Aduanas)
  ApparatusIdentifierSchema,
  StabilityScoreSchema,
  ApparatusTechnicalPassportSchema,

  // Interfaces Nominais (Soberania de Tipos)
  type ApparatusIdentifier,
  type StabilityScore,
  type IApparatusTechnicalPassport
} from './lib/schemas/ApparatusRegistry.schema.js';

/**
 * @note Auditoria Neural: Este Hub agora provê o rastro de genealogia necessário
 * para que qualquer aparato de UI ou Reino possa se registrar com fé pública.
 */