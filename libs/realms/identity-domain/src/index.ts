/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityDomainHub
 * @version 7.3.0
 * @protocol OEDP-V7.0 - Zenith Master Hub (Aggregate)
 */

/* --- 🧱 SEÇÃO 1: CÉLULA AGREGADA (O Fato Social) --- */
export {
  IgniteUserIdentity
} from './lib/agregates/user-identity/UserIdentity.js';

export {
  UserIdentitySchema,
  type IUserIdentity
} from './lib/agregates/user-identity/schemas/UserIdentity.schema.js';

/* --- ⚖️ SEÇÃO 2: RE-EXPORTAÇÃO DE SOBERANIA --- */
export {
  IdentityAttributesSchema,
  type IIdentityAttributes
} from '@agentevai/sovereign-authorization';

export {
  ActorPassportSchema,
  type IActorPassport
} from '@agentevai/actor-registry';

/**
 * @note Veredito do Auditor: Agregador saneado.
 * CURA TS2305: As dependências externas agora fluem legalmente.
 */
