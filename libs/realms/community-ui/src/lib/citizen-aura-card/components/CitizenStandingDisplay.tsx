/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenStandingDisplay
 */
'use client';
import React, { useCallback } from 'react';
import { Award, ShieldAlert } from 'lucide-react';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { CitizenStandingDisplaySchema, type ICitizenStandingDisplay } from './schemas/CitizenStandingDisplay.schema.js';

export const CitizenStandingDisplay: React.FC<ICitizenStandingDisplay> = (properties) => {
  const data = CitizenStandingDisplaySchema.parse(properties);
  
  const t = useCallback((key: string) => 
    SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary, 
      'CitizenStandingDisplay', key, {}, data.correlationIdentifier
    ), [data]);

  return (
    <div className="flex flex-col gap-1.5 overflow-hidden">
      <h3 className="font-serif font-black text-brand-primary dark:text-white uppercase tracking-tighter text-xl leading-none truncate">
        {data.citizenName}
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 dark:bg-white/5 text-neutral-500 rounded-xs uppercase tracking-widest border border-neutral-200 dark:border-white/10">
          {data.humanizedRole}
        </span>
        <div className="flex items-center gap-1.5 text-brand-action">
          <Award size={12} />
          <span className="text-[11px] font-serif italic font-black uppercase tracking-tighter">
            {data.reputationScore} {t('standingPointsSuffix')}
          </span>
        </div>
      </div>
      {data.isSuspended && (
        <span className="flex items-center gap-1.5 text-red-500 text-[9px] font-black uppercase tracking-widest mt-1 animate-pulse">
          <ShieldAlert size={10} /> {t('suspendedStatusAlert')}
        </span>
      )}
    </div>
  );
};