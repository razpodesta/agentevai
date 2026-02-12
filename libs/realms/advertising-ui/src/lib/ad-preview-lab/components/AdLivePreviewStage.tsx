/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdLivePreviewStage
 * @version 6.1.0
 * @description Motor de renderização do rastro visual publicitário. 
 * Integra simulação de Google AdSense e Injeção Nativa.
 */

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { type AdFormat } from '../schemas/AdVantageContracts.schema.js';

interface IAdLivePreviewStage {
  readonly activeFormat: AdFormat;
  readonly regionName: string;
  readonly advertiserBrandName: string;
  readonly previewLabel: string;
}

const AdLivePreviewStageComponent: React.FC<IAdLivePreviewStage> = ({ 
  activeFormat, 
  regionName, 
  advertiserBrandName,
  previewLabel 
}) => {
  return (
    <div className="relative aspect-video w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-sm overflow-hidden flex items-center justify-center">
      
      {/* 🟢 INDICADOR DE STATUS LIVE */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10 px-4 py-1.5 bg-black/80 rounded-full border border-white/5">
         <div className="w-2 h-2 rounded-full bg-brand-action animate-pulse" />
         <span className="text-[9px] font-mono text-white uppercase tracking-[0.2em]">{previewLabel}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFormat}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl px-12"
        >
          {/* FORMATO: NATIVE EDITORIAL */}
          {activeFormat === 'EDITORIAL_NATIVE_BANNER' && (
            <div className="p-10 bg-white dark:bg-neutral-800 border-l-4 border-brand-action shadow-2xl">
               <span className="text-[9px] font-mono text-brand-action uppercase font-black tracking-widest">
                  Patrocínio Territorial: {advertiserBrandName}
               </span>
               <h5 className="font-serif text-3xl font-black mt-4 text-neutral-800 dark:text-white leading-tight">
                  Construindo a soberania digital em {regionName}
               </h5>
               <div className="mt-8 h-32 bg-neutral-50 dark:bg-neutral-900 rounded-xs border border-dashed border-neutral-300 dark:border-white/10 flex items-center justify-center">
                  <ExternalLink size={24} className="text-neutral-300" />
               </div>
            </div>
          )}

          {/* FORMATO: GOOGLE ADSENSE FALLBACK */}
          {activeFormat === 'GOOGLE_ADSENSE_FALLBACK' && (
            <div className="p-8 bg-neutral-100 dark:bg-white/2 border border-neutral-200 dark:border-white/5 text-center flex flex-col items-center gap-4">
               <div className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase rounded-full">
                  External Provider Active
               </div>
               <div className="w-full h-48 bg-neutral-200 dark:bg-black/40 flex items-center justify-center font-mono text-[10px] text-neutral-400">
                  [ SIMULADOR GOOGLE ADSENSE: INJEÇÃO AUTOMÁTICA ]
               </div>
               <p className="text-[9px] italic text-neutral-500">
                  Nota: Formato utilizado apenas em vácuo de inventário soberano.
               </p>
            </div>
          )}

          {/* Outros estados seriam injetados aqui conforme a evolução do Reino */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const AdLivePreviewStage = memo(AdLivePreviewStageComponent);