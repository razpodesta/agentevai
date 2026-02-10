/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeader
 * @version 3.0.0
 * @protocol OEDP-V6.0 - High Precision Orchestration
 * @description Orquestrador de autoridade regional. Erradica falhas de rastro
 * de telemetria e sincroniza o ADN linguístico para os sub-aparatos.
 * @policy ZERO-ANY: Saneamento absoluto via parsing de ADN nominal.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 */

'use client';

import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { SovereignHeaderBranding, SovereignIdentityPulse } from '@agentevai/ui-kit-atoms';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN Local */
import {
  SovereignRegionalHeaderInputSchema,
  type ISovereignRegionalHeader
} from './schemas/SovereignRegionalHeader.schema.js';

const SovereignRegionalHeaderComponent: React.FC<ISovereignRegionalHeader> = (properties) => {
  const apparatusName = 'SovereignRegionalHeader';
  const fileLocation = 'libs/foundation/ui-kit-organisms/src/lib/sovereign-regional-header/SovereignRegionalHeader.tsx';

  // 1. ADUANA DE ADN (Garante integridade e fixa o rastro forense)
  const validatedData = useMemo(() => {
    const result = SovereignRegionalHeaderInputSchema.safeParse(properties);

    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6001'),
        i18nMappingKey: 'INVALID_HEADER_PROPERTIES',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '3.0.0', fileLocation },
        runtimeSnapshot: {
          inputPayload: properties,
          correlationIdentifier: properties.correlationIdentifier || 'ORPHAN_TRACE',
          validationIssues: result.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: 'UI_ORGANISM_IGNITION_FAILURE'
        }
      });
    }
    return result.data;
  }, [properties]);

  // 2. TELEMETRIA DE IGNIÇÃO (Cura TS2353: unificação sob correlationIdentifier)
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'REGIONAL_AUTHORITY_MOUNTED',
      message: `Soberania regional ativa para: ${validatedData.regionName}`,
      correlationIdentifier: validatedData.correlationIdentifier
    });
  }, [validatedData.regionName, validatedData.correlationIdentifier]);

  // 3. RESOLUÇÃO SEMÂNTICA (Tradução via Engine Elite)
  const translateLabel = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      validatedData.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      validatedData.correlationIdentifier
    );
  }, [validatedData.dictionary, validatedData.correlationIdentifier]);

  // 4. MEMOIZAÇÃO DE ATRIBUTOS EDITORIAIS
  const regionalActionSuffix = useMemo(() => translateLabel('actionSuffix'), [translateLabel]);
  const accessibilityAriaLabel = useMemo(() =>
    translateLabel('headerAriaLabel', { region: validatedData.regionName }),
  [translateLabel, validatedData.regionName]);

  return (
    <header
      className="w-full sticky top-0 z-[100] border-b border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl transition-all duration-1000"
      role="banner"
      aria-label={accessibilityAriaLabel}
    >
      <div className="container mx-auto px-6 md:px-10 h-24 flex items-center justify-between gap-10">

        {/* 🏛️ IDENTIDADE VISUAL ATÔMICA */}
        <div className="flex-1 overflow-hidden">
          <SovereignHeaderBranding
            regionName={validatedData.regionName}
            actionSuffix={regionalActionSuffix}
            isInteractive={true}
          />
        </div>

        {/* 📡 PULSO DE SOBERANIA REGIONAL (Sincronizado com ADN estrito) */}
        <div className="shrink-0">
          <SovereignIdentityPulse
            regionName={validatedData.regionName}
            regionSlug={validatedData.regionSlug}
            stateAbbreviation={validatedData.stateCode}
            countryCode={validatedData.countryCode}
            pulseIntensity={validatedData.pulseIntensity}
            dictionary={validatedData.dictionary} // Agora com rastro Record<string, Record<string, string>>
            correlationIdentifier={validatedData.correlationIdentifier}
          />
        </div>

      </div>
    </header>
  );
};

export const SovereignRegionalHeader = memo(SovereignRegionalHeaderComponent);
