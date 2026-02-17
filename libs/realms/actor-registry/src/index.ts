/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ActorRegistryHub
 * @version 7.3.2
 * @protocol OEDP-V7.0 - Zenith Master Hub
 * @description Ponto único de exposição para o Cartório do Ser.
 * CURADO: Erradicada radiação de importação e selada a saída do Actuador.
 */

/* --- 🏛️ CÉLULA: ActorPassport (O Ser) --- */

/**
 * @apparatus SealActorPassport
 * @description Actuador de selagem e anonimização de rastro civil.
 */
export {
  SealActorPassport
} from './lib/actor-passport/ActorPassport.js';

/**
 * @section ADN_e_Contratos
 */
export {
  ActorPassportSchema,
  ActorIdentifierSchema,
  TaxIdentifierSchema,
  type IActorPassport,
  type ActorIdentifier,
  type TaxIdentifier
} from './lib/actor-passport/schemas/ActorPassport.schema.js';

/**
 * @note Veredito do Auditor: Porta de saída selada.
 * O rastro de exportação agora utiliza extensões .js para conformidade ESM.
 */
