/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PopularSupportTrigger
 * @version 4.0.0
 * @protocol OEDP-V5.5.2 - God Tier Atomization
 */
'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PopularSupportTriggerInputSchema, type IPopularSupportTriggerInput } from './schemas/PopularSupportTrigger.schema.js';
import { KineticSheenBackdrop } from './components/KineticSheenBackdrop.js';
import { SupportActionContent } from './components/SupportActionContent.js';
import { SovereignTrustFooter } from './components/SovereignTrustFooter.js';

export const PopularSupportTrigger: React.FC<IPopularSupportTriggerInput> = (properties) => {
  const data = useMemo(() => PopularSupportTriggerInputSchema.parse(properties), [properties]);
  const isSovereign = data.assuranceLevel === 'IAL3_SOVEREIGN';

  return (
    <div className="flex flex-col gap-4 w-full">
      <motion.button
        onClick={() => data.onSignIntent()}
        disabled={data.status !== 'IDLE'}
        className={`relative overflow-hidden flex items-center justify-between px-7 py-6 rounded-sm border-2 transition-all duration-1000 ${
          data.status === 'SEALED' ? 'bg-green-600 border-green-500 text-white shadow-2xl' :
          isSovereign ? 'bg-brand-primary border-brand-action text-white shadow-[0_0_40px_rgba(0,229,255,0.2)]' :
          'bg-white dark:bg-black border-neutral-200 dark:border-white/10 text-neutral-500'
        }`}
      >
        {isSovereign && data.status === 'IDLE' && <KineticSheenBackdrop isActive={true} />}
        
        <SupportActionContent 
          status={data.status} 
          isSovereign={isSovereign} 
          dictionary={data.dictionary} 
          correlationIdentifier={data.correlationIdentifier} 
        />

        <div className="font-mono text-2xl font-black z-10 tabular-nums tracking-tighter">
          {data.currentSupportCount}
        </div>
      </motion.button>

      <SovereignTrustFooter 
        isSovereign={isSovereign} 
        dictionary={data.dictionary} 
        correlationIdentifier={data.correlationIdentifier} 
      />
    </div>
  );
};