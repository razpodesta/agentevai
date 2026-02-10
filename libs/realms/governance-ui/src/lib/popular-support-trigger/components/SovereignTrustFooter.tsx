'use client';
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { SovereignTrustFooterSchema, type ISovereignTrustFooter } from '../schemas/SovereignTrustFooter.schema.js';

export const SovereignTrustFooter: React.FC<ISovereignTrustFooter> = (properties) => {
  const data = SovereignTrustFooterSchema.parse(properties);
  const trustMessage = SovereignTranslationEngine.translate(
    data.dictionary as unknown as ISovereignDictionary, 
    'SovereignTrustFooter', 'blockchainTrust', {}, data.correlationIdentifier
  );

  return (
    <div className="flex items-center gap-2 px-3 text-[10px] font-mono text-neutral-400 uppercase tracking-widest opacity-70">
      <ShieldCheck size={14} className={data.isSovereign ? 'text-brand-action' : 'text-neutral-500'} />
      <span>{trustMessage}</span>
    </div>
  );
};