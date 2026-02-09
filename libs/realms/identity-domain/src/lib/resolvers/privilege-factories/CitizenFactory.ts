/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenFactory
 * @version 1.2.0
 * @protocol OEDP-V5.5.1 - High Precision & Zero-Entropy
 * @description Fábrica atômica que transmuta rastro de cidadania em atributos de autoridade.
 * Saneado contra erros de inferência trivial e variáveis órfãs de importação.
 * @policy ZERO-ANY: Saneamento total de tipos via Zod.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 * @policy IMMUTABILITY-FIRST: Construção via selagem final de ADN.
 */

import { z } from 'zod';
import {
  IdentityAttributesSchema,
  IIdentityAttributes,
  IdentityAssuranceLevelSchema,
  ReputationScoreSchema
} from '../../schemas/UserIdentity.schema.js';

/**
 * @name CitizenFactoryParametersSchema
 * @description Aduana de ADN local para validação dos parâmetros de entrada da fábrica.
 */
const CitizenFactoryParametersSchema = z.object({
  reputationStanding: ReputationScoreSchema,
  identityAssuranceLevel: IdentityAssuranceLevelSchema
}).readonly();

export type ICitizenFactoryParameters = z.infer<typeof CitizenFactoryParametersSchema>;

/**
 * @name CitizenFactory
 * @function
 * @description Orquestra a distribuição de autoridade baseada no mérito social e prova de identidade.
 *
 * @param {ICitizenFactoryParameters} parameters - Snapshot de vida social do cidadão.
 * @returns {IIdentityAttributes} Matriz de privilégios selada e imutável.
 */
export const CitizenFactory = (
  parameters: ICitizenFactoryParameters
): IIdentityAttributes => {
  // 1. Validação de Fronteira (Aduana Lego)
  const { reputationStanding, identityAssuranceLevel } = CitizenFactoryParametersSchema.parse(parameters);

  /**
   * @section Lógica de Determinação de Poder
   * Variáveis intermediárias para manter a clareza semântica e evitar mutações.
   */

  const isHealthyStanding = reputationStanding >= 0;
  const isHostileStanding = reputationStanding < -100;
  const isVerifiedAccount = identityAssuranceLevel !== 'IAL1_UNVERIFIED';
  const isSovereignAccount = identityAssuranceLevel === 'IAL3_SOVEREIGN';

  // 2. Cálculo de Peso de Voto (Otimizado: Inferência Automática)
  let calculatedWeight = 1;
  if (isSovereignAccount) {
    calculatedWeight = 3;
  } else if (isVerifiedAccount) {
    calculatedWeight = 2;
  }

  /**
   * @section Composição Final e Selagem
   * O output é validado e selado pelo ADN mestre de atributos.
   */
  return IdentityAttributesSchema.parse({
    canPublishOriginalContent: !isHostileStanding && isVerifiedAccount && reputationStanding > 100,
    canEndorsePublicComplaints: !isHostileStanding && isHealthyStanding,
    canModerateRegionalEntropy: false,
    isImmuneToAutoModeration: false,
    votingWeightMultiplier: isHostileStanding ? 1 : calculatedWeight,
    isOperatingInDegradedPrivilegeMode: isHostileStanding
  });
};
