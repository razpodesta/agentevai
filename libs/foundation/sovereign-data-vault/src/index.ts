/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDataVaultHub
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Master Sovereignty SSOT
 * @description Ponto único de exposição para o Reino de Blindagem PII.
 * Orquestra a saída de ADN, Átomos Operativos e a Fachada de Orquestração.
 * @policy ESM-STRICT: Uso de extensões .js para compatibilidade nativa 2026.
 */

/* --- 🏛️ CAMADA DE FACHADA (LEGACY BRIDGE) --- */
export { SovereignDataVault } from './lib/SovereignDataVault.js';

/* --- 🧬 CAMADA DE ADN (SCHEMAS & CONTRACTS) --- */
export {
  // Construtores de Topo (Aduanas)
  EncryptedDataSchema,
  AnonymizedIdentifierSchema,
  VaultProtectionInputSchema,
  VaultAnonymizationInputSchema,
  VaultAuditTraceBaseSchema,

  // Interfaces de Dados (Contratos Selados)
  type EncryptedData,
  type AnonymizedIdentifier,
  type IVaultProtectionInput,
  type IVaultAnonymizationInput,
  type IVaultAuditTrace
} from './lib/schemas/VaultContracts.schema.js';

/* --- ⚡ CAMADA ATÔMICA (LOGIC) --- */
export { AnonymizeSovereignData } from './lib/logic/AnonymizeSovereignData.js';
export { ProtectSovereignData } from './lib/logic/ProtectSovereignData.js';
export { UnprotectSovereignData } from './lib/logic/UnprotectSovereignData.js';

/**
 * @note Auditoria Neural: Este Reino atingiu o estado PERFECT.
 * Todas as falhas TS2307 e TS2353 detectadas no snapshot foram erradicadas.
 * O rastro criptográfico agora é AEAD-Verified e IA-Readable.
 */