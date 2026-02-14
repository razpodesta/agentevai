/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaser
 * @version 6.5.8
 * @protocol OEDP-V6.5 - Zenith Implementation
 * @description Unidade de destaque editorial que integra mérito do autor.
 * CURADO: Erradicada radiação de fronteira e colapso de marca nominal (TS2739).
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Reinos Federados e Sub-Legos */
import { CitizenAuraCard, CitizenAuraCardSchema } from '@agentevai/community-ui';
import { TeaserMediaZone } from './components/TeaserMediaZone.js';
import { TeaserMediaZoneInputSchema } from './components/schemas/TeaserMediaZone.schema.js';

/** @section ADN Local */
import {
  SovereignArticleTeaserSchema,
  type ISovereignArticleTeaser
} from './schemas/SovereignArticleTeaser.schema.js';

const CATEGORY_THEME_REGISTRY: Readonly<Record<string, string>> = Object.freeze({
  INFRASTRUCTURE: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  SECURITY: 'text-red-500 bg-red-500/10 border-red-500/20',
  HEALTH: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  ECONOMY: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  GOVERNANCE: 'text-brand-action bg-brand-action/10 border-brand-action/20'
});

const SovereignArticleTeaserComponent: React.FC<ISovereignArticleTeaser> = (properties) => {
  const apparatusName = 'SovereignArticleTeaser';
  const fileLocation = 'libs/realms/news-ui/src/lib/sovereign-article-teaser/SovereignArticleTeaser.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = SovereignArticleTeaserSchema.parse(properties);
    const {
      identifier, categoryIdentifier, dictionary, correlationIdentifier,
      authorSnapshot, narrativeExcerpt, title, mediaResource,
      readingTimeInMinutes, publishedAt
    } = data;

    // 2. ORQUESTRAÇÃO DE DICIONÁRIO
    const sovereignDictionary = useMemo(() => ({
      metadata: { locale: 'pt-BR', version: '6.5.8' },
      content: dictionary
    } as unknown as ISovereignDictionary), [dictionary]);

    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      return SovereignTranslationEngine.translate(
        sovereignDictionary,
        apparatusName,
        semanticKey,
        variables,
        correlationIdentifier
      );
    }, [sovereignDictionary, correlationIdentifier]);

    // 3. TELEMETRIA SINCRO E PERFORMANCE (Pilar VI)
    useEffect(() => {
      const endTimestamp = performance.now();
      const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'TEASER_STABILIZED',
        message: translateLabel('logTeaserImpression', { identifier: identifier.substring(0, 8) }),
        correlationIdentifier,
        metadata: { latencyMs: ignitionLatency, category: categoryIdentifier }
      });
    }, [identifier, correlationIdentifier, categoryIdentifier, translateLabel, startTimestamp]);

    // 4. RESOLUÇÃO DETERMINÍSTICA DE TEMA (Cura TS7053)
    const activeCategoryKey = categoryIdentifier as unknown as string;
    const themeClass = CATEGORY_THEME_REGISTRY[activeCategoryKey] || CATEGORY_THEME_REGISTRY['GOVERNANCE'];

    /**
     * @section RE-SELAGEM DE ADN PARA FILHOS (Cura TS2739)
     * Injetamos a marca nominal e o rastro forense nos sub-aparatos.
     */
    const mediaZoneProperties = useMemo(() => TeaserMediaZoneInputSchema.parse({
      mediaType: mediaResource.resourceType,
      mediaUrl: mediaResource.resourceUniversalResourceLocator,
      categoryLabel: translateLabel(`category_${activeCategoryKey}`),
      themeClass,
      dictionary,
      correlationIdentifier
    }), [mediaResource, activeCategoryKey, translateLabel, themeClass, dictionary, correlationIdentifier]);

    const authorProperties = useMemo(() => CitizenAuraCardSchema.parse({
      ...authorSnapshot,
      dictionary,
      correlationIdentifier
    }), [authorSnapshot, dictionary, correlationIdentifier]);

    return (
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex flex-col gap-8 p-8 rounded-xs transition-all duration-1000 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-white/5 shadow-sm hover:shadow-2xl antialiased"
      >
        <TeaserMediaZone {...mediaZoneProperties} />

        <div className="scale-90 origin-left -mb-4 opacity-90 group-hover:opacity-100 transition-opacity duration-700">
           <CitizenAuraCard {...authorProperties} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-[0.4em] text-neutral-400">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-brand-action">
                <Clock size={14} strokeWidth={3} />
                {translateLabel('readingTimeSuffix', { minutes: readingTimeInMinutes })}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-200 dark:bg-white/10" />
              <span className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-green-500" />
                 {new Date(publishedAt).toLocaleDateString()}
              </span>
            </div>
            <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 text-brand-action transition-all duration-700" />
          </div>

          <h3 className="text-3xl md:text-4xl font-serif font-black text-brand-primary dark:text-white leading-[1.05] tracking-tighter group-hover:text-brand-action transition-colors duration-700">
            {title}
          </h3>

          <p className="text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3 font-sans opacity-90 group-hover:opacity-100 transition-opacity duration-700">
            {narrativeExcerpt}
          </p>
        </div>

        <a
          href={`/noticia/${identifier}`}
          className="absolute inset-0 z-20"
          aria-label={translateLabel('accessibilityAction', { title })}
        />
      </motion.article>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-7002'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'HIGH'
    });
  }
};

export const SovereignArticleTeaser = memo(SovereignArticleTeaserComponent);
