/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionSchema
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision & Aesthetic DNA
 * @description ADN mestre que define a natureza semântica, técnica e estética
 * das interações sociais. Sincronizado para erradicar falhas de rastro forense.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZOD-V4-SYNC: Uso de construtores de topo e descrições densas para IA.
 */

import { z } from 'zod';
import {
  ThumbsUp,
  ThumbsDown,
  Heart,
  type LucideIcon
} from 'lucide-react';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/**
 * @section Dimensão Semântica (Reaction Type)
 * Branded Type nominal para evitar colisão com strings primitivas.
 */
export const ReactionTypeSchema = z.enum([
  'SUPPORT',    // Investimento de mérito social (Fé Pública)
  'REJECT',     // Sinalização de conduta imprópria ou fato inverídico
  'APPRECIATE'  // Engajamento de afinidade (Curtida tradicional)
])
.describe('Identificador nominal da natureza semântica do engajamento.')
.brand<'ReactionType'>();

export type ReactionType = z.infer<typeof ReactionTypeSchema>;

/**
 * @section Dimensão Estética (Visual Contract)
 */
export const ReactionVisualThemeSchema = z.object({
  colorClass: z.string().describe('Classes Tailwind para a cromática do texto e ícone.'),
  backgroundClass: z.string().describe('Classes Tailwind para o halo cinético de fundo.'),
  icon: z.custom<LucideIcon>().describe('Componente de ícone Lucide validado.'),
  labelKey: z.string().describe('Chave de tradução para o rótulo da reação.')
}).readonly();

export type IReactionVisualTheme = z.infer<typeof ReactionVisualThemeSchema>;

/**
 * @section Matriz Determinística de Temas (The Source of Truth)
 */
const REACTION_VISUAL_REGISTRY: Record<string, IReactionVisualTheme> = Object.freeze({
  SUPPORT: {
    colorClass: 'text-brand-action',
    backgroundClass: 'bg-brand-action/10',
    icon: ThumbsUp,
    labelKey: 'label_SUPPORT'
  },
  REJECT: {
    colorClass: 'text-red-500',
    backgroundClass: 'bg-red-500/10',
    icon: ThumbsDown,
    labelKey: 'label_REJECT'
  },
  APPRECIATE: {
    colorClass: 'text-pink-500',
    backgroundClass: 'bg-pink-500/10',
    icon: Heart,
    labelKey: 'label_APPRECIATE'
  }
});

/**
 * @name resolveSovereignReactionTheme
 * @function
 * @description Tradutor estrito que converte o tipo nominal no seu respectivo tema visual.
 */
export const resolveSovereignReactionTheme = (
  type: ReactionType,
  correlationIdentifier: string
): IReactionVisualTheme => {
  const theme = REACTION_VISUAL_REGISTRY[type as unknown as string];

  if (!theme) {
    throw new SovereignError({
      uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-7053'),
      i18nMappingKey: 'REACTION_THEME_NOT_FOUND',
      severity: 'CRITICAL',
      apparatusMetadata: {
        name: 'SovereignReactionSchema',
        version: '3.0.0',
        fileLocation: 'libs/realms/community-ui/src/lib/sovereign-reaction-trigger/schemas/SovereignReaction.schema.ts'
      },
      runtimeSnapshot: {
        inputPayload: { unresolvedReactionType: type },
        correlationIdentifier
      },
      forensicTrace: {
        timestamp: new Date().toISOString(),
        stack: new Error().stack || 'ST_UNAVAILABLE'
      }
    });
  }

  return theme;
};

/**
 * @name SovereignReactionTriggerInputSchema
 * @description Aduana de ADN para o aparato de disparo de reações.
 */
export const SovereignReactionTriggerInputSchema = z.object({
  reactionType: ReactionTypeSchema,
  interactionCount: z.number().int().nonnegative().describe('Volume de interações.'),
  isUserActivelyEngaged: z.boolean().describe('Estado de engajamento do visitante.'),
  onInteractionIgnition: z.function({
    input: z.tuple([ReactionTypeSchema]),
    output: z.void()
  }).describe('Callback de execução de vontade.'),
  dictionary: z.record(z.string(), z.record(z.string(), z.string())),
  correlationIdentifier: z.uuid()
    .describe('Identificador inalterável da jornada forense atual.')
}).readonly();

export type ISovereignReactionTrigger = z.infer<typeof SovereignReactionTriggerInputSchema>;
