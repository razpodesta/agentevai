/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus EntityMetadataRegistrySchema
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Institutional SSOT
 * @description ADN que define o búnquer de dados de órgãos públicos e empresas.
 */

import { z } from 'zod';
import { H3IndexSchema } from '../../../../geography-infrastructure/src/lib/logic/schemas/ExecuteProximityQuery.schema.js';

/** @section Dimensões Nominais */
export const EntityIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da instituição.')
  .brand<'EntityIdentifier'>();

export type EntityIdentifier = z.infer<typeof EntityIdentifierSchema>;

export const TaxIdentifierSchema = z.string()
  .regex(/^\d{14}$/)
  .describe('Identificador fiscal (CNPJ no Brasil) para conformidade legal.')
  .brand<'TaxIdentifier'>();

/** @name SovereignEntityBaseSchema */
export const SovereignEntityBaseSchema = z.object({
  identifier: EntityIdentifierSchema,
  legalName: z.string().min(5).max(150),
  taxIdentifier: TaxIdentifierSchema,

  /** @section Ancoragem_Geográfica */
  jurisdictionHexagons: z.array(H3IndexSchema)
    .min(1)
    .describe('Malha de hexágonos H3 sob autoridade desta entidade.'),

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
});

export const SovereignEntitySchema = SovereignEntityBaseSchema
  .brand<'SovereignEntity'>()
  .readonly();

export type ISovereignEntity = z.infer<typeof SovereignEntitySchema>;
