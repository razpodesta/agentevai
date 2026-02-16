/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AuthorityResolverSchema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para representação e validação de agentes públicos.
 * Sincronizado para orquestração de hierarquia e fé pública.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded Types) 
 */
export const InstitutionalHierarchySchema = z.enum([
  'FEDERAL_ZENITH',
  'STATE_SOVEREIGNTY',
  'MUNICIPAL_TERRITORY'
])
.describe('Nível de autoridade governamental no rastro de jurisdição.')
.brand<'InstitutionalHierarchy'>();

export type InstitutionalHierarchy = z.infer<typeof InstitutionalHierarchySchema>;

/** 
 * @name AuthorityResolverBaseSchema 
 * @description Estrutura mestre da ficha técnica da autoridade.
 */
export const AuthorityResolverBaseSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador universal inalterável da autoridade no búnquer.'),
  
  citizenIdentifier: z.uuid()
    .optional()
    .describe('Vínculo com o rastro de cidadania IAL3 se a autoridade for verificada.'),

  institutionalRole: z.string()
    .min(3)
    .describe('Cargo ou função de prestígio (ex: Prefeito, Auditor de Contas).'),

  hierarchyLevel: InstitutionalHierarchySchema,

  mandate: z.object({
    startAt: z.string().datetime(),
    endAt: z.string().datetime().nullable(),
    isCurrentlyActive: z.boolean()
  }).readonly(),

  metadata: z.object({
    officialDocumentsUrls: z.array(z.string().url()).default([]),
    contactChannels: z.record(z.string(), z.string()).default({})
  }),

  performanceMetrics: z.object({
    publicTrustScore: z.number().min(0).max(100).default(50),
    resolvedComplaintsCount: z.number().int().nonnegative().default(0),
    averageResponseTimeInHours: z.number().nonnegative().default(0)
  }),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
});

/** @section Selagem Nominal Zenith */
export const AuthorityResolverSchema = AuthorityResolverBaseSchema
  .brand<'AuthorityResolver'>()
  .readonly();

export type ISovereignAuthority = z.infer<typeof AuthorityResolverSchema>;