/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus VaultContractsADN
 * @version 3.1.0
 * @protocol OEDP-V6.0 - Forensic Integrity
 * @description Única Fonte de Verdade para o rastro criptográfico.
 * Saneado: Erradicada a abreviação 'Contratos' e unificado rastro nominal.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 * Impede que strings comuns vazem para a câmara acouraçada.
 */

export const EncryptedDataSchema = z.string()
  .regex(/^v1:gcm:[a-f0-9]+$/)
  .describe('Carga cifrada via AES-GCM-256 com tag de autenticidade.')
  .brand<'EncryptedData'>();

export type EncryptedData = z.infer<typeof EncryptedDataSchema>;

export const AnonymizedIdentifierSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Hash SHA-256 irreversível com sal de soberania.')
  .brand<'AnonymizedIdentifier'>();

export type AnonymizedIdentifier = z.infer<typeof AnonymizedIdentifierSchema>;

/**
 * @name VaultPayloadSchema
 * @description Aduana de entrada para a câmara de proteção.
 */
export const VaultPayloadSchema = z.object({
  plainText: z.string()
    .min(1)
    .describe('Dado sensível original em texto claro.'),

  context: z.enum(['PII_IDENTITY', 'PII_TRACE', 'PII_GEOLOCATION'])
    .describe('Contexto do dado para auditoria de acesso.'),

  /** Sincronia Zod v4: Uso do construtor de topo z.uuid() */
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense para correlação de logs.')
}).readonly();

export type IVaultPayload = z.infer<typeof VaultPayloadSchema>;
