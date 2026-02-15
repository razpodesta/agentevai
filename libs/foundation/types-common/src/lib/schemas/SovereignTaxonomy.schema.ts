/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignTaxonomy.schema
 * @version 1.0.0
 * @protocol OEDP-V6.5 - Semantic Integrity
 * @description ADN de elite para classificação hierárquica de fatos e instituições.
 */

import { z } from 'zod';

/** 
 * @section Dimensões Nominais (Branded Types) 
 */
export const TaxonomyDomainSchema = z.enum([
  'PUBLIC_HEALTH',
  'INFRASTRUCTURE',
  'PUBLIC_SAFETY',
  'EDUCATION',
  'ECONOMY',
  'INSTITUTIONAL_GOVERNANCE',
  'PRIVATE_SERVICES'
]).brand<'TaxonomyDomain'>();

export type TaxonomyDomain = z.infer<typeof TaxonomyDomainSchema>;

/** 
 * @name SemanticTagSchema 
 * @description Unidade atômica de metadado (Tag) gerada por IA.
 */
export const SemanticTagSchema = z.object({
  identifier: z.string().toLowerCase().describe('Slug único da tag (ex: falta-de-medicos).'),
  humanizedLabel: z.string().describe('Rótulo traduzido para o cidadão.'),
  relevanceWeight: z.number().min(0).max(1).describe('Peso de importância da tag no contexto.')
}).readonly();

/** 
 * @name SovereignTaxonomySchema 
 * @description O contrato de classificação final de um fato.
 */
export const SovereignTaxonomySchema = z.object({
  primaryDomain: TaxonomyDomainSchema,
  subDomain: z.string().min(2).describe('Categoria secundária (ex: Saneamento Básico).'),
  entityIdentifier: z.uuid().optional().describe('Link com a instituição no diretório.'),
  semanticTags: z.array(SemanticTagSchema).min(1),
  confidenceScore: z.number().min(0).max(1).describe('Nível de certeza da IA na classificação.'),
  correlationIdentifier: z.uuid()
})
.brand<'SovereignTaxonomy'>()
.readonly();

export type ISovereignTaxonomy = z.infer<typeof SovereignTaxonomySchema>;