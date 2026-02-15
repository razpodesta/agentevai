/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus VaultContractsSchema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Forensic Integrity SSOT
 * @description Única Fonte de Verdade para o rastro criptográfico.
 * CURADO: Erradicada radiação léxica (id -> identifier, url -> universalResourceLocator).
 */

import { z } from 'zod';

/* --- 🛡️ DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

export const EncryptedDataSchema = z.string()
  .regex(/^v1:gcm:[a-f0-9]+$/)
  .describe('Carga cifrada soberana: [versão]:[algoritmo]:[payload_hex].')
  .brand<'EncryptedData'>();

export type EncryptedData = z.infer<typeof EncryptedDataSchema>;

export const AnonymizedIdentifierSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Assinatura digital irreversível (SHA-256) para rastro anônimo.')
  .brand<'AnonymizedIdentifier'>();

export type AnonymizedIdentifier = z.infer<typeof AnonymizedIdentifierSchema>;

/* --- 🧱 ESTRUTURAS DE AUDITORIA --- */

export const VaultAuditTraceBaseSchema = z.object({
  apparatusFingerprint: z.string()
    .min(10)
    .describe('Rastro de versão inalterável do aparato solicitante.'),
  
  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total da jornada.'),
    
  accessContext: z.enum([
    'IDENTITY_IDENTIFIABLE_INFORMATION', 
    'GEOGRAPHICAL_SENSITIVE_DATA', 
    'FORENSIC_BEHAVIORAL_TRACE'
  ]).describe('Classificação taxonômica do dado sob proteção.')
}).readonly();

/* --- 📥 ADUANAS DE ENTRADA (SEALED INPUTS) --- */

export const VaultProtectionInputSchema = z.object({
  plainText: z.string()
    .min(1)
    .describe('O dado em texto claro antes da transmutação.'),
    
  audit: VaultAuditTraceBaseSchema
}).brand<'VaultProtectionInput'>().readonly();

export const VaultAnonymizationInputSchema = z.object({
  plainText: z.string()
    .min(1),
    
  audit: VaultAuditTraceBaseSchema
}).brand<'VaultAnonymizationInput'>().readonly();

export type IVaultProtectionInput = z.infer<typeof VaultProtectionInputSchema>;
export type IVaultAnonymizationInput = z.infer<typeof VaultAnonymizationInputSchema>;