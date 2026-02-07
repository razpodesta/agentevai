/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDataVaultADN
 * @version 2.2.0
 * @description Contratos de segurança atualizados para os padrões Zod v4 (Elite 2026).
 * @protocol OEDP-V5.5 - Zero Deprecated Policy.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 */

export const EncryptedDataSchema = z.string()
  .regex(/^v1:gcm:[a-f0-9]+$/)
  .describe('Carga cifrada via AES-GCM-256.')
  .brand<'EncryptedData'>();

export type EncryptedData = z.infer<typeof EncryptedDataSchema>;

export const AnonymizedIdentifierSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Hash SHA-256 irreversível.')
  .brand<'AnonymizedIdentifier'>();

export type AnonymizedIdentifier = z.infer<typeof AnonymizedIdentifierSchema>;

/**
 * @name VaultPayloadSchema
 * @description Contrato de entrada para a câmara de proteção.
 */
export const VaultPayloadSchema = z.object({
  plainText: z.string().min(1).describe('Dado sensível em texto claro.'),

  context: z.enum([
    'PII_CIVIL_IDENTITY',
    'PII_DIGITAL_TRACE',
    'PII_COMMUNICATION',
    'PII_GEOLOCATION'
  ]),

  /**
   * @section CORREÇÃO DE DESUSO (Zod 4)
   * Substituímos 'z.string().uuid()' pelo construtor de elite 'z.uuid()'.
   */
  correlationIdentifier: z.uuid()
    .describe('Identificador único da jornada para rastro forense.'),

  auditMetadata: z.record(z.string(), z.unknown()).optional(),
}).readonly();

export type IVaultPayload = z.infer<typeof VaultPayloadSchema>;
