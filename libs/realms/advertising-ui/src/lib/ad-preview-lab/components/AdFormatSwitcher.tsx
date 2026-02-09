import React, { memo } from 'react';
import { type AdFormat } from '../schemas/AdVantagePreviewUI.schema.js';

interface IAdFormatSwitcher {
  readonly activeFormat: AdFormat;
  readonly onFormatChange: (format: AdFormat) => void;
}

export const AdFormatSwitcher: React.FC<IAdFormatSwitcher> = memo(({ activeFormat, onFormatChange }) => {
  const formats: AdFormat[] = ['EDITORIAL_BANNER' as AdFormat, 'NATIVE_INJECTION' as AdFormat, 'REGIONAL_STORY' as AdFormat];

  return (
    <nav className="flex bg-neutral-100 dark:bg-black p-1 rounded-sm border border-neutral-200 dark:border-white/10 shadow-inner">
      {formats.map((format) => (
        <button
          key={format}
          onClick={() => onFormatChange(format)}
          className={`
            px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all duration-500
            ${activeFormat === format 
              ? 'bg-white dark:bg-neutral-800 text-brand-primary dark:text-brand-action shadow-sm scale-105' 
              : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'}
          `}
        >
          {format.replace('_', ' ')}
        </button>
      ))}
    </nav>
  );
});