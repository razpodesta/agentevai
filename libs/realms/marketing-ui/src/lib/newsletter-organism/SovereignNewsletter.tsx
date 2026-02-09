/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignNewsletter
 */

import React from 'react';

export const SovereignNewsletter: React.FC = () => {
  return (
    <section className="w-full py-20 bg-neutral-50 dark:bg-white/5 border-y border-neutral-200 dark:border-white/5">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-serif font-black text-brand-primary dark:text-white leading-tight tracking-tighter">
            O PULSO DA SOBERANIA <br />
            <span className="text-brand-action italic font-medium">DIRETO NO SEU E-MAIL.</span>
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-md">
            Receba auditorias de transparência e denúncias críticas do seu estado antes de chegarem à grande mídia.
          </p>
        </div>

        <form className="w-full md:w-[400px] flex flex-col gap-3">
          <input
            type="email"
            placeholder="seu@email-soberano.com"
            className="w-full px-6 py-4 bg-white dark:bg-black border border-neutral-200 dark:border-white/10 rounded-sm font-mono text-sm focus:ring-2 focus:ring-brand-action outline-none"
          />
          <button className="w-full py-4 bg-brand-primary dark:bg-white text-white dark:text-black font-serif font-black uppercase tracking-[0.2em] text-xs transition-all hover:brightness-110">
            Garantir Acesso
          </button>
        </form>
      </div>
    </section>
  );
};
