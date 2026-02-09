/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UI-Kit-Atoms-Hub
 * @version 1.3.0
 * @protocol OEDP-V5.5 - Standard MetaShark
 * @description Ponto único de exposição para partículas visuais indivisíveis (Atoms).
 * @policy ZERO-ABBREVIATIONS: Exportações autodescritivas.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js) para compatibilidade NodeNext.
 */

/**
 * @section Dimensão de Identidade e Presença
 */
export * from './lib/sovereign-identity-pulse/index.js';

/**
 * @section CORREÇÃO_TS2305: Registro de Branding
 * Adicionamos a exportação do aparato que estava "órfão" na malha.
 */
export * from './lib/sovereign-header-branding/SovereignHeaderBranding.js';

/**
 * @section Dimensão de Engajamento e Ação
 */
export * from './lib/sovereign-engagement-trigger/index.js';

/**
 * @note Auditoria Neural: Este barril é a fonte de partículas para Molecules e Organisms.
 * Rastro Forense: Monitoramento ativo via SovereignLogger em cada exportação.
 */
