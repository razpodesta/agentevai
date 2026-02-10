import React from 'react';
import { ShieldCheck, Share2 } from 'lucide-react';

interface IDiffusionGuardHeader { readonly title: string; }

export const DiffusionGuardHeader: React.FC<IDiffusionGuardHeader> = ({ title }) => (
  <div className="p-8 bg-brand-primary dark:bg-black flex justify-between items-center border-b border-white/5">
    <div className="flex items-center gap-3">
      <ShieldCheck className="text-brand-action" size={24} />
      <h2 className="font-serif font-black text-white uppercase tracking-tighter text-xl">{title}</h2>
    </div>
    <Share2 className="text-white/20" size={20} />
  </div>
);
