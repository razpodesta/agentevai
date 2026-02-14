/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignMainHeader
 * @version 8.2.0
 * @protocol OEDP-V6.5 - Master DNA Orchestration
 * @description Orquestrador de autoridade de topo global.
 * CURADO: Resolvido TS2739 via injeção de rastro Branded no componente de Branding.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Moon, Sun, ShieldCheck, User } from 'lucide-react';

/** @section Reinos Federados (UI-Kit Atoms) */
import {
  SovereignHeaderBranding,
  SovereignHeaderBrandingSchema
} from '@agentevai/ui-kit-atoms';

import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section ADN Local */
import {
  SovereignMainHeaderInputSchema,
  type ISovereignMainHeaderInput
} from './schemas/SovereignMainHeader.schema.js';

const SovereignMainHeaderComponent: React.FC<ISovereignMainHeaderInput> = (properties) => {
  const apparatusName = 'SovereignMainHeader';
  const fileLocation = 'libs/foundation/ui-kit-organisms/src/lib/sovereign-main-header/SovereignMainHeader.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Fixação do Rastro e Validação)
    const data = SovereignMainHeaderInputSchema.parse(properties);
    const {
      dictionary, correlationIdentifier, activeTheme,
      assuranceLevel, regionNameOverride, onThemeToggle, onLanguageRequest
    } = data;

    // 2. RESOLUÇÃO SEMÂNTICA
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '8.2.0' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary,
        apparatusName,
        semanticKey,
        variables,
        correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    /**
     * @section CURA_TS2739: RE-SELAGEM NOMINAL
     * Injetamos o rastro e a marca nominal [$brand] no componente filho.
     */
    const headerBrandingProperties = useMemo(() => {
      return SovereignHeaderBrandingSchema.parse({
        regionName: regionNameOverride || translateLabel('defaultRegionName'),
        actionSuffix: translateLabel('actionSuffix'),
        isInteractive: true,
        correlationIdentifier: correlationIdentifier
      });
    }, [regionNameOverride, translateLabel, correlationIdentifier]);

    // 3. TELEMETRIA DE IGNIÇÃO
    useEffect(() => {
      const endTimestamp = performance.now();
      const executionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'GLOBAL_HEADER_STABILIZED',
        message: `Soberania visual estabilizada em ${executionLatency}ms.`,
        correlationIdentifier,
        metadata: { latencyMs: executionLatency, assuranceLevel }
      });
    }, [assuranceLevel, correlationIdentifier, startTimestamp]);

    const isSovereignVerified = assuranceLevel === 'IAL3_SOVEREIGN';
    const isMilkModeActive = activeTheme === 'MILK';

    return (
      <header className="sticky top-0 z-100 w-full border-b border-neutral-200 dark:border-white/10 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-3xl transition-all duration-1000">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between gap-12">

          {/* 🏛️ BRANDING REGIONAL (Selado via ADN Nominal) */}
          <div className="flex items-center gap-8">
            <SovereignHeaderBranding {...headerBrandingProperties} />
          </div>

          {/* 🛠️ CONTROLES DE ELITE */}
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4 border-r border-neutral-200 dark:border-white/10 pr-10">
              <button
                onClick={() => onLanguageRequest?.('switch')}
                className="p-3 text-neutral-500 hover:text-brand-primary dark:hover:text-brand-action transition-all duration-500"
                aria-label={translateLabel('languageSelectorAria')}
              >
                <Globe size={20} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => onThemeToggle?.(isMilkModeActive ? 'OBSIDIAN' : 'MILK')}
                className="p-3 relative overflow-hidden"
                aria-label={translateLabel('themeToggleAria')}
              >
                <AnimatePresence mode="wait">
                  {isMilkModeActive ? (
                    <motion.div key="sun" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
                      <Sun size={20} strokeWidth={1.5} className="text-amber-500" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}>
                      <Moon size={20} strokeWidth={1.5} className="text-brand-action" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* CONVERSÃO E IDENTIDADE */}
            <nav className="flex items-center gap-6">
              {isSovereignVerified ? (
                <div className="flex items-center gap-3 px-5 py-2 bg-brand-action/10 border border-brand-action/20 rounded-full">
                  <ShieldCheck size={16} className="text-brand-action animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-action">
                    {translateLabel('verificationLabel')}
                  </span>
                </div>
              ) : (
                <button className="flex items-center gap-2.5 text-[11px] font-serif font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-brand-primary transition-colors">
                  <User size={14} />
                  {translateLabel('loginButtonLabel')}
                </button>
              )}

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3.5 bg-brand-primary dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-xs shadow-2xl"
              >
                {translateLabel('subscribeButtonLabel')}
              </motion.button>
            </nav>
          </div>
        </div>
      </header>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-6002'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'HIGH'
    });
  }
};

export const SovereignMainHeader = memo(SovereignMainHeaderComponent);
