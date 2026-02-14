/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UI-Kit-Atoms-Hub
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Zenith High Performance Hub
 * @description Ponto único de exposição para as partículas visuais soberanas.
 * CURA TS2305: Exportação formal de Branding e Identity Pulse para os Organismos.
 */

/* --- 👤 DIMENSÃO 1: IDENTIDADE E ANCORAGEM --- */

/** @apparatus SovereignHeaderBranding */
export { SovereignHeaderBranding } from './lib/sovereign-header-branding/SovereignHeaderBranding.js';
export {
  SovereignHeaderBrandingSchema,
  SovereignHeaderBrandingBaseSchema,
  type ISovereignHeaderBranding
} from './lib/sovereign-header-branding/schemas/SovereignHeaderBranding.schema.js';

/** @apparatus SovereignIdentityPulse */
export { SovereignIdentityPulse } from './lib/sovereign-identity-pulse/SovereignIdentityPulse.js';
export {
  SovereignIdentityPulseInputSchema,
  type ISovereignIdentityPulse
} from './lib/sovereign-identity-pulse/schemas/SovereignIdentityPulse.schema.js';

/** @apparatus PulseIndicator */
export { PulseIndicator } from './lib/sovereign-identity-pulse/PulseIndicator.js';
export {
  PulseIndicatorInputSchema,
  type IPulseIndicator
} from './lib/sovereign-identity-pulse/schemas/PulseIndicator.schema.js';


/* --- 🛡️ DIMENSÃO 2: SEGURANÇA E CONSENTIMENTO --- */

export { SovereignDiffusionGuard } from './lib/sovereign-diffusion-guard/SovereignDiffusionGuard.js';
export {
  SovereignDiffusionGuardInputSchema,
  type ISovereignDiffusionGuard
} from './lib/sovereign-diffusion-guard/schemas/SovereignDiffusionGuard.schema.js';

export { SovereignActionQR } from './lib/sovereign-action-qr/SovereignActionQR.js';
export {
  SovereignActionQRInputSchema,
  type ISovereignActionQRInput
} from './lib/sovereign-action-qr/schemas/SovereignActionQR.schema.js';


/* --- ⚡ DIMENSÃO 3: ENGAJAMENTO E VONTADE --- */

export { SovereignEngagementTrigger } from './lib/sovereign-engagement-trigger/SovereignEngagementTrigger.js';
export {
  SovereignEngagementTriggerSchema,
  type ISovereignEngagementTrigger
} from './lib/sovereign-engagement-trigger/schemas/SovereignEngagementTrigger.schema.js';
