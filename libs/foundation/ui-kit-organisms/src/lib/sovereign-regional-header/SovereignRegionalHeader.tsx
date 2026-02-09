/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeader
 * @version 2.0.0
 * @protocol OEDP-V5.5.1 - High Performance
 * @description Orquestrador de autoridade regional com resolução semântica integrada.
 */

'use client';

import React, { memo, useMemo } from 'react';
import { SovereignHeaderBranding, SovereignIdentityPulse } from '@agentevai/ui-kit-atoms';
import { SovereignTranslationEngine } from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';

// ADN local
import { SovereignRegionalHeaderSchema, type ISovereignRegionalHeader } from './schemas/SovereignRegionalHeader.schema.js';

const SovereignRegionalHeaderComponent: React.FC<ISovereignRegionalHeader> = (properties) => {
  const apparatusName = 'SovereignRegionalHeader';

  // 1. ADUANA DE ADN (Garante integridade antes da renderização)
  const data = useMemo(() => {
    const result = SovereignRegionalHeaderSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6001'),
        i18nMappingKey: 'INVALID_HEADER_PROPERTIES',
        severity: 'HIGH',
        apparatusMetadata: {
          name: apparatusName,
          version: '2.0.0',
          fileLocation: 'libs/foundation/ui-kit-organisms/src/lib/sovereign-regional-header/SovereignRegionalHeader.tsx'
        },
        runtimeSnapshot: { input: properties, validationIssues: result.error.issues },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'UI_RENDER_ADUANA' }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Tradução via Engine)
  const actionSuffix = useMemo(() => SovereignTranslationEngine.translate(
    data.dictionary as any,
    apparatusName,
    'actionSuffix',
    {},
    data.correlationIdentifier
  ), [data.dictionary, data.correlationIdentifier]);

  const accessibilityLabel = useMemo(() => SovereignTranslationEngine.translate(
    data.dictionary as any,
    apparatusName,
    'headerAriaLabel',
    { region: data.regionName },
    data.correlationIdentifier
  ), [data.dictionary, data.regionName, data.correlationIdentifier]);

  return (
    <header
      className="w-full sticky top-0 z-[100] border-b border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-xl transition-all duration-700"
      role="banner"
      aria-label={accessibilityLabel}
    >
      <div className="container mx-auto px-4 md:px-8 h-24 flex items-center justify-between gap-8">

        {/* 🏛️ IDENTIDADE VISUAL ATÔMICA */}
        <div className="flex-1 overflow-hidden">
          <SovereignHeaderBranding
            regionName={data.regionName}
            actionSuffix={actionSuffix}
            isInteractive={true}
          />
        </div>

        {/* 📡 PULSO DE SOBERANIA REGIONAL */}
        <div className="shrink-0">
          <SovereignIdentityPulse
            regionName={data.regionName}
            regionSlug={data.regionSlug}
            stateAbbreviation={data.stateCode}
            countryCode={data.countryCode}
            pulseIntensity={data.pulseIntensity}
          />
        </div>

      </div>
    </header>
  );
};

export const SovereignRegionalHeader = memo(SovereignRegionalHeaderComponent);
