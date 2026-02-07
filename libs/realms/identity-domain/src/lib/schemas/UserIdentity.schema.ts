// libs/realms/identity-domain/src/lib/schemas/UserIdentity.schema.ts

/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus UserIdentitySchema
 * @version 1.2.0
 * @protocol OEDP-V5.5 - High Precision & Zero-Any
 * @description Única Fonte de Verdade (SSOT) para o ADN de identidade no Agentevai.
 * Este aparato define a anatomia de privilégios, rastro de presença anonimizado 
 * e níveis de confiança necessários para governança cidadã de elite.
 * @policy ZERO-ABBREVIATIONS: Prosa técnica militar.
 * @policy LGPD-COMPLIANT: Localização persistida apenas via Digital Fingerprint.
 */

import { z } from 'zod';

/**
 * @section Tipagem Nominal (Branded Types)
 * Blindagem de tipos primitivos para evitar colisões semânticas.
 */

/** Identificador universal inalterável do cidadão via OAuth. */
export const CitizenIdentifierSchema = z.string()
  .uuid()
  .describe('UUID v4 exclusivo para correlação forense com SovereignDataVault.')
  .brand<'CitizenIdentifier'>();

export type CitizenIdentifier = z.infer<typeof CitizenIdentifierSchema>;

/** Hash anonimizado da localização física para auditoria sem PII. */
export const DigitalPresenceFingerprintSchema = z.string()
  .min(64)
  .max(64)
  .regex(/^[a-f0-9]+$/)
  .describe('Hash SHA-256 (Noble) que ancora a última localização conhecida do cidadão.')
  .brand<'DigitalPresenceFingerprint'>();

export type DigitalPresenceFingerprint = z.infer<typeof DigitalPresenceFingerprintSchema>;

/** Pontuação de standing social moderada por IA. */
export const ReputationScoreSchema = z.number()
  .min(-1000)
  .max(10000)
  .describe('Métrica de confiabilidade social que modula privilégios em runtime.')
  .brand<'ReputationScore'>();

export type ReputationScore = z.infer<typeof ReputationScoreSchema>;

/**
 * @section Níveis de Garantia de Identidade (IAL)
 * Baseado no padrão NIST 800-63A para segurança institucional.
 */
export const IdentityAssuranceLevelSchema = z.enum([
  'IAL1_UNVERIFIED', // Autodeclarado.
  'IAL2_VERIFIED',   // Documento validado via OCR/IA.
  'IAL3_SOVEREIGN'   // Presença física ou biometria avançada (Certificado Digital).
]).describe('Nível de prova de identidade que determina o peso das assinaturas.');

export type IIdentityAssuranceLevel = z.infer<typeof IdentityAssuranceLevelSchema>;

/**
 * @section Taxonomia de Papéis Soberanos
 */
export const IdentityRoleSchema = z.enum([
  'ANONYMOUS_CITIZEN',
  'ACTIVE_CITIZEN',
  'VERIFIED_CITIZEN',
  'INDEPENDENT_JOURNALIST',
  'REGIONAL_MODERATOR',
  'GOVERNANCE_AUDITOR',
  'PLATFORM_ENGINEER'
]).describe('Papel fundamental que define o raio de ação técnica do cidadão.');

export type IIdentityRole = z.infer<typeof IdentityRoleSchema>;

/**
 * @section Privilégios Cinéticos
 */
export const IdentityAttributesSchema = z.object({
  canPublishOriginalContent: z.boolean().default(false),
  canEndorsePublicComplaints: z.boolean().default(false),
  canModerateRegionalEntropy: z.boolean().default(false),
  isImmuneToAutoModeration: z.boolean().default(false),
  votingWeightMultiplier: z.number().min(1).max(5).default(1),
  
  /** @improvement Proativa: Tag de auditoria para identificar se os privilégios foram degradados pela IA */
  isOperatingInDegradedPrivilegeMode: z.boolean().default(false)
}).readonly();

export type IIdentityAttributes = z.infer<typeof IdentityAttributesSchema>;

/**
 * @name UserIdentitySchema
 * @description Aduana de ADN para o perfil do cidadão logado.
 */
export const UserIdentitySchema = z.object({
  /** Identidade global */
  identifier: CitizenIdentifierSchema,
  
  /** Qualidade da prova de identidade */
  assuranceLevel: IdentityAssuranceLevelSchema.default('IAL1_UNVERIFIED'),

  /** Papel e Standing */
  coreRole: IdentityRoleSchema,
  reputationStanding: ReputationScoreSchema,
  
  /** Rastro de Localização (LGPD Shield) */
  presence: z.object({
    lastRegionalFingerprint: DigitalPresenceFingerprintSchema,
    lastSyncTimestamp: z.string().datetime(),
    /** UUID da sessão de consciência que gerou este snapshot de identidade */
    consciousnessCorrelationIdentifier: z.string().uuid()
  }).describe('Rastro de presença anonimizado sincronizado com o SovereignContextManager.'),

  /** Ancoragem territorial explícita */
  geographicAnchor: z.object({
    stateAbbreviation: z.string().length(2).toUpperCase(),
    citySlug: z.string().min(2).toLowerCase()
  }).optional().describe('Fronteira geográfica de autoridade (Moderadores/Jornalistas).'),

  /** Permissões calculadas */
  attributes: IdentityAttributesSchema
}).readonly();

export type IUserIdentity = z.infer<typeof UserIdentitySchema>;