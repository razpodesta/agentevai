/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSearchEngineSchema
 * @version 2.2.0
 * @protocol OEDP-V6.5 - Search Integrity SSOT
 * @description ADN de orquestração para descoberta profunda.
 * CURADO: Sincronizado com a higiene lexical 'searchPhrasePayload'.
 */

import { z } from 'zod';
import { SearchResultEntrySchema } from '@agentevai/types-common';

/** @section Dimensões Nominais (Branded) */
export const SearchConfidenceSchema = z.number()
  .min(0).max(1)
  .describe('Índice de certeza da IA sobre o rastro localizado.')
  .brand<'SearchConfidence'>();

export type SearchConfidence = z.infer<typeof SearchConfidenceSchema>;

/** 
 * @name SovereignSearchVerdictSchema 
 * @description Contrato selado para o resultado da descoberta híbrida.
 */
export const SovereignSearchVerdictSchema = z.object({
  /** Coleção tipada de resultados (Cura TS7005) */
  searchResultCollection: z.array(SearchResultEntrySchema),
  
  discoveryMethod: z.enum(['KEYWORD_PRECISION', 'NEURAL_SEMANTIC', 'HYBRID_SWARM']),
  
  globalConfidence: SearchConfidenceSchema,
  
  processingLatencyInMilliseconds: z.number().nonnegative(),
  
  correlationIdentifier: z.uuid()
    .describe('Identificador Zenith para correlação total do rastro.')
})
.brand<'SovereignSearchVerdict'>()
.readonly();

export type ISovereignSearchVerdict = z.infer<typeof SovereignSearchVerdictSchema>;