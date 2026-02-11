/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CalculateSovereignMerit
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Mathematical Sovereignty
 * @description Transmuta o Nível de Garantia (IAL) em peso de Fé Pública com telemetria.
 */

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { type IIdentityAssuranceLevel } from '@agentevai/identity-domain';
import { SOVEREIGN_GOVERNANCE_WEIGHTS } from '../constants/SovereignGovernanceWeights.js';
import { WeightedImpact, WeightedImpactSchema } from '../schemas/SignaturePooling.schema.js';

export const CalculateSovereignMerit = (
  assuranceLevel: IIdentityAssuranceLevel,
  dictionary: ISovereignDictionary,
  correlationIdentifier: string
): WeightedImpact => {
  const apparatusName = 'SignaturePooling';

  const meritMap: Record<IIdentityAssuranceLevel, number> = {
    IAL1_UNVERIFIED: SOVEREIGN_GOVERNANCE_WEIGHTS.IAL1_UNVERIFIED_WEIGHT,
    IAL2_VERIFIED: SOVEREIGN_GOVERNANCE_WEIGHTS.IAL2_VERIFIED_WEIGHT,
    IAL3_SOVEREIGN: SOVEREIGN_GOVERNANCE_WEIGHTS.IAL3_SOVEREIGN_WEIGHT,
  };

  const calculatedWeight = meritMap[assuranceLevel] || 1;

  // Telemetria Semântica (Pilar 6)
  SovereignLogger({
    severity: 'INFO',
    apparatus: apparatusName,
    operation: 'MERIT_CALCULATION_SEALED',
    message: SovereignTranslationEngine.translate(
      dictionary, apparatusName, 'logMeritCalculated', { weight: calculatedWeight }, correlationIdentifier
    ),
    correlationIdentifier
  });

  return WeightedImpactSchema.parse(calculatedWeight);
};