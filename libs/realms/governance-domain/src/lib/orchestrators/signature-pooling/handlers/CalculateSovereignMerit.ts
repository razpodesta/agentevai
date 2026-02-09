import { IIdentityAssuranceLevel } from '@agentevai/identity-domain';
import { WeightedImpact, WeightedImpactSchema } from '../schemas/SignaturePooling.schema.js';

/**
 * @name CalculateSovereignMerit
 * @description Transmuta o Nível de Garantia em peso matemático de Fé Pública.
 */
export const CalculateSovereignMerit = (level: IIdentityAssuranceLevel): WeightedImpact => {
  const meritMap: Record<IIdentityAssuranceLevel, number> = {
    'IAL1_UNVERIFIED': 1,  // Voz básica
    'IAL2_VERIFIED': 5,    // Voz validada (Sms/Email)
    'IAL3_SOVEREIGN': 20   // Voz institucional (Biometria/Blockchain)
  };

  return WeightedImpactSchema.parse(meritMap[level] || 1);
};