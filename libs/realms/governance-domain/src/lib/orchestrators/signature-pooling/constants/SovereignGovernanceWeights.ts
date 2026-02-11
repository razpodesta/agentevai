/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignGovernanceWeights
 * @protocol OEDP-V6.0
 * @description Parâmetros matemáticos para ponderação de Fé Pública conforme o nível IAL.
 */

export const SOVEREIGN_GOVERNANCE_WEIGHTS = {
  /** IAL1: Identidade autodeclarada (Voto de Confiança Mínimo) */
  IAL1_UNVERIFIED_WEIGHT: 1,

  /** IAL2: Identidade validada via rastro digital (SMS/Email) */
  IAL2_VERIFIED_WEIGHT: 5,

  /** IAL3: Soberania Criptográfica (Biometria/Blockchain) - Poder de Decisão */
  IAL3_SOVEREIGN_WEIGHT: 20,

  /** Limite de assinaturas por lote regional para selagem Blockchain */
  MAXIMUM_SIGNATURES_PER_POOL: 10000
} as const;