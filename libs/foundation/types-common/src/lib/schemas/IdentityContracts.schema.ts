/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus IdentityContractsSchema
 * @version 7.1.0
 * @protocol OEDP-V7.0 - Foundation SSOT
 * @description Definições fundamentais de identidade civil e institucional.
 */

import { z } from 'zod';

/**
 * @section Dimensões Nominais de Identidade
 */

export const CitizenIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da jornada civil do cidadão.')
  .brand<'CitizenIdentifier'>();

export type CitizenIdentifier = z.infer<typeof CitizenIdentifierSchema>;

export const TaxIdentifierSchema = z.string()
  .regex(/^\d{14}$/)
  .describe('Identificador fiscal (CNPJ) para conformidade jurídica de empresas.')
  .brand<'TaxIdentifier'>();

export type TaxIdentifier = z.infer<typeof TaxIdentifierSchema>;

export const ReputationScoreSchema = z.number()
  .min(-1000).max(10000)
  .describe('Índice de mérito social acumulado.')
  .brand<'ReputationScore'>();

export type ReputationScore = z.infer<typeof ReputationScoreSchema>;

export const IdentityAssuranceLevelSchema = z.enum([
  'IAL1_UNVERIFIED',
  'IAL2_VERIFIED',
  'IAL3_SOVEREIGN'
])
.describe('Nível de garantia de identidade conforme padrão NIST 800-63A.')
.brand<'IdentityAssuranceLevel'>();

export type IdentityAssuranceLevel = z.infer<typeof IdentityAssuranceLevelSchema>;

export const IdentityRoleSchema = z.enum([
  'ANONYMOUS_CITIZEN',
  'ACTIVE_CITIZEN',
  'VERIFIED_CITIZEN',
  'INDEPENDENT_JOURNALIST',
  'REGIONAL_MODERATOR',
  'GOVERNANCE_AUDITOR',
  'PLATFORM_ENGINEER'
])
.describe('Papel funcional que define a autoridade operativa no sistema.')
.brand<'IdentityRole'>();

export type IdentityRole = z.infer<typeof IdentityRoleSchema>;
