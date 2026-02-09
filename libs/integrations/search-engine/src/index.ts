/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SearchEngineHub
 * @version 1.1.0
 * @protocol OEDP-V5.5 - High Precision
 * @description Ponto único de exposição (SSOT) para os motores de busca e resolução geográfica.
 * Centraliza o acesso aos drivers de infraestrutura postal e busca semântica.
 * @policy ZERO-ABBREVIATIONS: Exportações baseadas em clareza semântica absoluta.
 * @policy ESM-STRICT: Uso de extensões explícitas para compatibilidade total.
 */

/**
 * @section Camada de Drivers Postais
 * Responsável pela resolução de endereçamento e soberania territorial.
 */
export {
  BrazilApiPostalDriver
} from './lib/drivers/BrazilApiPostalDriver.js';

/**
 * @note Este aparato reside na camada de Integrações.
 * Ele serve como ponte entre APIs externas e os Reinos (Realms) de domínio.
 *
 * Auditoria Neural: Monitorado para garantir que drivers externos sejam
 * devidamente transmutados antes de cruzarem a fronteira de Reino.
 */
