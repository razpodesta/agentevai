/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUI
 * @version 6.5.8
 * @protocol OEDP-V6.5 - Zenith Implementation
 * @description Orquestrador do laboratório publicitário.
 * CURADO: Erradicada radiação de linter (@typescript-eslint/no-unused-vars).
 */

'use client';

import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section ADN e Sub-Legos */
import {
  AdVantagePreviewUIInputSchema,
  type IAdVantagePreviewUIInput,
  type AdFormat
} from './schemas/AdVantagePreviewUI.schema.js';
import { AdFormatSwitcher } from './components/AdFormatSwitcher.js';
import { AdLivePreviewStage } from './components/AdLivePreviewStage.js';

const AdVantagePreviewUIComponent: React.FC<IAdVantagePreviewUIInput> = (properties) => {
  const apparatusName = 'AdVantagePreviewUI';
  const fileLocation = 'libs/realms/advertising-ui/src/lib/ad-preview-lab/AdVantagePreviewUI.tsx';
  const startTimestamp = performance.now();

  const [internalActiveFormat, setInternalActiveFormat] = useState<AdFormat>(properties.activeFormat);

  try {
    // 1. ADUANA DE ADN (Fixação de Rastro)
    const data = AdVantagePreviewUIInputSchema.parse({ ...properties, activeFormat: internalActiveFormat });
    const { regionName, advertiserBrandName, dictionary, correlationIdentifier, advertiserType } = data;

    // 2. ORQUESTRAÇÃO SEMÂNTICA
    const sovereignDictionary = useMemo(() => ({
      metadata: { locale: 'pt-BR', version: '6.5.8' },
      content: dictionary
    } as unknown as ISovereignDictionary), [dictionary]);

    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      return SovereignTranslationEngine.translate(
        sovereignDictionary, apparatusName, semanticKey, variables, correlationIdentifier
      );
    }, [sovereignDictionary, correlationIdentifier]);

    // 3. TELEMETRIA SINCRO
    useEffect(() => {
      const ignitionLatency = parseFloat((performance.now() - startTimestamp).toFixed(4));
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'AD_LAB_IGNITION_SUCCESS',
        message: translateLabel('logLabIgnition', { sector: advertiserType as unknown as string }),
        correlationIdentifier,
        metadata: { latencyMs: ignitionLatency, format: internalActiveFormat }
      });
    }, [correlationIdentifier, internalActiveFormat, advertiserType, translateLabel, startTimestamp]);

    // 4. HANDLER DE TRANSMUTAÇÃO
    const handleFormatChange = useCallback((requestedFormat: AdFormat) => {
      setInternalActiveFormat(requestedFormat);
      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'FORMAT_TRANSMUTED',
        message: translateLabel('logFormatSwitched', { format: requestedFormat as unknown as string, region: regionName }),
        correlationIdentifier
      });
    }, [regionName, correlationIdentifier, translateLabel]);

    return (
      <div className="flex flex-col gap-12 p-12 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 rounded-xs shadow-2xl transition-all duration-1000 antialiased">
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 border-b border-neutral-100 dark:border-white/5 pb-10">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-brand-action/10 rounded-full text-brand-action shadow-[0_0_30px_rgba(0,229,255,0.15)]">
              <Target size={36} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.6em] text-brand-action font-black">{translateLabel('labTitle')}</h4>
              <p className="font-serif italic text-4xl text-brand-primary dark:text-white mt-2 leading-none">{translateLabel('labSubtitle', { scope: regionName })}</p>
            </div>
          </div>
          <AdFormatSwitcher activeFormat={internalActiveFormat} onFormatChange={handleFormatChange} dictionary={dictionary} correlationIdentifier={correlationIdentifier} />
        </header>

        <AdLivePreviewStage activeFormat={internalActiveFormat} regionName={regionName} advertiserBrandName={advertiserBrandName} previewLabel={translateLabel('previewMode_LIVE')} />

        <footer className="flex flex-wrap items-center justify-between gap-8 border-t border-neutral-100 dark:border-white/5 pt-10">
          <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-400">
            <ShieldCheck size={20} className="text-green-500 animate-pulse" />
            <span className="uppercase tracking-[0.2em]">{translateLabel('ethicsSeal')}</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-2 bg-neutral-100 dark:bg-white/5 rounded-full text-[9px] font-black uppercase text-neutral-500 tracking-widest border border-neutral-200 dark:border-white/10 shadow-sm">
            <Zap size={12} className="text-brand-action" /> Trace: {advertiserType as unknown as string}
          </div>
        </footer>
      </div>
    );
  } catch (caughtError) {
    // 5. RESILIÊNCIA ZENITH (Consumo de variáveis de qualidade)
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-8001'),
      apparatus: apparatusName,
      location: fileLocation, // ✅ CURADO: fileLocation consumido
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'CRITICAL'
    });
  }
};

export const AdVantagePreviewUI = memo(AdVantagePreviewUIComponent);
