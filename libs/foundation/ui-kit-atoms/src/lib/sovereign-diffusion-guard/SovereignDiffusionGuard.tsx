/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignDiffusionGuard
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Master Orchestration & Kinetic Integrity
 * @description Guardião de consentimento. Erradica o erro TS2353 ao sincronizar
 * o rastro de telemetria com o ADN Mestre do Logger.
 * @policy ZERO-ANY: Saneamento total via Zod parsing.
 */

'use client';

import React, { useMemo, useState, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Legos */
import {
  SovereignDiffusionGuardInputSchema,
  type ISovereignDiffusionGuard
} from './schemas/SovereignDiffusionGuard.schema.js';
import { DiffusionGuardHeader } from './components/DiffusionGuardHeader.js';

const SovereignDiffusionGuardComponent: React.FC<ISovereignDiffusionGuard> = (properties) => {
  const apparatusName = 'SovereignDiffusionGuard';
  const [internalBypassValue, setInternalBypassValue] = useState(properties.shouldBypassNextTime ?? false);

  // 1. ADUANA DE ADN (Fixação do rastro forense)
  const data = useMemo(() => SovereignDiffusionGuardInputSchema.parse(properties), [properties]);

  // 2. TELEMETRIA DE IGNIÇÃO (Cura TS2353: correlationIdentifier)
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'GUARD_IGNITION',
      message: `Aguardando consentimento soberano para difusão em ${data.targetPlatformName}.`,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data.targetPlatformName, data.correlationIdentifier]);

  // 3. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) =>
    SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      data.correlationIdentifier
    ), [data]);

  // 4. HANDLER DE DECISÃO SOBERANA
  const handleConsentSeal = useCallback((decision: boolean) => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'CONSENT_SEALED',
      message: `Decisão de difusão selada pelo cidadão. Bypass: ${decision}`,
      correlationIdentifier: data.correlationIdentifier
    });
    data.onConfirm(decision);
  }, [data]);

  if (!data.isConfirmationRequired) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
      >
        <motion.div
          initial={{ scale: 0.98, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-sm border border-neutral-200 dark:border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <DiffusionGuardHeader title={translate('confirmationTitle')} />

          <div className="p-12 flex flex-col gap-10">
            <p className="text-xl leading-relaxed text-neutral-600 dark:text-neutral-300 font-sans">
              {translate('confirmationDescription', { platform: data.targetPlatformName })}
            </p>

            <label className="flex items-center gap-5 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={internalBypassValue}
                  onChange={(event) => setInternalBypassValue(event.target.checked)}
                  className="peer h-6 w-6 appearance-none border-2 border-neutral-300 dark:border-white/10 rounded-xs checked:bg-brand-action checked:border-brand-action transition-all"
                />
                <motion.div
                  initial={false}
                  animate={{ scale: internalBypassValue ? 1 : 0 }}
                  className="absolute pointer-events-none text-black font-black"
                >
                  ✓
                </motion.div>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-brand-primary dark:group-hover:text-white transition-colors">
                {translate('bypassLabel')}
              </span>
            </label>
          </div>

          <div className="p-10 bg-neutral-50 dark:bg-white/2 flex flex-col md:flex-row gap-5 border-t border-neutral-100 dark:border-white/5">
             <button
                onClick={() => handleConsentSeal(false)}
                className="flex-1 py-5 text-[11px] font-black uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors duration-500"
             >
               {translate('cancelButton')}
             </button>
             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => handleConsentSeal(internalBypassValue)}
               className="flex-1 py-5 bg-brand-primary text-white dark:bg-brand-action dark:text-black text-[11px] font-black uppercase tracking-widest rounded-xs shadow-2xl"
             >
               {translate('confirmButton')}
             </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const SovereignDiffusionGuard = memo(SovereignDiffusionGuardComponent);
