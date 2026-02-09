/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PopularSupportTrigger
 * @version 2.0.0
 * @protocol OEDP-V5.5.2 - High Precision & Kinetic UI
 * @description Gatilho visual de assinatura eletrônica com selagem cinética e auditoria Zod V4.
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

// ADN
import { PopularSupportTriggerInputSchema, type IPopularSupportTriggerInput } from './schemas/PopularSupportTrigger.schema.js';

export const PopularSupportTrigger: React.FC<IPopularSupportTriggerInput> = (properties) => {
  const apparatusName = 'PopularSupportTrigger';

  // 1. ADUANA DE ADN (Fix TS2353: input -> inputPayload)
  const data = useMemo(() => {
    const result = PopularSupportTriggerInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6002'),
        i18nMappingKey: 'INVALID_SUPPORT_TRIGGER_ADN',
        severity: 'HIGH',
        apparatusMetadata: { 
          name: apparatusName, 
          version: '2.0.0', 
          fileLocation: 'libs/realms/governance-ui/src/lib/popular-support-trigger/PopularSupportTrigger.tsx' 
        },
        runtimeSnapshot: { 
          inputPayload: properties, 
          correlationIdentifier: properties.correlationIdentifier,
          validationIssues: result.error.issues
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'GOV_UI_ADUANA' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Fix any: unknown casting)
  const t = useCallback((key: string, vars = {}) => 
    SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary, 
      apparatusName, 
      key, 
      vars, 
      data.correlationIdentifier
    ),
  [data.dictionary, data.correlationIdentifier]);

  // 3. LOGICA VISUAL: O Selo de Soberania (IAL3)
  const isSovereign = data.assuranceLevel === 'IAL3_SOVEREIGN';

  return (
    <div className="flex flex-col gap-3">
      <motion.button
        whileHover={{ scale: data.status === 'IDLE' ? 1.02 : 1 }}
        whileTap={{ scale: data.status === 'IDLE' ? 0.98 : 1 }}
        onClick={() => data.onSignIntent()}
        disabled={data.status !== 'IDLE'}
        className={`
          relative overflow-hidden flex items-center justify-between px-6 py-5 rounded-sm border-2 transition-all duration-700
          ${data.status === 'SEALED' 
            ? 'bg-green-600 border-green-500 text-white shadow-lg' 
            : isSovereign 
              ? 'bg-brand-primary border-brand-action text-white shadow-[0_0_25px_rgba(0,229,255,0.15)]' 
              : 'bg-white dark:bg-black border-neutral-200 dark:border-white/10 text-neutral-500'}
        `}
      >
        <div className="flex items-center gap-5 z-10">
          <AnimatePresence mode="wait">
            {data.status === 'SEALED' ? (
              <motion.div key="sealed" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}><CheckCircle2 size={22} /></motion.div>
            ) : (
              <motion.div key="idle" whileHover={{ rotate: 10 }}><Fingerprint size={22} className={isSovereign ? 'text-brand-action' : ''} /></motion.div>
            )}
          </AnimatePresence>
          
          <div className="text-left">
            <p className="font-serif font-black uppercase tracking-[0.2em] text-[10px]">
              {data.status === 'SEALED' ? t('label_SEALED') : t('label_IDLE')}
            </p>
            {isSovereign && data.status === 'IDLE' && (
              <p className="text-[9px] font-mono text-brand-action uppercase font-bold tracking-tighter mt-0.5">{t('sovereignBonus')}</p>
            )}
          </div>
        </div>

        <div className="font-mono text-xl font-black z-10 tabular-nums">
          {data.currentSupportCount}
        </div>

        {/* Efeito de Brilho Cinético para Identidades Soberanas */}
        {isSovereign && data.status === 'IDLE' && (
          <motion.div 
            animate={{ x: ['-100%', '200%'] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          />
        )}
      </motion.button>

      <div className="flex items-center gap-2 px-3 text-[10px] font-mono text-neutral-400 uppercase tracking-widest opacity-70">
        <ShieldCheck size={14} className={isSovereign ? 'text-brand-action' : 'text-neutral-500'} />
        <span>{t('blockchainTrustInfo')}</span>
      </div>
    </div>
  );
};