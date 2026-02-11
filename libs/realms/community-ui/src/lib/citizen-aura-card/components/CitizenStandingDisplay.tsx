/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenStandingDisplay
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Visual Authority & Kinetic Logic
 * @description Exibidor de mérito social com rastro forense e animação cinética.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica militar.
 * @policy ZERO-ANY: Saneamento total de tipos via ADN nominal.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import { 
  CitizenStandingDisplayInputSchema, 
  type ICitizenStandingDisplayInput 
} from './schemas/CitizenStandingDisplay.schema.js';

const CitizenStandingDisplayComponent: React.FC<ICitizenStandingDisplayInput> = (properties) => {
  const apparatusName = 'CitizenStandingDisplay';

  // 1. ADUANA DE ADN (Fixação do Rastro de Soberania)
  const data = useMemo(() => 
    CitizenStandingDisplayInputSchema.parse(properties), 
  [properties]);

  // 2. TELEMETRIA DE IGNIÇÃO (Pilar 6)
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'MERIT_DISPLAY_MOUNTED',
      message: `Visualização de mérito ativa para rastro: ${data.citizenName}.`,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data.citizenName, data.correlationIdentifier]);

  // 3. RESOLUÇÃO SEMÂNTICA (Pilar 5)
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
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-2 overflow-hidden"
    >
      {/* 🏷️ IDENTIDADE NOMINAL */}
      <h3 className="font-serif font-black text-brand-primary dark:text-white uppercase tracking-tighter text-2xl leading-none truncate">
        {data.citizenName}
      </h3>

      {/* 📊 MATRIZ DE MÉRITO */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-mono px-3 py-1 bg-neutral-100 dark:bg-white/5 text-neutral-500 rounded-xs uppercase tracking-widest border border-neutral-200 dark:border-white/10">
          {data.humanizedRole}
        </span>

        <div className="flex items-center gap-2 text-brand-action">
          <Award size={14} className="animate-pulse" />
          <span className="text-[12px] font-serif italic font-black uppercase tracking-tighter">
            {data.reputationScore} {translate('standingPointsLabel')}
          </span>
        </div>
      </div>

      {/* 🛡️ ESTADO DE EXCEÇÃO (RESTRIÇÃO) */}
      {data.isSuspended && (
        <motion.span 
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest mt-1"
        >
          <ShieldAlert size={12} /> {translate('suspendedStatusAlert')}
        </motion.span>
      )}
    </motion.div>
  );
};

export const CitizenStandingDisplay = memo(CitizenStandingDisplayComponent);