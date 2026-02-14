/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignHeaderBranding
 * @version 6.5.0
 * @protocol OEDP-V6.5 - High Precision & Kinetic Branding
 * @description Átomo mestre de identidade visual. Transmuta o rastro geográfico
 * em uma assinatura editorial prestigiosa com telemetria neural.
 */

'use client';

import React, { useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN */
import {
  SovereignHeaderBrandingSchema,
  type ISovereignHeaderBranding
} from './schemas/SovereignHeaderBranding.schema.js';

const SovereignHeaderBrandingComponent: React.FC<ISovereignHeaderBranding> = (properties) => {
  const apparatusName = 'SovereignHeaderBranding';
  const fileLocation = 'libs/foundation/ui-kit-atoms/src/lib/sovereign-header-branding/SovereignHeaderBranding.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Selagem de Rastro)
    const data = SovereignHeaderBrandingSchema.parse(properties);
    const { regionName, actionSuffix, isInteractive, correlationIdentifier } = data;

    // 2. TELEMETRIA SINCRO E PERFORMANCE (Pilar 6)
    useEffect(() => {
      const endTimestamp = performance.now();
      const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'BRANDING_IGNITION_SUCCESS',
        message: `Selo visual ancorado para a região: ${regionName}.`,
        correlationIdentifier,
        metadata: { latencyMs: ignitionLatency, region: regionName }
      });
    }, [regionName, correlationIdentifier, startTimestamp]);

    return (
      <div
        className={`flex flex-col items-start select-none group font-serif ${isInteractive ? 'cursor-default' : ''}`}
        role="banner"
      >
        {/* 🏛️ LOGO PRINCIPAL: Tipografia de Prestígio (Manifesto 0008) */}
        <motion.h1
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-black tracking-tighter text-brand-primary dark:text-white leading-none"
        >
          A GENTE VAI
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={regionName}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mt-1.5"
          >
            {/* 🛡️ LINHA CINÉTICA DE SOBERANIA (Action Cyan) */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[1.5px] w-6 bg-brand-action origin-left group-hover:w-10 transition-all duration-700"
            />

            <p className="italic text-sm md:text-base text-brand-action font-medium tracking-tight">
              <span className="text-neutral-400 dark:text-neutral-500 not-italic mr-1 text-[10px] uppercase tracking-widest font-sans font-black">
                #
              </span>
              {regionName} {actionSuffix}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    );

  } catch (caughtError) {
    // 3. RESILIÊNCIA FORENSE: Fallback para o Zenith Nacional
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-4008'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'MEDIUM',
      recoverySuggestion: 'Validar se o regionName detectado no Middleware possui caracteres ilegais.'
    });
  }
};

export const SovereignHeaderBranding = memo(SovereignHeaderBrandingComponent);
