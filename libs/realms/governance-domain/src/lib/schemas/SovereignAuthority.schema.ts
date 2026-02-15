/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignAuthority.schema
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Master DNA
 * @description ADN de elite para representação de agentes públicos e hierarquia institucional.
 */

import { z } from 'zod';

export const InstitutionalHierarchySchema = z.enum([
  'FEDERAL_ZENITH',
  'STATE_SOVEREIGNTY',
  'MUNICIPAL_TERRITORY'
]).brand<'InstitutionalHierarchy'>();

/** 
 * @name SovereignAuthorityBaseSchema 
 * @description Estrutura mestre da ficha técnica da autoridade.
 */
export const SovereignAuthorityBaseSchema = z.object({
  identifier: z.uuid().describe('Identificador universal inalterável da autoridade.'),
  
  citizenIdentifier: z.uuid().optional()
    .describe('Vínculo com o perfil de cidadão se a autoridade reivindicar o rastro.'),

  institutionalRole: z.string().min(3)
    .describe('Cargo ou função ocupada (ex: Prefeito, Secretário de Saúde).'),

  hierarchyLevel: InstitutionalHierarchySchema,

  mandate: z.object({
    startAt: z.string().datetime(),
    endAt: z.string().datetime().nullable(),
    isCurrentlyActive: z.boolean()
  }).readonly(),

  metadata: z.object({
    officialDocumentsUrls: z.array(z.string().url()).default([]),
    technicalManuals: z.record(z.string(), z.string().url()).default({}),
    contactChannels: z.record(z.string(), z.string()).default({})
  }),

  performanceMetrics: z.object({
    publicTrustScore: z.number().min(0).max(100).default(50),
    resolvedComplaintsCount: z.number().int().nonnegative().default(0),
    averageResponseTimeInHours: z.number().nonnegative().default(0)
  }),

  correlationIdentifier: z.uuid()
});

export const SovereignAuthoritySchema = SovereignAuthorityBaseSchema
  .brand<'SovereignAuthority'>()
  .readonly();

export type ISovereignAuthority = z.infer<typeof SovereignAuthoritySchema>;