/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus RegistryVaultHub
 * @version 7.2.0
 * @protocol OEDP-V7.0 - Master Sovereignty SSOT
 */

/* --- 🏛️ APARATO: ActorPassport --- */
export { SealActorPassport } from './lib/actor-passport/ActorPassport.js';
export {
  ActorPassportSchema,
  ActorIdentifierSchema,
  TaxIdentifierSchema,
  type IActorPassport,
  type ActorIdentifier,
  type TaxIdentifier
} from './lib/actor-passport/schemas/ActorPassport.schema.js';

/* --- 🎨 APARATO: PreferenceVault --- */
export { SealUserPreferences } from './lib/preference-vault/PreferenceVault.js';
export {
  PreferenceVaultSchema,
  ThemeModeSchema,
  MotionProfileSchema,
  type IPreferenceVault,
  type ThemeMode
} from './lib/preference-vault/schemas/PreferenceVault.schema.js';

/**
 * @note Veredito do Auditor: O Cartório de Dados está agora com o rastro territorial
 * sincronizado e imune a erros de importação após o nivelamento da fundação.
 */
