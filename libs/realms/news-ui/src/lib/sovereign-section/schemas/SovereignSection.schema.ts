/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSectionSchema
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - High Precision
 */

import { z } from 'zod';

export const SemanticIntentSchema = z.enum([
  'NATIONAL_ZENITH',      // Destaque principal
  'REGIONAL_PULSE',       // Feed mosaico
  'INVESTIGATIVE_VAULT',  // Layout com sidebar
  'COMMUNITY_THREAD'      // Lista cronológica
]).brand<'SemanticIntent'>();

export type SemanticIntent = z.infer<typeof SemanticIntentSchema>;

/**
 * @name SovereignSectionInputSchema
 * @description ADN que define como a seção deve se comportar e se traduzir.
 */
export const SovereignSectionInputSchema = z.object({
  identifier: z.uuid(),
  
  semanticIntent: SemanticIntentSchema,
  
  /** Título bruto ou chave i18n */
  sectionTitle: z.string().min(3),

  visualHierarchy: z.enum(['PRIMARY', 'SECONDARY', 'SIDEBAR']).default('PRIMARY'),

  /** Injeção de componentes atômicos */
  children: z.custom<React.ReactNode>().describe('Conteúdo a ser injetado na malha.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Dicionário regional para labels de seção.'),

  correlationIdentifier: z.uuid()
}).readonly();

export type ISovereignSectionInput = z.infer<typeof SovereignSectionInputSchema>;