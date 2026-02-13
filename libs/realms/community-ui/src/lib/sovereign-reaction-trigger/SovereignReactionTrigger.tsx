/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionTrigger
 * @version 6.5.0
 * @protocol OEDP-V6.5 - High Performance Kinetic UI
 * @description Atuador de vontade cidadã. Saneado contra falhas de indexação e telemetria.
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
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = SovereignReactionTriggerInputSchema.parse(properties);
    const { correlationIdentifier, dictionary, reactionType, interactionCount, isUserActivelyEngaged } = data;

    // 2. RESOLUÇÃO DETERMINÍSTICA DE TEMA (Cura TS7053)
    const visualTheme = useMemo(() => {
      const typeKey = reactionType as unknown as string;
      return REACTION_VISUAL_MATRIX[typeKey] || REACTION_VISUAL_MATRIX['APPRECIATE'];
    }, [reactionType]);

    // 3. RESOLUÇÃO SEMÂNTICA (Pilar 5)
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '1.0.0' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary,
        apparatusName,
        semanticKey,
        variables,
        correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    // 4. TELEMETRIA SINCRO E PERFORMANCE (Pilar 6)
    useEffect(() => {
      const endTimestamp = performance.now();
      const mountingLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'INTERACTION_NODE_MOUNTED',
        message: `Atuador de [${reactionType}] selado no rastro forense.`,
        correlationIdentifier,
        metadata: { latencyMs: mountingLatency }
      });
    }, [reactionType, correlationIdentifier, startTimestamp]);

    // 5. HANDLER DE DISPARO DE VONTADE
    const handleInteractionIgnition = useCallback(() => {
      const interactionStart = performance.now();
      
      data.onInteractionIgnition(reactionType);

      const interactionEnd = performance.now();
      const interactionLatency = parseFloat((interactionEnd - interactionStart).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'WILL_ACT_DISPATCHED',
        message: translateLabel('logInteractionSuccess', { type: reactionType }),
        correlationIdentifier,
        metadata: { latencyMs: interactionLatency, type: reactionType }
      });
    }, [data, reactionType, correlationIdentifier, translateLabel]);

    return (
      <motion.button
        whileTap={{ scale: 0.95, y: 1 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleInteractionIgnition}
        aria-label={translateLabel('ariaReactionStatus', {
          type: reactionType,
          count: interactionCount
        })}
        className={`
          relative flex items-center gap-5 px-8 py-4 rounded-xs border-2 transition-all duration-700
          font-serif font-black uppercase tracking-[0.2em] text-[10px] group
          ${isUserActivelyEngaged
            ? `${visualTheme.backgroundClass} ${visualTheme.colorClass} border-current shadow-2xl ring-1 ring-current/20`
            : 'border-neutral-100 dark:border-white/5 text-neutral-400 hover:border-brand-action/30 hover:text-brand-action'}
        `}
      >
        <div className="relative">
          <visualTheme.icon
            size={18}
            strokeWidth={isUserActivelyEngaged ? 3 : 2}
            className={isUserActivelyEngaged ? 'animate-pulse' : 'opacity-60 group-hover:opacity-100 transition-opacity'}
          />
        </div>

        <span className="leading-none select-none tracking-tighter">
          {translateLabel(visualTheme.labelKey)}
        </span>

        <div className="h-4 w-[2px] bg-current opacity-10" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={interactionCount}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="font-mono font-black tabular-nums text-sm"
          >
            {interactionCount}
          </motion.span>
        </AnimatePresence>

        {/* 🎇 AURA CINÉTICA DE ATIVAÇÃO */}
        {isUserActivelyEngaged && (
          <motion.div 
            layoutId="reaction_active_glow"
            className="absolute inset-0 border-2 border-current opacity-30 rounded-xs"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.button>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-7054'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'CRITICAL',
      recoverySuggestion: 'Validar a integridade da REACTION_VISUAL_MATRIX ou o rastro de ADN do cidadão.'
    });
  }
};

export const SovereignReactionTrigger = memo(SovereignReactionTriggerComponent);