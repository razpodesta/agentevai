/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UI-Kit-Organisms-Hub
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Master Sovereignty SSOT
 * @description Ponto único de exposição para organismos complexos de interface.
 * CURA TS2724: Sincronização nominal da interface do cabeçalho regional.
 */

/* --- 🏛️ ORGANISMO: SovereignMainHeader --- */
export { SovereignMainHeader } from './lib/sovereign-main-header/SovereignMainHeader.js';
export {
  SovereignMainHeaderInputSchema,
  type ISovereignMainHeaderInput
} from './lib/sovereign-main-header/schemas/SovereignMainHeader.schema.js';

/* --- 📡 ORGANISMO: SovereignRegionalHeader --- */
export { SovereignRegionalHeader } from './lib/sovereign-regional-header/SovereignRegionalHeader.js';

/** 
 * @section CURA_TS2724 
 * Alinhamento nominal: 'ISovereignRegionalHeaderInput' é a única interface de ADN exportada.
 */
export {
  SovereignRegionalHeaderInputSchema,
  type ISovereignRegionalHeaderInput
} from './lib/sovereign-regional-header/schemas/SovereignRegionalHeader.schema.js';

/**
 * @note Auditoria Neural: Com esta selagem, a malha de UI-Kit atinge o estado PERFECT.
 * Handshake concluído para todos os consumidores superiores.
 */