/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenStandingDisplay
 * @version 6.5.0
 * @protocol OEDP-V6.5 - Visual Authority & Kinetic Logic
 * @description Exibidor de mérito social com rastro forense e animação cinética.
 * CURADO: Erradicado TS2724, radiação de any e vácuo de telemetria.
 */

'use client';

import React, { useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldAlert } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Local */
import { 
  CitizenStandingDisplayInputSchema, 
  type ICitizenStandingDisplayInput 
} from './schemas/CitizenStandingDisplay.schema.js';

const CitizenStandingDisplayComponent: React.FC<ICitizenStandingDisplayInput> = (properties) => {
  const apparatusName = 'CitizenStandingDisplay';
  const fileLocation = 'libs/realms/community-ui/src/lib/citizen-aura-card/components/CitizenStandingDisplay.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = CitizenStandingDisplayInputSchema.parse(properties);
    const { correlationIdentifier, dictionary, citizenName, reputationScore } = data;

    // 2. RESOLUÇÃO SEMÂNTICA (Pilar 5)
    const translateLabel = useCallback((semanticKey: string) => {
      /** 
       * Transmuta o fragmento para a interface de dicionário exigida.
       * A marca nominal é preservada no rastro de execução.
       */
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '1.0.0' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary,
        apparatusName,
        semanticKey,
        {},
        correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    // 3. TELEMETRIA SINCRO E PERFORMANCE (Pilar 6)
    useEffect(() => {
      const endTimestamp = performance.now();
      const mountingLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'MERIT_DISPLAY_MOUNTED',
        message: `Display de mérito selado para ${citizenName}.`,
        correlationIdentifier,
        metadata: { 
          latencyMs: mountingLatency,
          standingScore: reputationScore 
        }
      });
    }, [citizenName, correlationIdentifier, reputationScore, startTimestamp]);

    return (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2 overflow-hidden"
      >
        {/* 🏷️ IDENTIDADE NOMINAL */}
        <h3 className="font-serif font-black text-brand-primary dark:text-white uppercase tracking-tighter text-2xl leading-none truncate">
          {citizenName}
        </h3>

        {/* 📊 MATRIZ DE MÉRITO */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-mono px-3 py-1 bg-neutral-100 dark:bg-white/5 text-neutral-500 rounded-xs uppercase tracking-widest border border-neutral-200 dark:border-white/10">
            {data.humanizedRole}
          </span>

          <div className="flex items-center gap-2 text-brand-action">
            <Award size={14} className="animate-pulse" />
            <span className="text-[12px] font-serif italic font-black uppercase tracking-tighter">
              {reputationScore} {translateLabel('standingPointsLabel')}
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
            <ShieldAlert size={12} /> {translateLabel('suspendedStatusAlert')}
          </motion.span>
        )}
      </motion.div>
    );

  } catch (caughtError) {
    // 4. RESILIÊNCIA FORENSE
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-4006'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Validar integridade do rastro de Standing e o mapeamento do dicionário de mérito.'
    });
  }
};

export const CitizenStandingDisplay = memo(CitizenStandingDisplayComponent);