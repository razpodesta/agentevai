/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionTrigger
 * @version 4.0.0
 * @protocol OEDP-V6.0 - High Performance Kinetic UI
 * @description Atuador de vontade cidadã. 
 * Implementa animação de contador incremental e resolução de tema via matriz nominal.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN e Matriz */
import { 
  SovereignReactionTriggerInputSchema, 
  type ISovereignReactionTrigger 
} from './schemas/SovereignReaction.schema.js';
import { REACTION_VISUAL_MATRIX } from './constants/ReactionVisualMatrix.js';

const SovereignReactionTriggerComponent: React.FC<ISovereignReactionTrigger> = (properties) => {
  const apparatusName = 'SovereignReactionTrigger';
  const fileLocation = 'libs/realms/community-ui/src/lib/sovereign-reaction-trigger/SovereignReactionTrigger.tsx';

  // 1. ADUANA DE ADN (Fixação do Rastro de Soberania)
  const data = useMemo(() => {
    const result = SovereignReactionTriggerInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-7054'),
        i18nMappingKey: 'REACTION_TRIGGER_ADN_CORRUPTED',
        severity: 'MEDIUM',
        apparatusMetadata: { name: apparatusName, version: '4.0.0', fileLocation },
        runtimeSnapshot: { inputPayload: properties, correlationIdentifier: properties.correlationIdentifier, validationIssues: result.error.issues },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'UI_REACTION_IGNITION' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO DETERMINÍSTICA DE TEMA (Cura TS7053)
  const visualTheme = useMemo(() => {
    const theme = REACTION_VISUAL_MATRIX[data.reactionType as unknown as string];
    return theme || REACTION_VISUAL_MATRIX['APPRECIATE'];
  }, [data.reactionType]);

  // 3. TELEMETRIA DE POSICIONAMENTO
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'INTERACTION_NODE_MOUNTED',
      message: `Atuador [${data.reactionType}] selado para a jornada.`,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data.reactionType, data.correlationIdentifier]);

  // 4. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 1 }}
      whileHover={{ scale: 1.02, x: 2 }}
      onClick={() => data.onInteractionIgnition(data.reactionType)}
      aria-label={translate('ariaReactionStatus', {
        type: data.reactionType,
        count: data.interactionCount
      })}
      className={`
        relative flex items-center gap-5 px-8 py-4 rounded-xs border-2 transition-all duration-700
        font-serif font-black uppercase tracking-[0.2em] text-[10px] group
        ${data.isUserActivelyEngaged
          ? `${visualTheme.backgroundClass} ${visualTheme.colorClass} border-current shadow-[0_10px_30px_rgba(0,0,0,0.1)]`
          : 'border-neutral-100 dark:border-white/5 text-neutral-400 hover:border-brand-action/30 hover:text-brand-action'}
      `}
    >
      <div className="relative">
        <visualTheme.icon
          size={18}
          strokeWidth={data.isUserActivelyEngaged ? 3 : 2}
          className={data.isUserActivelyEngaged ? 'animate-pulse' : 'opacity-60 group-hover:opacity-100 transition-opacity'}
        />
      </div>

      <span className="leading-none select-none tracking-tighter">
        {translate(visualTheme.labelKey)}
      </span>

      <div className="h-4 w-[2px] bg-current opacity-10" />

      {/* 🔢 CONTADOR CINÉTICO (Animação de Valor) */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={data.interactionCount}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="font-mono font-black tabular-nums text-sm"
        >
          {data.interactionCount}
        </motion.span>
      </AnimatePresence>

      {/* Brilho de Ativação Soberana */}
      {data.isUserActivelyEngaged && (
        <motion.div 
          layoutId="active_glow"
          className="absolute inset-0 border-2 border-brand-action/40 rounded-xs"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

export const SovereignReactionTrigger = memo(SovereignReactionTriggerComponent);