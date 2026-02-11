/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRankingParameters
 * @protocol OEDP-V6.0
 * @description Parâmetros matemáticos que governam o Índice de Relevância Soberana (IRS).
 */

export const SOVEREIGN_RANKING_PARAMETERS = {
  /** Peso da veracidade inalterável (Blockchain Proof) */
  BLOCKCHAIN_VERACITY_BOOST: 500,
  
  /** Multiplicador do apoio popular (Voz do Cidadão) */
  CITIZEN_SUPPORT_MULTIPLIER: 5,
  
  /** Penalidade de decaimento por hora (Frescúra da Informação) */
  HOURLY_DECAY_PENALTY: 10,
  
  /** Peso base da severidade atribuída pela IA */
  IA_SEVERITY_WEIGHT_BASE: 20,

  /** Patamares de Destino Editorial */
  THRESHOLDS: {
    NATIONAL_ZENITH: 1000,
    INVESTIGATIVE_VAULT: 500
  }
} as const;