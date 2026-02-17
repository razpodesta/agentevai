/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignContextHub
 * @version 7.0.2
 * @protocol OEDP-V7.0 - Zenith Master Hub (Facade)
 * @description Ponto único de exposição para a Realidade Sistêmica.
 * CURADO: Erradicados erros TS2305 e TS2724.
 */

/* --- 🧱 SEÇÃO 1: BRIDGE PARA CONSCIÊNCIA --- */
export {
  SovereignConsciousnessSchema,
  type ISovereignConsciousnessPacket
} from '@agentevai/sovereign-consciousness';

/* --- ⚙️ SEÇÃO 2: FACHADA DE RECONCILIAÇÃO --- */
export {
  ReconcileSovereignContext
} from './lib/facade/sovereign-context/SovereignContextFacade.js';

export {
  SovereignContextFacadeSchema,
  type ISovereignContext
} from './lib/facade/sovereign-context/schemas/SovereignContextFacade.schema.js';

/* --- 🌡️ SEÇÃO 3: HOMEOSTASE --- */
export {
  ExecuteGracefulDegradation
} from './lib/degradation-actuator/DegradationActuator.js';

export {
  DegradationActuatorInputSchema,
  type IDegradationActuatorInput
} from './lib/degradation-actuator/schemas/DegradationActuator.schema.js';

/* --- 🌊 SEÇÃO 4: BRIDGE PARA ENXAME --- */
/** CURA TS2305: Exportação validada via SwarmStateSyncHub */
export { SovereignQueryProvider } from '@agentevai/swarm-state-sync';
