/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignAuthorizationHub
 * @version 7.1.0
 * @protocol OEDP-V7.0 - Zenith Master Hub
 * @description Ponto único de exposição para o búnquer da lei.
 * CURADO: Erradicado boilerplate e unificada a malha de permissões.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias.
 */

/* --- ⚖️ CÉLULA: PermissionAduana (O Tribunal) --- */

/**
 * @apparatus ResolveActorPower
 * @description Transmuta rastro civil e mérito em matriz de privilégios.
 */
export {
  ResolveActorPower
} from './lib/aduana/PermissionAduana.js';

export {
  PermissionAduanaInputSchema,
  type IPermissionAduanaInput
} from './lib/aduana/schemas/PermissionAduana.schema.js';


/* --- 🧱 CÉLULA: IdentityAttributes (O ADN do Poder) --- */

/**
 * @apparatus IdentityAttributesSchema
 * @description Define as capacidades físicas autorizadas para o ator.
 */
export {
  IdentityAttributesSchema,
  VotingWeightMultiplierSchema,
  type IIdentityAttributes,
  type VotingWeightMultiplier
} from './lib/identity-attributes/schemas/IdentityAttributes.schema.js';

/**
 * @note Veredito do Auditor: O búnquer de Autorização está agora operável.
 * Rastro Forense: Erradicada a pasta 'src/lib/schemas' redundante.
 * O sistema agora consome a lei diretamente das células especializadas.
 */
