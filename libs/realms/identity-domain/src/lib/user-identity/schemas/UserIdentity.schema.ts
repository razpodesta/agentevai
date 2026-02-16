/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserIdentitySchema
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description Única Fonte de Verdade (SSOT) para a identidade civil e digital.
 * CURADO: Erradicada radiação de importação e vácuo de extensão ESM.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ESM-STRICT: Uso de extensões .js mandatórias para NodeNext.
 */

import { z } from 'zod';
import { 
  BrazilianStateCodeSchema, 
  SovereignLocaleSchema 
} from '@agentevai/types-common';

/* --- 🛡️ SEÇÃO 1: DIMENSÕES NOMINAIS (BRANDED TYPES) --- */

export const CitizenIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável da jornada civil do cidadão.')
  .brand<'CitizenIdentifier'>();

export type CitizenIdentifier = z.infer<typeof CitizenIdentifierSchema>;

export const ReputationScoreSchema = z.number()
  .min(-1000).max(10000)
  .describe('Índice de mérito social acumulado no enxame soberano.')
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

/* --- 🧱 SEÇÃO 2: ATRIBUTOS E CAPACIDADES (BASE SCHEMAS) --- */

export const IdentityAttributesBaseSchema = z.object({
  canPublishOriginalContent: z.boolean().default(false),
  canEndorsePublicComplaints: z.boolean().default(false),
  canModerateRegionalEntropy: z.boolean().default(false),
  isImmuneToAutoModeration: z.boolean().default(false),
  
  votingWeightMultiplier: z.number()
    .min(1).max(20)
    .default(1)
    .describe('Peso do voto no enxame de governança regional.')
    .brand<'VotingWeight'>(),

  isOperatingInDegradedPrivilegeMode: z.boolean().default(false)
});

export const IdentityAttributesSchema = IdentityAttributesBaseSchema.readonly();
export type IIdentityAttributes = z.infer<typeof IdentityAttributesSchema>;

/* --- 🏛️ SEÇÃO 3: CONTRATO MESTRE (SEALED IDENTITY) --- */

export const UserIdentityBaseSchema = z.object({
  identifier: CitizenIdentifierSchema,
  assuranceLevel: IdentityAssuranceLevelSchema,
  coreRole: IdentityRoleSchema,
  reputationStanding: ReputationScoreSchema,
  preferredLocale: SovereignLocaleSchema,

  presence: z.object({
    lastRegionalFingerprint: z.string().length(64).describe('Digital SHA-256 do rastro de rede.'),
    lastSyncTimestamp: z.string().datetime(),
    consciousnessCorrelationIdentifier: z.uuid()
  }).readonly(),

  geographicAnchor: z.object({
    stateCode: BrazilianStateCodeSchema,
    citySlug: z.string().min(2).toLowerCase()
  }).optional().describe('Fronteira territorial de autoridade do cidadão.'),

  attributes: IdentityAttributesSchema
});

/**
 * @name UserIdentitySchema
 * @description O contrato mestre SELADO e IMUTÁVEL para uso em todo o Monorepo.
 */
export const UserIdentitySchema = UserIdentityBaseSchema
  .brand<'UserIdentity'>()
  .readonly();

export type IUserIdentity = z.infer<typeof UserIdentitySchema>;