/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUI
 * @version 2.2.0
 * @protocol OEDP-V5.5.1
 * @description Orquestrador do laboratório de simulação publicitária. Saneado e Atomizado.
 */

'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { ShieldCheck } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

// ADN e Sub-aparatos
import { AdVantagePreviewUIInputSchema, type IAdVantagePreviewUIInput, type AdFormat } from './schemas/AdVantagePreviewUI.schema.js';
import { AdFormatSwitcher } from './components/AdFormatSwitcher.js';
import { AdLivePreviewStage } from './components/AdLivePreviewStage.js';

export const AdVantagePreviewUI: React.FC<IAdVantagePreviewUIInput> = (properties) => {
  const apparatusName = 'AdVantagePreviewUI';
  const [activeFormat, setActiveFormat] = useState<AdFormat>(properties.activeFormat || 'NATIVE_INJECTION' as AdFormat);

  // 1. ADUANA DE ADN (Cura do Erro TS2353)
  const data = useMemo(() => {
    const result = AdVantagePreviewUIInputSchema.safeParse({ ...properties, activeFormat });
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-8001'),
        i18nMappingKey: 'INVALID_SIMULATOR_PROPERTIES',
        severity: 'MEDIUM',
        apparatusMetadata: { 
          name: apparatusName, 
          version: '2.2.0', 
          fileLocation: 'libs/realms/advertising-ui/src/lib/ad-preview-lab/AdVantagePreviewUI.tsx' 
        },
        runtimeSnapshot: { 
          inputPayload: properties, // FIX: de 'input' para 'inputPayload'
          correlationIdentifier: properties.correlationIdentifier,
          validationIssues: result.error.issues 
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'AD_LAB_IGNITION' }
      });
    }
    return result.data;
  }, [properties, activeFormat]);

  // 2. RESOLUÇÃO SEMÂNTICA (Cura da Radiação technical - any)
  const t = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary, // Casting seguro para tipo SSOT
      apparatusName,
      key,
      variables,
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  const handleFormatChange = useCallback((format: AdFormat) => {
    setActiveFormat(format);
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'FORMAT_SWITCH',
      message: `Simulador alterado para ${format}`,
      traceIdentifier: data.correlationIdentifier
    });
  }, [data.correlationIdentifier]);

  return (
    <div className="flex flex-col gap-8 p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 rounded-sm shadow-2xl transition-all duration-700">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-neutral-100 dark:border-white/5 pb-8">
        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-action">{t('labTitle')}</h4>
          <p className="font-serif italic text-3xl text-brand-primary dark:text-white mt-1">
            {t('labSubtitle')}: <span className="text-brand-action">{data.regionName}</span>
          </p>
        </div>
        <AdFormatSwitcher activeFormat={activeFormat} onFormatChange={handleFormatChange} />
      </header>

      {/* 📦 PALCO ATOMIZADO */}
      <AdLivePreviewStage 
        activeFormat={activeFormat}
        regionName={data.regionName}
        advertiserBrandName={data.advertiserBrandName}
        previewLabel={t('previewModeLabel')}
      />

      <footer className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 border-t border-neutral-100 dark:border-white/5 pt-6">
        <ShieldCheck size={16} className="text-green-500" />
        <span className="uppercase tracking-widest">{t('ethicsDeclaration')}</span>
      </footer>
    </div>
  );
};