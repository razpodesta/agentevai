// libs/foundation/sovereign-logger/src/index.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignLoggerHub
 * @version 2.0.0
 * @protocol OEDP-V5.5
 * @description Ponto único de exposição para a telemetria do alicerce (Foundation).
 */

export { SovereignLogger } from './lib/SovereignLogger';

export {
  SovereignLogSchema,
  type ISovereignLog
} from './lib/schemas/SovereignLogger.schema';

/**
 * @note Auditoria Neural: Este aparato é injetado em todos os níveis do Monorepo.
 * Qualquer alteração aqui impacta a observabilidade global.
 */