import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type AdFormat } from '../schemas/AdVantagePreviewUI.schema.js';

interface IAdLivePreviewStage {
  readonly activeFormat: AdFormat;
  readonly regionName: string;
  readonly advertiserBrandName: string;
  readonly previewLabel: string;
}

export const AdLivePreviewStage: React.FC<IAdLivePreviewStage> = ({ 
  activeFormat, 
  regionName, 
  advertiserBrandName,
  previewLabel 
}) => {
  return (
    <div className="relative aspect-video w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-sm overflow-hidden flex items-center justify-center group">
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
         <div className="w-2 h-2 rounded-full bg-brand-action animate-ping" />
         <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{previewLabel}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFormat}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          className="w-full max-w-2xl px-12"
        >
          {activeFormat === 'NATIVE_INJECTION' && (
            <div className="p-8 bg-white dark:bg-neutral-800 border-l-4 border-brand-action shadow-2xl">
               <span className="text-[9px] font-mono text-brand-action uppercase font-black tracking-widest">Sponsored by {advertiserBrandName}</span>
               <h5 className="font-serif text-2xl font-black mt-3 text-neutral-800 dark:text-white">Conectando o futuro de {regionName}</h5>
               <div className="mt-6 h-40 bg-neutral-100 dark:bg-neutral-900 rounded-sm border border-dashed border-neutral-300 dark:border-white/10" />
            </div>
          )}
          {/* Outros formatos seriam atomizados aqui */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};