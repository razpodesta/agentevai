/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUI
 * @version 6.2.0
 * @protocol OEDP-V6.0 - High Performance & Forensic Integrity
 * @description Orquestrador do laboratório de publicidade. 
 * CURADO: Resolvidos os erros TS2339 (Naming) e TS2739 (Prop Drilling).
 */

'use client';

import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { ShieldCheck, Target, Zap } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Legos */
import { 
  AdVantagePreviewUIInputSchema, 
  type IAdVantagePreviewUIInput, 
  type AdFormat 
} from './schemas/AdVantageContracts.schema.js';
import { AdFormatSwitcher } from './components/AdFormatSwitcher.js';
import { AdLivePreviewStage } from './components/AdLivePreviewStage.js';

export const AdVantagePreviewUI: React.FC<IAdVantagePreviewUIInput> = (inputParameters) => {
  const apparatusName = 'AdVantagePreviewUI';
  const fileLocation = 'libs/realms/advertising-ui/src/lib/ad-preview-lab/AdVantagePreviewUI.tsx';

  // Gestão de Estado Local para Simulação Cinética
  const [activeFormat, setActiveFormat] = useState<AdFormat>(inputParameters.activeFormat);

  // 1. ADUANA DE ADN (Garante integridade e fixa o rastro)
  const data = useMemo(() => {
    const result = AdVantagePreviewUIInputSchema.safeParse({ ...inputParameters, activeFormat });
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-8001'),
        i18nMappingKey: 'INVALID_SIMULATOR_PROPERTIES',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '6.2.0', fileLocation },
        runtimeSnapshot: { 
          inputPayload: inputParameters, 
          correlationIdentifier: inputParameters.correlationIdentifier,
          validationIssues: result.error.issues 
        },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'AD_LAB_IGNITION' }
      });
    }
    return result.data;
  }, [inputParameters, activeFormat]);

  /** 
   * @section CURA_TS2339 
   * Uso dos termos integrais 'geographicScope' e 'businessSector' conforme o ADN.
   */
  const { 
    regionName, 
    advertiserBrandName, 
    dictionary, 
    correlationIdentifier, 
    geographicScope, 
    businessSector 
  } = data;

  // 2. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      variables,
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  // 3. TELEMETRIA SINCRO
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'LAB_MOUNTED',
      message: `Simulador Publicitário ativo: [${businessSector}] | Escopo: [${geographicScope}].`,
      correlationIdentifier
    });
  }, [geographicScope, businessSector, correlationIdentifier]);

  const handleFormatChange = useCallback((requestedFormat: AdFormat) => {
    setActiveFormat(requestedFormat);
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'FORMAT_SWITCH',
      message: translate('logFormatSwitched', { 
        format: requestedFormat as unknown as string, 
        region: regionName 
      }),
      correlationIdentifier
    });
  }, [regionName, correlationIdentifier, translate]);

  return (
    <div className="flex flex-col gap-10 p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 rounded-xs shadow-2xl transition-all duration-1000">
      
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 border-b border-neutral-100 dark:border-white/5 pb-10">
        <div className="flex items-start gap-5">
          <div className="p-3 bg-brand-action/10 rounded-full text-brand-action">
            <Target size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-action font-black">{translate('labTitle')}</h4>
            <p className="font-serif italic text-4xl text-brand-primary dark:text-white mt-2 leading-none">
              {translate('labSubtitle', { scope: geographicScope })}: <span className="text-brand-action">{regionName}</span>
            </p>
          </div>
        </div>

        {/** 
         * @section CURA_TS2739 
         * Injeção mandatória de dicionário e identificador para o sub-aparato.
         */}
        <AdFormatSwitcher 
          activeFormat={activeFormat} 
          onFormatChange={handleFormatChange}
          dictionary={dictionary}
          correlationIdentifier={correlationIdentifier}
        />
      </header>

      {/* 📦 PALCO ATOMIZADO */}
      <AdLivePreviewStage 
        activeFormat={activeFormat}
        regionName={regionName}
        advertiserBrandName={advertiserBrandName}
        previewLabel={translate('previewMode_LIVE')}
      />

      <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-neutral-100 dark:border-white/5 pt-8">
        <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400">
          <ShieldCheck size={18} className="text-green-500" />
          <span className="uppercase tracking-widest">{translate('ethicsSeal')}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 dark:bg-white/5 rounded-full text-[9px] font-black uppercase text-neutral-500 tracking-tighter border border-neutral-200 dark:border-white/10">
            <Zap size={10} className="text-brand-action" />
            Sector: {businessSector}
          </div>
        </div>
      </footer>
    </div>
  );
};