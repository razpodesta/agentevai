/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextHub
 * @version 2.1.0
 * @description Ponto único de exposição para a Consciência Sistêmica do Agentevai.
 * Centraliza o ADN Geográfico, Linguístico, Estético e de Saúde.
 * @protocol OEDP-V5.5 - Standard MetaShark
 */

/**
 * @section Camada de Gestão (Manager)
 * Factory e Interfaces de Contexto Realimentado (Consciousness).
 */
export {
  CreateSovereignContext,
  type ISovereignConsciousnessPacket,
} from './lib/SovereignContextManager';

/**
 * @section Camada de Definição (ADN)
 * Esquemas de validação Zod e Interfaces Base.
 */
export {
  SovereignContextSchema,
  type ISovereignContext,
  RegionSlugSchema,
  type RegionSlug,
  HealthScoreSchema,
  type HealthScore,
} from './lib/schemas/SovereignContext.schema';

/**
 * @note Este aparato é um Alicerce (Foundation).
 * Nenhuma biblioteca nesta camada deve importar de camadas superiores (Realms/Orchestration).
 * A integridade desta fronteira é monitorada pelo AI-Neural-Auditor.
 */
