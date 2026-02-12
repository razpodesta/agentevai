/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus VaultContractsSchema
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 * @description Única Fonte de Verdade (SSOT) para o rastro criptográfico do ecossistema.
 * Erradica a "Obsessão por Primitivos" e sela a aduana para trânsito de PII.
 * @policy ZERO-ANY: Saneamento total via Tipagem Nominal (Branding).
 * @policy IA-READABLE: Descrições densas em todos os nós do grafo.
 */

import { z } from 'zod';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

/** 
 * @name EncryptedDataSchema
 * @description Carga cifrada via AES-GCM-256 com prefixo de versão e tag de autenticidade.
 */
export const EncryptedDataSchema = z.string()
  .regex(/^v1:gcm:[a-f0-9]+$/)
  .describe('Carga cifrada soberana: [versão]:[algoritmo]:[payload_hex].')
  .brand<'EncryptedData'>();

export type EncryptedData = z.infer<typeof EncryptedDataSchema>;

/** 
 * @name AnonymizedIdentifierSchema
 * @description Hash SHA-256 irreversível com sal de soberania aplicado na base.
 */
export const AnonymizedIdentifierSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Assinatura digital irreversível para identificação de rastro anônimo.')
  .brand<'AnonymizedIdentifier'>();

export type AnonymizedIdentifier = z.infer<typeof AnonymizedIdentifierSchema>;


/* --- 🧱 SEÇÃO 2: ESTRUTURAS DE AUDITORIA (BASE SCHEMAS) --- */

/**
 * @name VaultAuditTraceBaseSchema
 * @description Estrutura fundamental de metadados forenses.
 */
export const VaultAuditTraceBaseSchema = z.object({
  apparatusFingerprint: z.string()
    .min(10)
    .describe('Assinatura única do aparato (Lego) que invocou a operação de cofre.'),
  
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para correlação cross-platform.'),
    
  accessContext: z.enum([
    'IDENTITY_IDENTIFIABLE_INFORMATION', 
    'GEOGRAPHICAL_SENSITIVE_DATA', 
    'FORENSIC_BEHAVIORAL_TRACE'
  ]).describe('Classificação taxonômica do dado para conformidade estrita com a LGPD.')
});

export type IVaultAuditTrace = z.infer<typeof VaultAuditTraceBaseSchema>;


/* --- 📥 SEÇÃO 3: ADUANAS DE ENTRADA (SEALED INPUTS) --- */

/**
 * @name VaultProtectionInputSchema
 * @description Contrato imutável para ingresso na câmara de cifragem.
 */
export const VaultProtectionInputSchema = z.object({
  plainText: z.string()
    .min(1)
    .describe('O dado sensível em texto claro antes da transmutação criptográfica.'),
    
  audit: VaultAuditTraceBaseSchema.readonly()
    .describe('Snapshot de auditoria exigido para selagem do rastro.')
})
.brand<'VaultProtectionInput'>()
.readonly();

/**
 * @name VaultAnonymizationInputSchema
 * @description Contrato imutável para geração de identificadores anônimos.
 */
export const VaultAnonymizationInputSchema = z.object({
  plainText: z.string()
    .min(1)
    .describe('Dado original a ser anonimizado via hashing determinístico.'),
    
  audit: VaultAuditTraceBaseSchema.readonly()
    .describe('Rastro de responsabilidade da operação.')
})
.brand<'VaultAnonymizationInput'>()
.readonly();

export type IVaultProtectionInput = z.infer<typeof VaultProtectionInputSchema>;
export type IVaultAnonymizationInput = z.infer<typeof VaultAnonymizationInputSchema>;