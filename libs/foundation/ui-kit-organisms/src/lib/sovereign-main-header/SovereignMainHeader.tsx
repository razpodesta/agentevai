/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignMainHeader
 * @description Orquestrador de autoridade de topo.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Globe, Moon, Sun } from 'lucide-react';
import { SovereignHeaderBranding } from '@agentevai/ui-kit-atoms';

export const SovereignMainHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">

        {/* 🏛️ Branding Regional */}
        <SovereignHeaderBranding regionName="Florianópolis" actionSuffix="em ação" />

        {/* 🛠️ Controles de Elite */}
        <div className="flex items-center gap-6">

          {/* Seletor de Idioma & Tema (Mobile-Hidden Labels) */}
          <div className="flex items-center gap-2 border-r border-neutral-200 dark:border-white/10 pr-6">
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full transition-colors">
              <Globe size={20} className="text-neutral-500" />
            </button>
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-full transition-colors">
              <Moon size={20} className="text-brand-action" />
            </button>
          </div>

          {/* Autenticação */}
          <nav className="flex items-center gap-4">
            <button className="text-sm font-serif font-bold uppercase tracking-widest text-neutral-500 hover:text-brand-primary dark:hover:text-white transition-colors">
              Entrar
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-brand-primary dark:bg-brand-action text-white dark:text-black text-[11px] font-black uppercase tracking-widest rounded-sm shadow-xl"
            >
              Inscreva-se
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};
