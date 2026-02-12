/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus JournalRoutingEngineSchema
 * @version 3.1.0
 * @protocol OEDP-V6.0 - Forensic Integrity SSOT
 * @description ADN de orquestração para ruteamento editorial regionalizado.
 * Sincronizado para Zod V4 com selagem nominal inquebrável.
 */

import { z } from 'zod';
import { 
  SovereignLocaleSchema, 
  SovereignCountrySchema 
} from '@agentevai/types-common';

/** 
 * @section Taxonomia de Decisão (Nominal Brand)
 */
export const RoutingDecisionReasonSchema = z.enum([
  'GEO_DETECTION', 
  'FALLBACK_NATIONAL', 
  'USER_PREFERENCE_VAULT'
])
.describe('Causa semântica identificada para o destino de navegação.')
.brand<'RoutingDecisionReason'>();

export type RoutingDecisionReason = z.infer<typeof RoutingDecisionReasonSchema>;

/** 
 * @name JournalRoutingParametersSchema 
 */
export const JournalRoutingParametersSchema = z.object({
  activeSovereignLocale: SovereignLocaleSchema,
  targetSovereignCountry: SovereignCountrySchema,
  
  stateCode: z.string()
    .length(2)
    .toUpperCase()
    .optional()
    .describe('Sigla da Unidade Federativa para ruteamento regional.'),

  citySlug: z.string()
    .min(2)
    .toLowerCase()
    .optional()
    .describe('Identificador único da cidade para o Jornal Local.'),

  preferredDestination: z.string()
    .min(1)
    .optional()
    .describe('Destino explícito recuperado do cofre de preferências.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'JournalRoutingParameters'>()
.readonly();

export type IJournalRoutingParameters = z.infer<typeof JournalRoutingParametersSchema>;

/** 
 * @name RoutingDecisionSchema 
 */
export const RoutingDecisionSchema = z.object({
  destinationPath: z.string().min(1),
  decisionReason: RoutingDecisionReasonSchema,
  requiresExternalRedirect: z.boolean().default(false)
})
.brand<'RoutingDecision'>()
.readonly();

export type IRoutingDecision = z.infer<typeof RoutingDecisionSchema>;