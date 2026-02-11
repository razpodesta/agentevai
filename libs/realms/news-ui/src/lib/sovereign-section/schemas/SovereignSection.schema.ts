/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSectionSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision DNA
 * @description ADN de orquestração de layout. Sincronizado para Zod V4.
 */

import { z } from 'zod';

export const SemanticIntentSchema = z.enum([
  'NATIONAL_ZENITH',
  'REGIONAL_PULSE',
  'INVESTIGATIVE_VAULT',
  'COMMUNITY_THREAD'
])
.describe('Intenção semântica que governa a disposição geométrica da seção.')
.brand<'SemanticIntent'>();

export type SemanticIntent = z.infer<typeof SemanticIntentSchema>;

/**
 * @name SovereignSectionInputSchema
 * @description Aduana de entrada estrita para o orquestrador de seção.
 */
export const SovereignSectionInputSchema = z.object({
  identifier: z.uuid()
    .describe('Identificador inalterável da seção para rastro de telemetria.'),

  semanticIntent: SemanticIntentSchema,

  sectionTitle: z.string()
    .min(3)
    .describe('Título textual ou chave intent_* para resolução poliglota.'),

  visualHierarchy: z.enum(['PRIMARY', 'SECONDARY', 'SIDEBAR'])
    .default('PRIMARY')
    .describe('Nível de autoridade visual na árvore de componentes.'),

  children: z.custom<React.ReactNode>()
    .describe('Legos atômicos injetados na malha central.'),

  dictionary: z.record(z.string(), z.unknown())
    .describe('Silo linguístico regionalizado para transmutação do aparato.'),

  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
})
.brand<'SovereignSectionInput'>()
.readonly();

export type ISovereignSectionInput = z.infer<typeof SovereignSectionInputSchema>;