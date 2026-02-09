/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserIdentitySchema
 * @version 2.1.0
 * @protocol OEDP-V5.5.1 - High Precision & Forensic Integrity
 * @description Única Fonte de Verdade (SSOT) para o ADN de identidade do cidadão.
 * Implementa a separação entre Base e Selagem para suporte total à Autocura Neural.
 * @policy ZERO-ANY: Erradicação absoluta de tipagem anárquica via Branded Types.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura baseada em prosa técnica militar.
 * @policy ZOD-V4-SYNC: Uso de construtores de elite e precedência de modificadores.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 * Blindagem de tipos primitivos para evitar colisões entre identificadores.
 */

export const CitizenIdentifierSchema = z.uuid()
  .describe('Identificador universal inalterável (UUID v4) gerado na ignição do perfil.')
  .brand<'CitizenIdentifier'>();

export type CitizenIdentifier = z.infer<typeof CitizenIdentifierSchema>;

export const DigitalPresenceFingerprintSchema = z.string()
  .length(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Hash SHA-256 anonimizado que ancora a localização e o rastro de rede do cidadão.')
  .brand<'DigitalPresenceFingerprint'>();

export type DigitalPresenceFingerprint = z.infer<typeof DigitalPresenceFingerprintSchema>;

export const ReputationScoreSchema = z.number()
  .min(-1000)
  .max(10000)
  .describe('Índice de standing social moderado por IA que determina o peso da voz pública.')
  .brand<'ReputationScore'>();

export type ReputationScore = z.infer<typeof ReputationScoreSchema>;

/**
 * @section Taxonomia de Autoridade e Confiança
 */

export const IdentityAssuranceLevelSchema = z.enum([
  'IAL1_UNVERIFIED',
  'IAL2_VERIFIED',
  'IAL3_SOVEREIGN'
]).describe('Nível de garantia de identidade baseado no padrão NIST 800-63A.');

export type IIdentityAssuranceLevel = z.infer<typeof IdentityAssuranceLevelSchema>;

export const IdentityRoleSchema = z.enum([
  'ANONYMOUS_CITIZEN',
  'ACTIVE_CITIZEN',
  'VERIFIED_CITIZEN',
  'INDEPENDENT_JOURNALIST',
  'REGIONAL_MODERATOR',
  'GOVERNANCE_AUDITOR',
  'PLATFORM_ENGINEER'
]).describe('Papel fundamental que define o raio de atuação e autoridade no sistema.');

export type IIdentityRole = z.infer<typeof IdentityRoleSchema>;

/**
 * @name IdentityAttributesBaseSchema
 * @description ADN de atributos cinéticos de permissão.
 */
export const IdentityAttributesBaseSchema = z.object({
  canPublishOriginalContent: z.boolean()
    .default(false)
    .describe('Capacidade de iniciar novas denúncias ou notícias.'),

  canEndorsePublicComplaints: z.boolean()
    .default(false)
    .describe('Permissão para adicionar assinaturas de apoio a causas existentes.'),

  canModerateRegionalEntropy: z.boolean()
    .default(false)
    .describe('Poder de intervenção em conteúdos que violem a soberania comunitária.'),

  isImmuneToAutoModeration: z.boolean()
    .default(false)
    .describe('Flag de alta confiança que bypassa filtros automáticos de IA.'),

  votingWeightMultiplier: z.number()
    .min(1)
    .max(5)
    .default(1)
    .describe('Multiplicador de peso de voto baseado no Standing e Nível de Garantia.'),

  isOperatingInDegradedPrivilegeMode: z.boolean()
    .default(false)
    .describe('Indica se o cidadão sofreu sanções automáticas pelo Auditor Neural.')
}).loose();

/**
 * @name IdentityAttributesSchema
 * @description O contrato de atributos SELADO para trânsito de dados.
 */
export const IdentityAttributesSchema = IdentityAttributesBaseSchema.readonly();

export type IIdentityAttributes = z.infer<typeof IdentityAttributesSchema>;

/**
 * @name UserIdentityBaseSchema
 * @description Estrutura fundamental da identidade. Aberta para transformações auditáveis.
 */
export const UserIdentityBaseSchema = z.object({
  identifier: CitizenIdentifierSchema,

  assuranceLevel: IdentityAssuranceLevelSchema,

  coreRole: IdentityRoleSchema,

  reputationStanding: ReputationScoreSchema,

  presence: z.object({
    lastRegionalFingerprint: DigitalPresenceFingerprintSchema,
    lastSyncTimestamp: z.string().datetime(),
    consciousnessCorrelationIdentifier: z.uuid()
  }).describe('Snapshot de presença técnica sincronizado com o SovereignContextManager.'),

  geographicAnchor: z.object({
    stateCode: z.string()
      .length(2)
      .toUpperCase()
      .describe('Sigla da Unidade Federativa de autoridade (Ex: SC, SP).'),
    citySlug: z.string()
      .min(2)
      .toLowerCase()
      .describe('Slug de ruteamento para o Jornal Local de atuação.')
  }).optional().describe('Fronteira geográfica onde o cidadão possui direitos especiais (Ex: Moderadores).'),

  attributes: IdentityAttributesSchema
}).loose();

/**
 * @name UserIdentitySchema
 * @description O contrato mestre SELADO e IMUTÁVEL para uso em todo o Monorepo.
 */
export const UserIdentitySchema = UserIdentityBaseSchema.readonly();

export type IUserIdentity = z.infer<typeof UserIdentitySchema>;
