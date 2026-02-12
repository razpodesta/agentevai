/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus AdFormatSwitcher
 * @version 6.1.0
 * @description Comutador de formatos de alta fidelidade. Saneado contra TS2322.
 */

import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { type AdFormat } from '../schemas/AdVantageContracts.schema.js';

interface IAdFormatSwitcher {
  readonly activeFormat: AdFormat;
  readonly onFormatChange: (requestedFormat: AdFormat) => void;
  readonly dictionary: Record<string, unknown>;
  readonly correlationIdentifier: string;
}

const AdFormatSwitcherComponent: React.FC<IAdFormatSwitcher> = ({ 
  activeFormat, 
  onFormatChange,
  dictionary,
  correlationIdentifier
}) => {
  const apparatusName = 'AdVantagePreviewUI';

  // Lista dinâmica baseada nos Formatos de Elite
  const availableFormats: AdFormat[] = [
    'EDITORIAL_NATIVE_BANNER' as AdFormat,
    'SPONSORED_FORENSIC_REPORT' as AdFormat,
    'CITIZEN_REWARD_AD' as AdFormat,
    'GOOGLE_ADSENSE_FALLBACK' as AdFormat
  ];

  const translateLabel = useCallback((format: string) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      `format_${format}`,
      {},
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  return (
    <nav className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-black rounded-sm border border-neutral-200 dark:border-white/10 shadow-inner">
      {availableFormats.map((format) => {
        const isCurrent = activeFormat === format;
        return (
          <button
            key={format}
            onClick={() => onFormatChange(format)}
            className={`
              relative px-5 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all duration-500
              ${isCurrent ? 'text-brand-primary dark:text-brand-action' : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'}
            `}
          >
            {isCurrent && (
              <motion.div 
                layoutId="active_pill"
                className="absolute inset-0 bg-white dark:bg-neutral-800 shadow-sm rounded-xs -z-10"
              />
            )}
            {translateLabel(format as unknown as string)}
          </button>
        );
      })}
    </nav>
  );
};

export const AdFormatSwitcher = memo(AdFormatSwitcherComponent);