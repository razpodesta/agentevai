/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaser
 * @version 2.2.0
 * @protocol OEDP-V5.5.2 - High Precision Editorial
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

// ADN e Sub-aparatos
import { SovereignArticleTeaserInputSchema, type ISovereignArticleTeaserInput } from './schemas/SovereignArticleTeaser.schema.js';
import { TeaserMediaZone } from './components/TeaserMediaZone.js';

export const SovereignArticleTeaser: React.FC<ISovereignArticleTeaserInput> = (properties) => {
  const apparatusName = 'SovereignArticleTeaser';

  // 1. ADUANA DE ADN
  const data = useMemo(() => {
    const result = SovereignArticleTeaserInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-7002'),
        i18nMappingKey: 'INVALID_TEASER_PROPERTIES',
        severity: 'MEDIUM',
        apparatusMetadata: { name: apparatusName, version: '2.2.0', fileLocation: 'libs/...' },
        runtimeSnapshot: { inputPayload: properties, correlationIdentifier: properties.correlationIdentifier, validationIssues: result.error.issues },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'NEWS_TEASER_ADUANA' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA
  const t = useCallback((key: string, vars = {}) => 
    SovereignTranslationEngine.translate(data.dictionary as unknown as ISovereignDictionary, apparatusName, key, vars, data.correlationIdentifier),
  [data.dictionary, data.correlationIdentifier]);

  const categoryLabel = t(data.categoryKey);
  const readingTimeLabel = t('readingTimeSuffix', { minutes: data.readingTimeInMinutes });

  return (
    <article className="relative flex flex-col gap-5 p-3 transition-all duration-700 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-sm">
      
      <TeaserMediaZone 
        mediaType={data.media.type} 
        mediaUrl={data.media.url} 
        categoryLabel={categoryLabel} 
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-brand-action font-bold">
            <Clock size={12} /> {readingTimeLabel}
          </span>
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span>{new Date(data.publishedAt).toLocaleDateString()}</span>
        </div>

        <h3 className="text-2xl font-serif font-black text-neutral-800 dark:text-white leading-[1.05] tracking-tighter hover:text-brand-primary dark:hover:text-brand-action transition-colors cursor-pointer">
          {data.title}
        </h3>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed font-sans">
          {data.excerpt}
        </p>
      </div>

      {/* SEO & Acessibilidade: Gatilho invisível para o rastro completo */}
      <a href={`/noticia/${data.identifier}`} className="absolute inset-0 z-10" aria-label={data.title} />
    </article>
  );
};