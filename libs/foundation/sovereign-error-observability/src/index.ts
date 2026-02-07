/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignErrorObservabilityHub
 * @version 2.2.0
 * @description Ponto único de exportação para o motor de observabilidade de falhas.
 * Fornece a gramática taxonômica para diagnóstico e autocura do sistema.
 * @protocol OEDP-V5.5 - Standard MetaShark
 */

/**
 * @section Camada Operativa (Motor de Transmutação)
 * Classe mestre para captura e estruturação de falhas sistêmicas.
 */
export { SovereignError } from './lib/SovereignError';

/**
 * @section Camada de Definição (ADN Criptográfico)
 * Esquemas Zod e Tipagem Branded para garantir integridade forense.
 */
export {
  SovereignErrorSchema,
  SovereignErrorCodeSchema,
  type ISovereignError,
  type SovereignErrorCode,
} from './lib/schemas/SovereignError.schema';

/**
 * @note Este aparato reside na Foundation (Alicerce).
 * Ele é a "Linguagem de Dor" comum a todos os Reinos (Realms).
 * O AI-Neural-Auditor monitora a pureza deste barril para evitar acoplamento circular.
 */
