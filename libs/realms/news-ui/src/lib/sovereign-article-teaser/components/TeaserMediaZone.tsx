/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TeaserMediaZone
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Performance Kinetic UI
 * @description Unidade visual de mídia. Saneado contra TS2322.
 */

'use client';

import React, { useMemo, useCallback, memo } from 'react';
import { Play, Headphones, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { TeaserMediaZoneInputSchema, type ITeaserMediaZoneInput } from './schemas/TeaserMediaZone.schema.js';

const TeaserMediaZoneComponent: React.FC<ITeaserMediaZoneInput> = (properties) => {
  const apparatusName = 'TeaserMediaZone';

  // 1. ADUANA DE ADN
  const data = useMemo(() => TeaserMediaZoneInputSchema.parse(properties), [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      variables,
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  // 3. MATRIZ DE ICONOGRAFIA
  const MediaIcon = useMemo(() => ({
    IMAGE: ImageIcon,
    VIDEO: Play,
    AUDIO: Headphones
  }[data.mediaType]), [data.mediaType]);

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200 dark:bg-black rounded-xs group">
      {/* 🖼️ CAMADA VISUAL SOBERANA */}
      <img 
        src={data.mediaUrl} 
        alt={data.categoryLabel}
        loading="lazy"
        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
      />
      
      {/* 🏷️ SELO DE CATEGORIA DINÂMICO */}
      <div className="absolute top-4 left-4">
        <span className={`px-4 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase shadow-2xl rounded-xs transition-all duration-500 ${data.themeClass}`}>
          {data.categoryLabel}
        </span>
      </div>

      {/* 🔘 ATUADOR CINÉTICO DE INTERAÇÃO */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-4 right-4 p-3 bg-black/80 backdrop-blur-xl rounded-full text-white shadow-2xl border border-white/10 group-hover:bg-brand-action group-hover:text-black transition-colors duration-500"
        aria-label={translate('playActionLabel')}
      >
        <MediaIcon size={16} strokeWidth={3} />
      </motion.div>

      {/* 🌑 GRADIENTE DE PROFUNDIDADE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-60" />
    </div>
  );
};

export const TeaserMediaZone = memo(TeaserMediaZoneComponent);