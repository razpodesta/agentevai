/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignReactionTrigger
 * @version 3.0.0
 * @protocol OEDP-V6.0 - God Tier Implementation
 * @description Atuador de vontade cidadã. Erradica o erro TS2353 ao sincronizar
 * o rastro de telemetria com o ADN Mestre do Logger.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total de tipos via Zod parsing.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import {
  SovereignReactionTriggerInputSchema,
  resolveSovereignReactionTheme,
  type ISovereignReactionTrigger
} from './schemas/SovereignReaction.schema.js';

const SovereignReactionTriggerComponent: React.FC<ISovereignReactionTrigger> = (properties) => {
  const apparatusName = 'SovereignReactionTrigger';

  // 1. ADUANA DE ADN (Garante integridade estrutural e fixa o rastro)
  const validatedData = useMemo(() =>
    SovereignReactionTriggerInputSchema.parse(properties),
  [properties]);

  // 2. RESOLUÇÃO DETERMINÍSTICA DE TEMA
  const visualTheme = useMemo(() =>
    resolveSovereignReactionTheme(validatedData.reactionType, validatedData.correlationIdentifier),
  [validatedData.reactionType, validatedData.correlationIdentifier]);

  // 3. TELEMETRIA DE POSICIONAMENTO (Cura do Erro TS2353)
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'INTERACTION_NODE_MOUNTED',
      message: `Atuador de [${validatedData.reactionType}] selado no rastro forense.`,
      correlationIdentifier: validatedData.correlationIdentifier // Sincronizado com OEDP-V6.0
    });
  }, [validatedData.reactionType, validatedData.correlationIdentifier]);

  // 4. RESOLUÇÃO SEMÂNTICA (Engine Elite)
  const translateLabel = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      validatedData.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      validatedData.correlationIdentifier
    );
  }, [validatedData.dictionary, validatedData.correlationIdentifier]);

  // 5. HANDLER DE DISPARO DE VONTADE
  const handleInteractionIgnition = useCallback(() => {
    validatedData.onInteractionIgnition(validatedData.reactionType);
  }, [validatedData]);

  return (
    <motion.button
      whileTap={{ scale: 0.95, y: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleInteractionIgnition}
      aria-label={translateLabel('ariaReactionStatus', {
        type: validatedData.reactionType,
        count: validatedData.interactionCount
      })}
      className={`
        relative flex items-center gap-4 px-7 py-3.5 rounded-full border transition-all duration-700
        font-serif font-black uppercase tracking-widest text-[11px] group
        ${validatedData.isUserActivelyEngaged
          ? `${visualTheme.backgroundClass} ${visualTheme.colorClass} border-current shadow-lg ring-1 ring-current/20`
          : 'border-neutral-200 dark:border-white/10 text-neutral-500 hover:border-brand-action/40 hover:text-brand-action'}
      `}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${validatedData.reactionType}-${validatedData.isUserActivelyEngaged}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <visualTheme.icon
            size={18}
            strokeWidth={validatedData.isUserActivelyEngaged ? 3 : 2}
            className={validatedData.isUserActivelyEngaged ? 'animate-pulse' : 'opacity-80 group-hover:opacity-100'}
          />
        </motion.div>
      </AnimatePresence>

      <span className="leading-none select-none">
        {translateLabel(visualTheme.labelKey)}
      </span>

      <div className="h-4 w-[1px] bg-current opacity-20" />

      <span className="font-mono font-black tabular-nums tracking-tighter text-sm">
        {validatedData.interactionCount}
      </span>
    </motion.button>
  );
};

export const SovereignReactionTrigger = memo(SovereignReactionTriggerComponent);
