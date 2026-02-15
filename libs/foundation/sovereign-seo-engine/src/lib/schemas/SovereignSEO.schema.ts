/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSEOSchema
 * @version 6.6.2
 * @protocol OEDP-V6.5 - Master DNA Zenith
 * @description ADN de elite para autoridade orgânica. 
 * CURADO: Adicionados membros ausentes (forensicProof, openGraph) e selagem nominal.
 */

import { z } from 'zod';

/** @section Dimensões Nominais */
export const SearchAuthorityLevelSchema = z.enum(['IAL1', 'IAL2', 'IAL3']).brand<'SearchAuthorityLevel'>();
export type SearchAuthorityLevel = z.infer<typeof SearchAuthorityLevelSchema>;

/** @name OpenGraphMetadataSchema */
export const OpenGraphMetadataSchema = z.object({
  resourceType: z.enum(['article', 'website', 'profile']),
  imageResourceUrl: z.string().url(),
  localeCode: z.string(),
  siteName: z.string().default('A GENTE VAI')
}).readonly();

/** @name ForensicProofSchema */
export const ForensicProofSchema = z.object({
  merkleRootHash: z.string().length(64).optional(),
  assuranceLevel: SearchAuthorityLevelSchema,
  hardwareVerified: z.boolean().default(false)
}).readonly();

/** 
 * @name MetadataPacketSchema 
 * CURA TS2339: Agora porta todas as chaves exigidas pela Factory.
 */
export const MetadataPacketSchema = z.object({
  titleHeader: z.string().min(10).max(70),
  descriptionNarrative: z.string().min(50).max(160),
  canonicalUniversalResourceLocator: z.string().url(),
  openGraph: OpenGraphMetadataSchema,
  forensicProof: ForensicProofSchema,
  correlationIdentifier: z.uuid()
}).readonly();

export type IMetadataPacket = z.infer<typeof MetadataPacketSchema>;

/** 
 * @name JsonLdArticleSchema 
 * CURA TS2305: Exportado formalmente para o StructuredDataEngine.
 */
export const JsonLdArticleSchema = z.object({
  headline: z.string(),
  datePublished: z.string().datetime(),
  dateModified: z.string().datetime(),
  authorName: z.string(),
  publisherName: z.string().default('Agentevai'),
  mainImageResourceUrl: z.string().url(),
  regionName: z.string(),
  merkleRootAnchor: z.string().optional()
}).readonly();

export type IJsonLdArticle = z.infer<typeof JsonLdArticleSchema>;

/** @name AdVantageSEOInputSchema */
export const AdVantageSEOInputSchema = z.object({
  brandIdentifier: z.string().min(2),
  businessSectorCategory: z.string(),
  regionalImpactScope: z.string(),
  merkleProofAnchor: z.string().length(64).optional(),
  correlationIdentifier: z.uuid()
}).readonly();

export type IAdVantageSEOInput = z.infer<typeof AdVantageSEOInputSchema>;