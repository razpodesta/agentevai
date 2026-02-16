/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PopularSupportSignatureSchema
 * @version 1.0.0
 * @protocol OEDP-V5.5.2 - Cryptographic Democracy
 * @description ADN da assinatura individual off-chain antes da selagem em lote.
 */

import { z } from 'zod';
import { CitizenIdentifierSchema, IdentityAssuranceLevelSchema } from '@agentevai/identity-domain';

/**
 * @section Tipagem Nominal (Branded Types)
 */
export const SignatureIdentifierSchema = z.uuid()
  .describe('ID único da intenção de voto gerado na ignição do componente UI.')
  .brand<'SignatureIdentifier'>();

export type SignatureIdentifier = z.infer<typeof SignatureIdentifierSchema>;

/**
 * @name PopularSupportSignatureSchema
 * @description O contrato de uma vontade cidadã individual.
 */
export const PopularSupportSignatureSchema = z.object({
  identifier: SignatureIdentifierSchema,

  voterIdentifier: CitizenIdentifierSchema,

  targetContentIdentifier: z.uuid()
    .describe('ID da denúncia ou notícia que está recebendo o apoio.'),

  assuranceLevelAtSigning: IdentityAssuranceLevelSchema,

  /**
   * @description Hash SHA-256 gerado pelo Vault combinando VoterID + ContentID + Nonce.
   * Este rastro será a 'folha' da Merkle Tree.
   */
  cryptographicEvidenceHash: z.string().length(64)
    .describe('Digital matemática da assinatura individual.'),

  signedAt: z.string().datetime(),

  correlationIdentifier: z.uuid()
}).readonly();

export type IPopularSupportSignature = z.infer<typeof PopularSupportSignatureSchema>;