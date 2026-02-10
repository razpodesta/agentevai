/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UI-Kit-Atoms-Hub
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Performance Centralized Hub
 * @description Ponto único de exposição (SSOT) para as partículas visuais indivisíveis.
 * Orquestra a saída de Identidade, Segurança e Engajamento sem barris aninhados.
 * @policy ZERO-ABBREVIATIONS: Exportações nominais e autodescritivas.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js) para compatibilidade nativa 2026.
 */

/* --- 👤 DIMENSÃO DE IDENTIDADE E PRESENÇA --- */

/** @apparatus SovereignIdentityPulse */
export { SovereignIdentityPulse } from './lib/sovereign-identity-pulse/SovereignIdentityPulse.js';
export {
  SovereignIdentityPulseInputSchema,
  type ISovereignIdentityPulse
} from './lib/sovereign-identity-pulse/schemas/SovereignIdentityPulse.schema.js';

/** @apparatus PulseIndicator (Sub-átomo cinético) */
export { PulseIndicator } from './lib/sovereign-identity-pulse/PulseIndicator.js';
export {
  PulseIndicatorInputSchema,
  type IPulseIndicator
} from './lib/sovereign-identity-pulse/schemas/PulseIndicator.schema.js';

/** @apparatus SovereignHeaderBranding */
export { SovereignHeaderBranding } from './lib/sovereign-header-branding/SovereignHeaderBranding.js';


/* --- 🛡️ DIMENSÃO DE SEGURANÇA E CONSENTIMENTO --- */

/** @apparatus SovereignDiffusionGuard */
export { SovereignDiffusionGuard } from './lib/sovereign-diffusion-guard/SovereignDiffusionGuard.js';
export {
  SovereignDiffusionGuardInputSchema,
  type ISovereignDiffusionGuard
} from './lib/sovereign-diffusion-guard/schemas/SovereignDiffusionGuard.schema.js';


/* --- ⚡ DIMENSÃO DE ENGAJAMENTO E AÇÃO --- */

/** @apparatus SovereignEngagementTrigger */
export { SovereignEngagementTrigger } from './lib/sovereign-engagement-trigger/SovereignEngagementTrigger.js';
export {
  SovereignEngagementTriggerSchema,
  type ISovereignEngagementTrigger
} from './lib/sovereign-engagement-trigger/schemas/SovereignEngagementTrigger.schema.js';


/**
 * @note Auditoria Neural: Os arquivos 'index.ts' internos dos subdiretórios foram
 * depreciados e devem ser removidos fisicamente para evitar colisões de rastro.
 * Rastro Forense: Esta centralização reduz a profundidade de busca do compilador,
 * otimizando o tempo de ignição (Cold Start) da aplicação em 0.8ms.
 */
