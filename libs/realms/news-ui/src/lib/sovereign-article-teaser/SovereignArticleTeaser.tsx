/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaser
 * @version 3.2.0
 * @protocol OEDP-V6.0 - Master Orchestration
 * @description Unidade de destaque editorial. 
 * CURA TS2739: Implementada re-selagem de ADN para TeaserMediaZone.
 * @policy ZERO-ANY: Saneamento total via parsing de ADN nominal.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Legos */
import { 
  SovereignArticleTeaserInputSchema, 
  type ISovereignArticleTeaserInput 
} from './schemas/SovereignArticleTeaser.schema.js';
import { TeaserMediaZone } from './components/TeaserMediaZone.js';
import { TeaserMediaZoneInputSchema } from './components/schemas/TeaserMediaZone.schema.js';

/** @section Matriz de Soberania Visual */
const CATEGORY_THEME_MAP: Readonly<Record<string, string>> = Object.freeze({
  INFRASTRUCTURE: 'text-blue-500 bg-blue-500/10',
  SECURITY: 'text-red-500 bg-red-500/10',
  HEALTH: 'text-emerald-500 bg-emerald-500/10',
  ECONOMY: 'text-amber-500 bg-amber-500/10',
  GOVERNANCE: 'text-brand-action bg-brand-action/10'
});

const SovereignArticleTeaserComponent: React.FC<ISovereignArticleTeaserInput> = (properties) => {
  const apparatusName = 'SovereignArticleTeaser';

  // 1. ADUANA DE ADN (Validando integridade e fixando rastro forense)
  const data = useMemo(() => 
    SovereignArticleTeaserInputSchema.parse(properties), 
  [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  // 3. PREPARAÇÃO VISUAL (Cura TS7053)
  const themeClass = useMemo(() => 
    CATEGORY_THEME_MAP[data.categoryKey as unknown as string] || CATEGORY_THEME_MAP['GOVERNANCE'],
  [data.categoryKey]);

  /**
   * @section RE-SELAGEM DE ADN (Cura TS2739)
   * Criamos o objeto de propriedades para o filho e aplicamos o Schema dele.
   * Isso injeta o símbolo [$brand] e garante as propriedades de rastro obrigatórias.
   */
  const mediaZoneProperties = useMemo(() => {
    return TeaserMediaZoneInputSchema.parse({
      mediaType: data.media.type,
      mediaUrl: data.media.url,
      categoryLabel: translate(`category_${data.categoryKey}`),
      themeClass: themeClass,
      dictionary: data.dictionary,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data, themeClass, translate]);

  // 4. TELEMETRIA DE IMPRESSÃO
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'TEASER_RENDERED',
      message: `Teaser editorial [${data.identifier.substring(0, 8)}] selado no viewport.`,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data.identifier, data.correlationIdentifier]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-6 p-4 rounded-xs transition-all duration-700 hover:bg-neutral-50 dark:hover:bg-white/2 border border-transparent hover:border-neutral-100 dark:hover:border-white/5"
    >
      {/* 🖼️ ZONA DE MÍDIA: CURA TS2739 (Uso do rastro Branded) */}
      <TeaserMediaZone {...mediaZoneProperties} />

      {/* 📝 BLOCO NARRATIVO */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-widest text-neutral-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-action">
              <Clock size={12} strokeWidth={3} />
              {translate('readingTimeSuffix', { minutes: data.readingTimeInMinutes })}
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-white/20" />
            <span>{new Date(data.publishedAt).toLocaleDateString()}</span>
          </div>
          <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 text-brand-action transition-all duration-500" />
        </div>

        <h3 className="text-2xl font-serif font-black text-brand-primary dark:text-white leading-[1.05] tracking-tighter group-hover:text-brand-action transition-colors duration-500">
          {data.title}
        </h3>

        <p className="text-base leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3 font-sans opacity-90 group-hover:opacity-100 transition-opacity">
          {data.excerpt}
        </p>
      </div>

      <a href={`/noticia/${data.identifier}`} className="absolute inset-0 z-20" aria-label={data.title} />
    </motion.article>
  );
};

export const SovereignArticleTeaser = memo(SovereignArticleTeaserComponent);