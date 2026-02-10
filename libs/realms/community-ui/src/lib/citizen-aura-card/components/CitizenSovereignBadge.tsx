/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenSovereignBadge
 */

'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const CitizenSovereignBadge: React.FC = () => (
  <div className="absolute -bottom-1 -right-1 p-1 bg-brand-action text-black rounded-full shadow-lg ring-2 ring-white dark:ring-neutral-900 z-10">
    <ShieldCheck size={14} strokeWidth={3} />
  </div>
);