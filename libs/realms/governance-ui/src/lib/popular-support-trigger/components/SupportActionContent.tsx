/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SupportActionContent
 */
'use client';
import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle2 } from 'lucide-react';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { SupportActionContentInputSchema, type ISupportActionContentInput } from '../schemas/SupportActionContent.schema.js';

export const SupportActionContent: React.FC<ISupportActionContentInput> = (properties) => {
  const data = SupportActionContentInputSchema.parse(properties);
  
  const translate = useCallback((key: string) => 
    SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary, 
      'SupportActionContent', key, {}, data.correlationIdentifier
    ), [data]);

  return (
    <div className="flex items-center gap-5 z-10">
      <AnimatePresence mode="wait">
        {data.status === 'SEALED' ? (
          <motion.div key="sealed" initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={22} /></motion.div>
        ) : (
          <motion.div key="idle" whileHover={{ rotate: 10 }}><Fingerprint size={22} className={data.isSovereign ? 'text-brand-action' : ''} /></motion.div>
        )}
      </AnimatePresence>
      <div className="text-left">
        <p className="font-serif font-black uppercase tracking-[0.2em] text-[10px]">
          {data.status === 'SEALED' ? translate('label_SEALED') : translate('label_IDLE')}
        </p>
        {data.isSovereign && data.status === 'IDLE' && (
          <p className="text-[9px] font-mono text-brand-action uppercase font-bold mt-0.5">{translate('sovereignBonus')}</p>
        )}
      </div>
    </div>
  );
};