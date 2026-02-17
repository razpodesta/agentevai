/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ActorPassportSchema
 * @version 7.1.0
 * @protocol OEDP-V7.0 - Zenith Registry SSOT
 * @description ADN de elite para certidões de nascimento digital.
 * CURADO: Adicionados membros ActorIdentifier e TaxIdentifier para resolução TS2305.
 */

import { z } from 'zod';
import {
  SovereignLocaleSchema,
  BrazilianStateCodeSchema,
  IdentityAssuranceLevelSchema,
  CitizenIdentifierSchema
} from '@agentevai/types-common';

/**
 * @section Dimensões Nominais (Branded Types)
 * CURA TS2305: Exportação formal de sub-schemas e tipos.
 */
export const ActorIdentifierSchema = CitizenIdentifierSchema
  .describe('Identificador inalterável do rastro de identidade.')
  .brand<'ActorIdentifier'>();

export type ActorIdentifier = z.infer<typeof ActorIdentifierSchema>;

export const TaxIdentifierSchema = z.string()
  .regex(/^\d{14}$/)
  .describe('Identificador fiscal (CNPJ) para conformidade jurídica.')
  .brand<'TaxIdentifier'>();

export type TaxIdentifier = z.infer<typeof TaxIdentifierSchema>;

/**
 * @name ActorPassportBaseSchema
 */
const ActorPassportBaseSchema = z.object({
  identifier: ActorIdentifierSchema,
  assuranceLevel: IdentityAssuranceLevelSchema,
  profilePictureUrl: z.string().url().optional(),
  preferredSovereignLocale: SovereignLocaleSchema,
  registeredAt: z.string().datetime(),
  correlationIdentifier: z.uuid()
});

/**
 * @section Especialização por Categoria (Discriminant Union)
 */
export const ActorPassportSchema = z.discriminatedUnion('actorCategory', [
  z.object({
    actorCategory: z.literal('NATURAL_PERSON'),
    fullName: z.string().min(3).max(100),
    displayName: z.string().min(2).max(50),
  }).merge(ActorPassportBaseSchema),

  z.object({
    actorCategory: z.literal('GOVERNMENTAL_ENTITY'),
    institutionalName: z.string().min(5),
    taxIdentifier: TaxIdentifierSchema,
    jurisdictionStateCode: BrazilianStateCodeSchema,
  }).merge(ActorPassportBaseSchema),

  z.object({
    actorCategory: z.literal('CORPORATE_ENTITY'),
    businessName: z.string().min(5),
    taxIdentifier: TaxIdentifierSchema,
  }).merge(ActorPassportBaseSchema),
])
.brand<'ActorPassport'>()
.readonly();

export type IActorPassport = z.infer<typeof ActorPassportSchema>;
