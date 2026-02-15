/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdVantagePreviewUI
 * @version 6.5.8
 * @protocol OEDP-V6.5 - High Performance Conversion
 * @description Orquestrador do laboratório de impacto publicitário.
 * CURADO: Integrado ao SovereignApparatusRegistry e orquestração de latência.
 */

'use client';

import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ShieldCheck, Zap, LayoutPanelLeft } from 'lucide-react';

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignApparatusRegistry } from '@agentevai/apparatus-metadata-registry';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN */
import { 
  AdVantagePreviewUIInputSchema, 
  type IAdVantagePreviewUIInput,
  type AdFormat 
} from './schemas/AdVantagePreviewUI.schema.js';

const AdVantagePreviewUIComponent: React.FC<IAdVantagePreviewUIInput> = (properties) => {
  const apparatusName = 'AdVantagePreviewUI';
  const fileLocation = 'libs/realms/marketing-ui/src/lib/ad-preview-lab/AdVantagePreviewUI.tsx';
  const startTimestamp = performance.now();

  const [currentFormat, setCurrentFormat] = useState<AdFormat>(properties.activeFormat);

  // 1. REGISTRO NO CARTÓRIO TÉCNICO (Pilar I - SSOT)
  useEffect(() => {
    SovereignApparatusRegistry.registerApparatus({
      identifier: apparatusName as any,
      authorName: 'Raz Podestá',
      semanticVersion: '6.5.8',
      complexityTier: 'ORGANISM',
      stabilityScore: 98 as any,
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, properties.correlationIdentifier);
  }, [properties.correlationIdentifier]);

  try {
    // 2. ADUANA DE ADN (Fixação de Rastro e Validação)
    const data = AdVantagePreviewUIInputSchema.parse({ ...properties, activeFormat: currentFormat });
    const { regionName, advertiserBrandName, dictionary, correlationIdentifier } = data;

    // 3. RESOLUÇÃO SEMÂNTICA (Pilar V)
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '6.5.8' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary, apparatusName, semanticKey, variables, correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    // 4. TELEMETRIA DE IGNIÇÃO E PERFORMANCE
    useEffect(() => {
      const endTimestamp = performance.now();
      const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'AD_LAB_IGNITION_SUCCESS',
        message: translateLabel('logLabIgnition', { region: regionName }),
        correlationIdentifier,
        latencyInMilliseconds: ignitionLatency,
        metadata: { activeFormat: currentFormat }
      });
    }, [correlationIdentifier, regionName, currentFormat, translateLabel, startTimestamp]);

    return (
      <div className="flex flex-col gap-10 p-10 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 rounded-xs shadow-2xl transition-all duration-1000 antialiased">
        
        {/* 🏛️ CABEÇALHO DO LABORATÓRIO */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 border-b border-neutral-100 dark:border-white/5 pb-10">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-brand-action/10 rounded-full text-brand-action shadow-[0_0_30px_rgba(0,229,255,0.15)]">
              <Target size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-action font-black">
                {translateLabel('labTitle')}
              </h4>
              <p className="font-serif italic text-3xl text-brand-primary dark:text-white mt-1 leading-tight">
                {translateLabel('labSubtitle', { scope: regionName })}
              </p>
            </div>
          </div>

          <nav className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-black rounded-sm shadow-inner border border-neutral-200 dark:border-white/10">
             {['EDITORIAL_NATIVE_BANNER', 'SPONSORED_FORENSIC_REPORT'].map((format) => (
                <button 
                  key={format}
                  onClick={() => setCurrentFormat(format as AdFormat)}
                  className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all ${currentFormat === format ? 'bg-white dark:bg-neutral-800 text-brand-action shadow-md' : 'text-neutral-400'}`}
                >
                  {format.replace(/_/g, ' ')}
                </button>
             ))}
          </nav>
        </header>

        {/* 🖼️ PALCO DE VISUALIZAÇÃO CINÉTICA */}
        <div className="relative aspect-video w-full bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-white/10 rounded-xs flex items-center justify-center overflow-hidden">
           <div className="absolute top-6 left-6 flex items-center gap-2">
              <Zap size={14} className="text-brand-action animate-pulse" />
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{translateLabel('previewMode_LIVE')}</span>
           </div>

           <AnimatePresence mode="wait">
              <motion.div
                key={currentFormat}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="w-full max-w-lg p-10 bg-white dark:bg-neutral-900 shadow-2xl border-l-4 border-brand-action"
              >
                <span className="text-[9px] font-mono text-brand-action font-black uppercase tracking-widest">Sponsored by {advertiserBrandName}</span>
                <h5 className="font-serif text-2xl font-black mt-4 text-neutral-800 dark:text-white">
                  {translateLabel('simulationContentTitle', { region: regionName })}
                </h5>
                <div className="mt-8 h-20 bg-neutral-50 dark:bg-white/2 rounded-xs border border-dashed border-neutral-200 dark:border-white/10" />
              </motion.div>
           </AnimatePresence>
        </div>

        {/* 🛡️ RODAPÉ DE ÉTICA (Manifesto 0026) */}
        <footer className="flex items-center justify-between border-t border-neutral-100 dark:border-white/5 pt-8">
           <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400">
              <ShieldCheck size={18} className="text-green-500" />
              <span className="uppercase tracking-[0.2em]">{translateLabel('ethicsSeal')}</span>
           </div>
           <div className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 dark:bg-white/5 rounded-full text-[9px] font-black uppercase text-neutral-500 tracking-tighter">
              <LayoutPanelLeft size={12} /> IAL3_CERTIFIED_AD
           </div>
        </footer>

        {/* 🛰️ SEO DNA: Machine-Readable Metadata (Manifesto 0022) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Advertisement",
          "name": `Impact Simulator for ${regionName}`,
          "advertiser": advertiserBrandName,
          "description": "Certified ethical regional advertising trace."
        })}} />
      </div>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-9005'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'HIGH'
    });
  }
};

export const AdVantagePreviewUI = memo(AdVantagePreviewUIComponent);