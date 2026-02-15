/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CompilerContracts
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Zenith Assembly
 * @description Contratos de interface para orquestração industrial de dicionários.
 * CURADO: Sincronizado com a chave 'semanticContent' (Erradicado rastro 'value').
 */

export interface ISovereignTranslationEntry {
  /** 
   * @section ZENITH_SYNC 
   * Transmuta 'value' para 'semanticContent' para conformidade 1:1 com o ADN mestre.
   */
  readonly semanticContent: string;
  readonly semanticVersion: string;
  readonly aura?: {
    readonly severity: 'NEUTRAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    readonly vocalizeActionTrigger: boolean;
  };
}

export interface IApparatusFragment {
  readonly [semanticKey: string]: ISovereignTranslationEntry;
}

export interface IConsolidatedDictionary {
  [apparatusIdentifier: string]: IApparatusFragment;
}