/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignMainHeader
 * @version 8.0.0
 * @protocol OEDP-V6.0 - God Tier Implementation
 * @description Orquestrador de autoridade de topo. Saneado contra erros de
 * acesso indexado (TS4111) e vácuo de argumentos em funções (TS2554).
 * @policy ZERO-ANY: Saneamento absoluto.
 * @policy PROPERTY-DESTRUCTURING: Erradicação de falhas de assinatura de índice.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Moon, Sun, ShieldCheck, User } from 'lucide-react';
import { SovereignHeaderBranding } from '@agentevai/ui-kit-atoms';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN Local */
import {
  SovereignMainHeaderInputSchema,
  type ISovereignMainHeaderInput
} from './schemas/SovereignMainHeader.schema.js';

const SovereignMainHeaderComponent: React.FC<ISovereignMainHeaderInput> = (properties) => {
  const apparatusName = 'SovereignMainHeader';
  const fileLocation = 'libs/foundation/ui-kit-organisms/src/lib/sovereign-main-header/SovereignMainHeader.tsx';

  // 1. ADUANA DE ADN (Fixação do Rastro e Validação de Integridade)
  const validatedData = useMemo(() => {
    const result = SovereignMainHeaderInputSchema.safeParse(properties);

    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6002'),
        i18nMappingKey: 'INVALID_MAIN_HEADER_PROPERTIES',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '8.0.0', fileLocation },
        runtimeSnapshot: {
          inputPayload: properties,
          correlationIdentifier: properties.correlationIdentifier || 'ORPHAN_TRACE',
          validationIssues: result.error.issues
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'UI_IGNITION_FAILURE' }
      });
    }
    return result.data;
  }, [properties]);

  /**
   * @section CURA TS4111
   * Desestruturação imediata de todas as propriedades validadas.
   * Ao ancorar as funções em constantes locais, o TS permite a chamada com argumentos.
   */
  const {
    dictionary,
    correlationIdentifier,
    activeTheme,
    assuranceLevel,
    regionNameOverride,
    onThemeToggle,
    onLanguageRequest
  } = validatedData;

  // 2. TELEMETRIA DE SOBERANIA
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'GLOBAL_HEADER_MOUNTED',
      message: `Autoridade ativa. IAL: ${assuranceLevel} | Tema: ${activeTheme}`,
      correlationIdentifier: correlationIdentifier
    });
  }, [assuranceLevel, activeTheme, correlationIdentifier]);

  // 3. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  const isSovereignVerified = assuranceLevel === 'IAL3_SOVEREIGN';
  const isMilkModeActive = activeTheme === 'MILK';

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-white/10 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-3xl transition-all duration-1000"
      role="banner"
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between gap-12">

        {/* 🏛️ BRANDING REGIONAL */}
        <div className="flex items-center gap-8">
          <SovereignHeaderBranding
            regionName={regionNameOverride || translate('defaultRegionName')}
            actionSuffix={translate('actionSuffix')}
            isInteractive={true}
          />
        </div>

        {/* 🛠️ CONTROLES DE ELITE */}
        <div className="flex items-center gap-10">

          <div className="flex items-center gap-4 border-r border-neutral-200 dark:border-white/10 pr-10">
            {/* Cura TS2554: O argumento 'switch' é agora aceito pela assinatura customizada */}
            <button
              onClick={() => onLanguageRequest?.('switch')}
              className="p-3 text-neutral-500 hover:text-brand-primary dark:hover:text-brand-action transition-all duration-500"
              aria-label={translate('languageSelectorAria')}
            >
              <Globe size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => onThemeToggle?.(isMilkModeActive ? 'OBSIDIAN' : 'MILK')}
              className="p-3 relative overflow-hidden group"
              aria-label={translate('themeToggleAria')}
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
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-action">Sovereign Active</span>
              </div>
            ) : (
              <button className="flex items-center gap-2.5 text-[11px] font-serif font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-brand-primary transition-colors">
                <User size={14} />
                {translate('loginButtonLabel')}
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-3.5 bg-brand-primary dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-xs shadow-2xl"
            >
              {translate('subscribeButtonLabel')}
            </motion.button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export const SovereignMainHeader = memo(SovereignMainHeaderComponent);
