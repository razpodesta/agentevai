import React from 'react';

interface ISectionHeader {
  readonly title: string;
  readonly hierarchy: 'PRIMARY' | 'SECONDARY' | 'SIDEBAR';
}

export const SectionHeader: React.FC<ISectionHeader> = ({ title, hierarchy }) => {
  return (
    <header className="mb-10 flex items-center gap-6 group">
      <h2 className={`
        font-serif font-black uppercase tracking-[0.3em] transition-colors duration-500
        ${hierarchy === 'PRIMARY' ? 'text-lg text-brand-primary dark:text-brand-action' : 'text-sm text-neutral-400'}
      `}>
        {title}
      </h2>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-200 dark:from-white/10 to-transparent group-hover:from-brand-action/40 transition-all duration-700" />
    </header>
  );
};