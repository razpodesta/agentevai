/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionTrigger
 * @version 1.0.0
 * @description Átomo interativo que utiliza palavras e ícones cinéticos para selar a vontade.
 * @policy MOBILE-FIRST: Área de toque mínima de 44px e feedback haptic visual.
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Heart } from 'lucide-react'; // Fallbacks enquanto os assets 3D são injetados
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignReactionTriggerSchema,
  type ISovereignReactionTrigger
} from './schemas/SovereignReaction.schema.js';

export const SovereignReactionTrigger: React.FC<ISovereignReactionTrigger> = (properties) => {
  const apparatusName = 'SovereignReactionTrigger';

  // 1. Aduana de ADN
  const data = SovereignReactionTriggerSchema.parse(properties);

  // 2. Orquestração Estética (Manifesto 0008)
  const themeMap = {
    SUPPORT: {
      color: 'text-brand-action',
      bg: 'bg-brand-action/10',
      icon: ThumbsUp,
      labelKey: 'supportLabel'
    },
    REJECT: {
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      icon: ThumbsDown,
      labelKey: 'rejectLabel'
    },
    APPRECIATE: {
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
      icon: Heart,
      labelKey: 'appreciateLabel'
    }
  };

  const activeTheme = themeMap[data.reactionType];

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ y: -2 }}
      onClick={() => data.onInteractionIgnition(data.reactionType)}
      className={`
        flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-500
        font-serif font-bold uppercase tracking-tighter text-sm
        ${data.isUserActivelyEngaged ? `${activeTheme.bg} ${activeTheme.color} border-current shadow-lg` : 'border-neutral-200 text-neutral-500 hover:border-neutral-400'}
      `}
    >
      {/* Ícone Cinético */}
      <activeTheme.icon
        size={18}
        strokeWidth={data.isUserActivelyEngaged ? 3 : 2}
        className={data.isUserActivelyEngaged ? 'animate-pulse' : ''}
      />

      {/* A Palavra (O Ato de Vontade) */}
      <span>{activeTheme.labelKey}</span>

      {/* Contador de Impacto */}
      <span className="pl-2 border-l border-current/20 font-mono font-medium">
        {data.interactionCount}
      </span>
    </motion.button>
  );
};
