/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignEngagementTrigger
 * Descrição: Gatilho de ação cidadã com suporte a estados cinéticos e auditoria.
 * Rota Relativa: libs/foundation/ui-kit-atoms/src/lib/sovereign-engagement-trigger/SovereignEngagementTrigger.tsx
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { KineticBackdrop } from './KineticBackdrop';
import { SovereignEngagementTriggerSchema, ISovereignEngagementTrigger } from './schemas/SovereignEngagementTrigger.schema';

export const SovereignEngagementTrigger: React.FC<ISovereignEngagementTrigger> = (properties) => {
  const apparatusName = 'SovereignEngagementTrigger';

  // 1. Validação de Elite
  const data = useMemo(() => {
    return SovereignEngagementTriggerSchema.parse(properties);
  }, [properties]);

  const handleActionExecution = () => {
    if (data.status !== 'IDLE') return;

    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'ACTION_EXECUTION',
      message: `Gatilho acionado: ${data.label}`,
      metadata: { hierarchy: data.hierarchy }
    });

    data.onExecute();
  };

  // 3. Mapeamento Estético Soberano
  const hierarchyStyles = {
    PRIMARY: "bg-brand-primary text-white hover:brightness-110 shadow-xl",
    SECONDARY: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5",
    GHOST: "text-brand-action hover:bg-brand-action/10",
    CRITICAL: "bg-red-600 text-white animate-pulse shadow-red-900/20"
  };

  return (
    <motion.button
      whileHover={{ scale: data.status === 'IDLE' ? 1.02 : 1 }}
      whileTap={{ scale: data.status === 'IDLE' ? 0.98 : 1 }}
      onClick={handleActionExecution}
      disabled={data.status === 'DISABLED' || data.status === 'LOADING'}
      className={`
        relative overflow-hidden px-8 py-4 rounded-sm font-serif font-black uppercase tracking-widest
        transition-all duration-500 flex items-center justify-center gap-3 text-sm
        ${hierarchyStyles[data.hierarchy]}
        ${data.status === 'DISABLED' ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {data.hierarchy === 'PRIMARY' && <KineticBackdrop />}

      <AnimatePresence mode="wait">
        {data.status === 'LOADING' ? (
          <motion.div 
            key="loading" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px]">PROCESSANDO</span>
          </motion.div>
        ) : (
          <motion.span 
            key="label" 
            initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="relative z-10"
          >
            {data.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};