/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EntityMetadataRegistrySchema
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para o diretório de instituições. 
 * Implementa rastro de jurisdição H3 para o cockpit B2B.
 * @policy ZERO-ANY: Saneamento absoluto via Tipagem Nominal.
 */

import { z } from 'zod';
import { H3IndexSchema } from '@agentevai/types-common';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS --- */

export const EntityIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da instituição.')
  .brand<'EntityIdentifier'>();

export type EntityIdentifier = z.infer<typeof EntityIdentifierSchema>;

export const TaxIdentifierSchema = z.string()
  .regex(/^\d{14}$/)
  .describe('Identificador fiscal (CNPJ) para conformidade jurídica.')
  .brand<'TaxIdentifier'>();

/* --- 🏛️ SEÇÃO 2: CONTRATO DE ENTIDADE (SSOT) --- */

export const SovereignEntityBaseSchema = z.object({
  identifier: EntityIdentifierSchema,
  legalName: z.string().min(5).max(150),
  taxIdentifier: TaxIdentifierSchema,

  /** @section Ancoragem_Geoespacial */
  jurisdictionHexagons: z.array(H3IndexSchema)
    .min(1)
    .describe('Malha de hexágonos H3 onde esta entidade detém autoridade legal.'),

  operationalDomain: z.enum([
    'MUNICIPAL_GOVERNMENT',
    'STATE_SECRETARIAT',
    'PUBLIC_UTILITY',
    'PRIVATE_CONCESSIONAIRE'
  ]),

  contactManifest: z.object({
    officialEmail: z.string().email(),
    apiGatewayEndpoint: z.string().url().optional(),
    physicalAddress: z.string().min(10)
  }).readonly(),

  verificationStatus: z.enum(['PENDING', 'VERIFIED', 'SOVEREIGN_PARTNER'])
    .default('PENDING'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
});

/** @name SovereignEntitySchema */
export const SovereignEntitySchema = SovereignEntityBaseSchema
  .brand<'SovereignEntity'>()
  .readonly();

export type ISovereignEntity = z.infer<typeof SovereignEntitySchema>;