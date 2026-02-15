/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignArticleTeaser
 * @version 6.6.2
 * @protocol OEDP-V6.5 - Zenith Implementation
 * @description Unidade editorial de prestígio com injeção de Microdados SEO e telemetria de latência.
 * CURADO: Resolvidos TS2451 (Redeclaração), TS2552 (Nome), e Erros de Linter (Unused vars).
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';

import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignApparatusRegistry,
  ApparatusIdentifierSchema,
  StabilityScoreSchema 
} from '@agentevai/apparatus-metadata-registry';
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

/**
 * @name SovereignArticleTeaserComponent
 * @description Implementação interna protegida para evitar colisão de nomes (Cura TS2451).
 */
const SovereignArticleTeaserComponent: React.FC<ISovereignArticleTeaser> = (properties) => {
  const apparatusName = 'SovereignArticleTeaser';
  const fileLocation = 'libs/realms/news-ui/src/lib/sovereign-article-teaser/SovereignArticleTeaser.tsx';
  
  // Pilar VI: Rastro de latência iniciado (Cura Linter: startTimestamp)
  const startTimestamp = performance.now();

  // 1. REGISTRO TÉCNICO SANEADO (Cura de Radiação 'any')
  useEffect(() => {
    SovereignApparatusRegistry.registerApparatus({
      identifier: ApparatusIdentifierSchema.parse(apparatusName),
      authorName: 'Raz Podestá',
      semanticVersion: '6.6.2',
      complexityTier: 'ORGANISM',
      stabilityScore: StabilityScoreSchema.parse(100),
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, properties.correlationIdentifier);
  }, [properties.correlationIdentifier]);

  try {
    // 2. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = SovereignArticleTeaserSchema.parse(properties);
    const { 
      identifier, categoryIdentifier, dictionary, correlationIdentifier, 
      authorSnapshot, narrativeExcerpt, title, mediaResource,
      readingTimeInMinutes, publishedAt 
    } = data;

    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '6.6.2' },
        content: dictionary
      } as unknown as ISovereignDictionary;
      return SovereignTranslationEngine.translate(sovereignDictionary, apparatusName, semanticKey, variables, correlationIdentifier);
    }, [dictionary, correlationIdentifier]);

    // 3. TELEMETRIA SINCRO E PERFORMANCE (Cura Linter: SovereignLogger)
    useEffect(() => {
      const endTimestamp = performance.now();
      const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'TEASER_STABILIZED',
        message: translateLabel('logTeaserImpression', { identifier: identifier.substring(0, 8) }),
        correlationIdentifier,
        latencyInMilliseconds: ignitionLatency, // Latência injetada no rastro (Zenith Edition)
        metadata: { category: categoryIdentifier }
      });
    }, [identifier, correlationIdentifier, categoryIdentifier, translateLabel, startTimestamp]);

    // 4. RE-SELAGEM DE ADN PARA FILHOS (SEO Authority)
    const activeCategoryKey = categoryIdentifier as unknown as string;
    const themeClass = CATEGORY_THEME_REGISTRY[activeCategoryKey] || CATEGORY_THEME_REGISTRY['GOVERNANCE'];

    const mediaZoneProperties = useMemo(() => TeaserMediaZoneInputSchema.parse({
      resourceType: mediaResource.resourceType,
      resourceUniversalResourceLocator: mediaResource.resourceUniversalResourceLocator,
      categoryLabel: translateLabel(`category_${activeCategoryKey}`),
      themeClass,
      dictionary,
      correlationIdentifier,
      blurDataUrlSnapshot: mediaResource.blurDataUrlSnapshot
    }), [mediaResource, activeCategoryKey, translateLabel, themeClass, dictionary, correlationIdentifier]);

    const authorProperties = useMemo(() => CitizenAuraCardSchema.parse({
      ...authorSnapshot, dictionary, correlationIdentifier
    }), [authorSnapshot, dictionary, correlationIdentifier]);

    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative flex flex-col gap-8 p-8 rounded-xs transition-all duration-1000 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/5 shadow-sm hover:shadow-2xl antialiased"
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

          <p className="text-lg leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3 font-sans">
            {narrativeExcerpt}
          </p>
        </div>

        {/* 🛰️ SEO DNA: Microdados estruturados (Schema.org) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": title,
          "description": narrativeExcerpt,
          "image": mediaResource.resourceUniversalResourceLocator,
          "datePublished": publishedAt,
          "author": { "@type": "Person", "name": authorSnapshot.citizenName }
        })}} />

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

/** @section Selagem Final */
export const SovereignArticleTeaser = memo(SovereignArticleTeaserComponent);