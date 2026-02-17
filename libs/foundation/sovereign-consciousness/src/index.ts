/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignConsciousnessHub
 * @version 7.0.1
 * @protocol OEDP-V7.0 - Zenith Master Hub
 */

/* --- 🧱 SEÇÃO 1: CÉLULA DE ANCESTRALIDADE --- */
export {
  CreateSovereignConsciousness,
  type ISovereignConsciousnessPacket
} from './lib/ancestry/sovereign-consciousness/SovereignConsciousness.js';

export {
  SovereignConsciousnessSchema,
  type ISovereignConsciousness
} from './lib/ancestry/sovereign-consciousness/schemas/SovereignConsciousness.schema.js';

/* --- 👤 SEÇÃO 2: CÉLULA DE RESOLUÇÃO TÉCNICA --- */
export {
  ResolveVisitorIdentity
} from './lib/resolvers/resolve-visitor-identity/ResolveVisitorIdentity.js';

export {
  VisitorIdentityResultSchema,
  type IVisitorIdentityResult
} from './lib/resolvers/resolve-visitor-identity/schemas/ResolveVisitorIdentity.schema.js';
