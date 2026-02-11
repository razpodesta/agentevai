/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ReactionVisualMatrix
 * @protocol OEDP-V6.0
 * @description Repositório imutável de temas para interações sociais.
 */

import { ThumbsUp, ThumbsDown, Heart, type LucideIcon } from 'lucide-react';

export interface IReactionTheme {
  readonly colorClass: string;
  readonly backgroundClass: string;
  readonly icon: LucideIcon;
  readonly labelKey: string;
}

/** 
 * @section Matriz Determinística
 * Indexada por strings literais para compatibilidade total com Branded Types.
 */
export const REACTION_VISUAL_MATRIX: Readonly<Record<string, IReactionTheme>> = Object.freeze({
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