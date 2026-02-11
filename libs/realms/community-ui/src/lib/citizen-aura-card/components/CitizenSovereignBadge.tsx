/**
 * @author Raz Podestá - MetaShark Tech
 */
import React from 'react';
import { ShieldCheck } from 'lucide-react';

/** @section Sincronia de ADN (Cura TS2322) */
interface ICitizenSovereignBadge {
  readonly isVisible: boolean;
}

export const CitizenSovereignBadge: React.FC<ICitizenSovereignBadge> = ({ isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="absolute -bottom-1 -right-1 p-1 bg-brand-action text-black rounded-full shadow-lg ring-2 ring-white dark:ring-neutral-900 z-10">
      <ShieldCheck size={14} strokeWidth={3} />
    </div>
  );
};