/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus ImpactMetricCard
 */

import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface IImpactMetricCard {
  readonly reputationScore: number;
  readonly metricLabel: string;
  readonly statusMessage: string;
}

export const ImpactMetricCard: React.FC<IImpactMetricCard> = ({
  reputationScore,
  metricLabel,
  statusMessage
}) => (
  <div className="p-8 border border-neutral-200 dark:border-white/5 rounded-xs bg-neutral-50/50 dark:bg-white/2 shadow-2xl transition-all hover:scale-[1.02] duration-500">
    <div className="flex items-center justify-between mb-5">
      <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-neutral-400">
        {metricLabel}
      </span>
      <Activity size={14} className="text-brand-action animate-pulse" />
    </div>
    <p className="text-5xl font-serif font-black text-brand-primary dark:text-white leading-none">
      {reputationScore}
      <span className="text-xs ml-3 text-brand-action italic font-medium uppercase tracking-tighter">Standing</span>
    </p>
    <div className="mt-8 flex items-center gap-2.5 text-[9px] font-mono text-neutral-500 uppercase tracking-tighter border-t border-neutral-200 dark:border-white/5 pt-4">
      <ShieldCheck size={12} className="text-green-500" />
      {statusMessage}
    </div>
  </div>
);