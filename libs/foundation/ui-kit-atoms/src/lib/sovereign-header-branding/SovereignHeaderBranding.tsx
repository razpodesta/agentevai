/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignHeaderBranding
 * @version 1.0.0
 * @protocol OEDP-V5.5 - High Precision & Kinetic Branding
 * @description Átomo mestre de identidade visual. Transmuta o nome da localidade
 * em uma assinatura editorial imersiva (Ex: Florianópolis em ação).
 * @policy LINGUISTIC_SOVEREIGNTY: Utiliza injeção via i18n para sufixos dinâmicos.
 */

'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { SovereignLogger } from '@agentevai/sovereign-logger';

/**
 * @section Aduana de ADN (Fronteira Local)
 */
const SovereignHeaderBrandingSchema = z.object({
  regionName: z.string().min(2).describe('Nome da localidade detectada pelo Middleware.'),
  actionSuffix: z.string().describe('Sufixo traduzido (Ex: "em ação", "en acción").'),
  isInteractive: z.boolean().default(true).describe('Habilita micro-interações de hover.'),
}).readonly();

export type ISovereignHeaderBranding = z.infer<typeof SovereignHeaderBrandingSchema>;

/**
 * @name SovereignHeaderBranding
 * @component
 */
export const SovereignHeaderBranding: React.FC<ISovereignHeaderBranding> = (properties) => {
  const apparatusName = 'SovereignHeaderBranding';

  // 1. Validação de Integridade
  const data = useMemo(() => {
    try {
      return SovereignHeaderBrandingSchema.parse(properties);
    } catch (error) {
      SovereignLogger({
        severity: 'ERROR',
        apparatus: apparatusName,
        operation: 'ADN_VALIDATION_FAILED',
        message: 'Propriedades de branding inválidas.',
        metadata: { properties }
      });
      throw error;
    }
  }, [properties]);

  return (
    <div className="flex flex-col items-start select-none group cursor-default">
      {/* Logo Principal: Tipografia Playfair Display Bold (Sovereign Navy) */}
      <motion.h1
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-serif font-black tracking-tighter text-brand-primary dark:text-white leading-none"
      >
        A GENTE VAI
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={data.regionName}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mt-1"
        >
          {/* Linha Cinética de Soberania (Action Cyan) */}
          <span className="h-[1px] w-6 bg-brand-action scale-x-100 group-hover:w-10 transition-all duration-500 origin-left" />

          <p className="font-serif italic text-sm md:text-base text-brand-action font-medium tracking-tight">
            <span className="text-neutral-500 dark:text-neutral-400 not-italic mr-1 text-xs uppercase tracking-widest font-sans">
              #
            </span>
            {data.regionName} {data.actionSuffix}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
