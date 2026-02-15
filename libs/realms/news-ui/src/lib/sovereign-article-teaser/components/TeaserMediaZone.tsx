/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus TeaserMediaZone
 * @version 6.6.0
 * @protocol OEDP-V6.5 - Zenith Implementation
 * @description Unidade visual de mídia otimizada para SEO e Acessibilidade.
 * CURADO: Integrado ao Registry, rastro de latência e Acessibilidade Contextual.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import Image from 'next/image';
import { Play, Headphones, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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

/** @section ADN Local */
import {
  TeaserMediaZoneInputSchema,
  type ITeaserMediaZoneInput
} from './schemas/TeaserMediaZone.schema.js';

const TeaserMediaZoneComponent: React.FC<ITeaserMediaZoneInput> = (properties) => {
  const apparatusName = 'TeaserMediaZone';
  const fileLocation = 'libs/realms/news-ui/src/lib/sovereign-article-teaser/components/TeaserMediaZone.tsx';
  const startTimestamp = performance.now();

  // 1. REGISTRO TÉCNICO (Pilar I)
  useEffect(() => {
    SovereignApparatusRegistry.registerApparatus({
      identifier: ApparatusIdentifierSchema.parse(apparatusName),
      authorName: 'Raz Podestá',
      semanticVersion: '6.6.0',
      complexityTier: 'ATOM',
      stabilityScore: StabilityScoreSchema.parse(100),
      isSealedForProduction: true,
      registeredAt: new Date().toISOString()
    }, properties.correlationIdentifier);
  }, [properties.correlationIdentifier]);

  try {
    // 2. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = TeaserMediaZoneInputSchema.parse(properties);
    const {
      resourceType, resourceUniversalResourceLocator, categoryLabel, themeClass,
      dictionary, correlationIdentifier, blurDataUrlSnapshot, contextualAccessibilityDescription
    } = data;

    // 3. RESOLUÇÃO SEMÂNTICA (Pilar V)
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '6.6.0' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary, apparatusName, semanticKey, variables, correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    // 4. TELEMETRIA DE IGNIÇÃO E PERFORMANCE (Pilar VI)
    useEffect(() => {
      const endTimestamp = performance.now();
      const ignitionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'MEDIA_ZONE_STABILIZED',
        message: translateLabel('logMediaRendered', { url: resourceUniversalResourceLocator.substring(0, 30) }),
        correlationIdentifier,
        latencyInMilliseconds: ignitionLatency,
        metadata: { type: resourceType, seoVerified: true }
      });
    }, [resourceUniversalResourceLocator, correlationIdentifier, resourceType, translateLabel, startTimestamp]);

    // 5. MATRIZ DE ICONOGRAFIA ZENITH
    const MediaIcon = useMemo(() => ({
      IMAGE: ImageIcon,
      VIDEO: Play,
      AUDIO: Headphones
    }[resourceType]), [resourceType]);

    return (
      <div 
        className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-xs group border border-neutral-200 dark:border-white/5 shadow-inner"
        role="img"
        aria-label={translateLabel('mediaAriaLabel', { type: resourceType, category: categoryLabel })}
      >
        {/* 📸 MOTOR DE IMAGEM SOBERANO (Otimização LCP & SEO Authority) */}
        <Image
          src={resourceUniversalResourceLocator}
          alt={contextualAccessibilityDescription} // ✅ SEO: Descrição contextual injetada
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
          placeholder={blurDataUrlSnapshot ? 'blur' : 'empty'}
          blurDataURL={blurDataUrlSnapshot}
          className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
        />

        <div className="absolute top-5 left-5 z-10">
          <span className={`px-4 py-1.5 text-[9px] font-black tracking-[0.2em] uppercase shadow-2xl rounded-xs transition-all duration-700 ${themeClass}`}>
            {categoryLabel}
          </span>
        </div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-5 right-5 z-10 p-3.5 bg-black/70 backdrop-blur-2xl rounded-full text-white shadow-2xl border border-white/10 group-hover:bg-brand-action group-hover:text-black transition-colors duration-500"
          aria-label={translateLabel('playActionLabel')}
        >
          <MediaIcon size={18} strokeWidth={2.5} />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-80 transition-opacity group-hover:opacity-40" />
      </div>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-7004'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'MEDIUM'
    });
  }
};

export const TeaserMediaZone = memo(TeaserMediaZoneComponent);