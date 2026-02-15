/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSearchSchema
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Zenith Master DNA
 * @description ADN mestre para orquestração de buscas semânticas.
 * CURADO: Alinhamento com o TransmuteGeopoliticalIdentifier e unificação de rastro.
 */

import { z } from 'zod';
import { TaxonomyDomainSchema } from './SovereignTaxonomy.schema.js';

/** 
 * @name SearchQueryInputSchema 
 * @description Aduana de entrada para a intenção de descoberta cidadã.
 */
export const SearchQueryInputSchema = z.object({
  searchPhrasePayload: z.string()
    .min(2)
    .max(200)
    .trim()
    .describe('O rastro textual da dúvida ou denúncia buscada.'),

  filterByDomain: TaxonomyDomainSchema.optional(),

  /** @section Sincronia Uber H3 (Manifesto 0024) */
  geospatialAnchor: z.object({
    h3IndexIdentifier: z.string().length(15),
    radiusInRings: z.number().int().default(5)
  }).optional().describe('Filtro opcional para priorizar dores próximas ao cidadão.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro forense.')
})
.brand<'SearchQueryInput'>()
.readonly();

export type ISearchQueryInput = z.infer<typeof SearchQueryInputSchema>;

/** 
 * @name SearchResultEntrySchema 
 */
export const SearchResultEntrySchema = z.object({
  identifier: z.uuid()
    .describe('ID único do rastro localizado (Notícia ou Denúncia).'),
  
  title: z.string(),
  
  relevanceScore: z.number()
    .min(0).max(1)
    .describe('Índice de aderência semântica calculado pelo AI-Oracle.'),
    
  semanticSnippet: z.string()
    .describe('Trecho onde a intenção da dor foi localizada.'),
    
  resourceType: z.enum(['NEWS_ARTICLE', 'PUBLIC_COMPLAINT', 'INSTITUTION_PROFILE']),
  
  h3DistanceToCitizen: z.number().optional()
})
.brand<'SearchResultEntry'>()
.readonly();

export type ISearchResultEntry = z.infer<typeof SearchResultEntrySchema>;