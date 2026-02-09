/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignSectionSchema
 * @version 2.1.0
 * @protocol OEDP-V5.5.2 - High Precision & Structural ADN
 * @description ADN que define o contrato de entrada para orquestradores de layout.
 * Integra intenção semântica com rastro de soberania linguística.
 */

import { z } from 'zod';
import type React from 'react';

/**
 * @section Dimensão Semântica
 * Define o propósito funcional da seção para decisão geométrica.
 */
export const SemanticIntentSchema = z.enum([
  'NATIONAL_ZENITH',      // Destaque de autoridade máxima (Hero)
  'REGIONAL_PULSE',       // Malha de notícias de fluxo local
  'INVESTIGATIVE_VAULT',  // Layout focado em conteúdo denso e rastro forense
  'COMMUNITY_THREAD'      // Listagem cronológica de pulso social
]).describe('Decide a geometria e o peso visual da seção na malha.')
  .brand<'SemanticIntent'>();

export type SemanticIntent = z.infer<typeof SemanticIntentSchema>;

/**
 * @name SovereignSectionInputSchema
 * @description Aduana de entrada estrita para o aparato SovereignSection.
 */
export const SovereignSectionInputSchema = z.object({
  /** Identificador único inalterável da seção para rastro de renderização */
  identifier: z.uuid(),
  
  semanticIntent: SemanticIntentSchema,
  
  /** 
   * Título editorial. 
   * Se iniciado com 'intent_', o componente buscará a tradução automática.
   */
  sectionTitle: z.string()
    .min(3)
    .describe('Título textual ou chave semântica (intent_*) para resolução i18n.'),

  /** Hierarquia visual conforme o Manifesto 0008 */
  visualHierarchy: z.enum(['PRIMARY', 'SECONDARY', 'SIDEBAR'])
    .default('PRIMARY')
    .describe('Nível de importância visual na árvore de componentes.'),

  /** 
   * Injeção de componentes atômicos (Legos). 
   * Usamos unknown + describe para facilitar a auditoria de filhos.
   */
  children: z.custom<React.ReactNode>()
    .describe('Nodos React que serão injetados na geometria da seção.'),

  /** 
   * @section Sincronia de Dicionário 
   * Erradicada a radiação de 'any'. Tipagem em conformidade com o rastro do Engine.
   */
  dictionary: z.record(z.string(), z.unknown())
    .describe('Fragmento de dicionário regional validado para tradução interna.'),

  /** UUID de correlação para vínculo com o SovereignLogger */
  correlationIdentifier: z.uuid()
}).readonly();

/**
 * @interface ISovereignSectionInput
 * @description Contrato imutável para propriedades do componente.
 */
export type ISovereignSectionInput = z.infer<typeof SovereignSectionInputSchema>;