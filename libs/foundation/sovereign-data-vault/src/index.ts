/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDataVaultHub
 * @version 2.3.0
 * @protocol OEDP-V5.5 - High Performance & Full Resilience.
 * @description Ponto único de exposição (SSOT) para a infraestrutura de segurança e criptografia.
 * Fornece as ferramentas de transmutação para anonimização e proteção de 
 * Informações de Identificação Pessoal (Personally Identifiable Information) sob LGPD.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica.
 * @policy ESM-STRICT: Uso de extensões explícitas para compatibilidade NodeNext/Bundler.
 * @metadata tier:FOUNDATION_SECURITY role:SECURITY_GATEWAY
 */

/**
 * @section Camada Operativa (Motor Criptográfico)
 * Classe mestre para operações de cifragem AES-GCM e hashing SHA-256.
 * CORREÇÃO TS2835: Adição da extensão .js para conformidade com o motor ESM.
 */
export { SovereignDataVault } from './lib/SovereignDataVault.js';

/**
 * @section Camada de Definição (ADN de Segurança)
 * Esquemas de validação Zod e Tipagem Nominal (Branded) para dados protegidos.
 * CORREÇÃO TS2307: Resolução de rastro para o esquema de contratos.
 */
export {
  // Esquemas de Validação (Aduanas de ADN)
  EncryptedDataSchema,
  AnonymizedIdentifierSchema,
  VaultPayloadSchema,

  // Interfaces e Tipos Branded (Soberania de Tipos)
  type EncryptedData,
  type AnonymizedIdentifier,
  type IVaultPayload,
} from './lib/schemas/VaultContratos.schema.js';

/**
 * @note Este aparato é um Alicerce Crítico (Foundation).
 * Todas as interações que envolvem dados sensíveis do cidadão (IP, Nome, Documentos)
 * devem obrigatoriamente transitar por este Gateway antes da persistência.
 * 
 * Auditoria Neural: Este barril é monitorado pelo AI-Neural-Auditor para garantir
 * que nenhuma exportação de "texto claro" ocorra fora dos padrões de soberania.
 */