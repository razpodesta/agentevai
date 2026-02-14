/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeader
 * @version 6.5.2
 * @protocol OEDP-V6.5 - Nominal Integrity
 * @description Orquestrador de autoridade regional.
 * CURADO: Resolvido TS2739 e TS2305 via re-selagem nominal e hub de exportação.
 */

'use client';

import React, { memo, useCallback, useEffect, useMemo } from 'react';
import {
  SovereignIdentityPulse,
  SovereignIdentityPulseInputSchema,
  SovereignHeaderBranding,
  SovereignHeaderBrandingSchema
} from '@agentevai/ui-kit-atoms';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/** @section ADN Local */
import {
  SovereignRegionalHeaderInputSchema,
  type ISovereignRegionalHeaderInput
} from './schemas/SovereignRegionalHeader.schema.js';

const SovereignRegionalHeaderComponent: React.FC<ISovereignRegionalHeaderInput> = (properties) => {
  const apparatusName = 'SovereignRegionalHeader';
  const fileLocation = 'libs/foundation/ui-kit-organisms/src/lib/sovereign-regional-header/SovereignRegionalHeader.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = SovereignRegionalHeaderInputSchema.parse(properties);
    const {
      regionName, regionSlug, stateCode, countryCode,
      pulseIntensity, dictionary, correlationIdentifier
    } = data;

    // 2. RESOLUÇÃO SEMÂNTICA
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '6.5.2' },
        content: dictionary
      } as unknown as ISovereignDictionary;

      return SovereignTranslationEngine.translate(
        sovereignDictionary,
        apparatusName,
        semanticKey,
        variables,
        correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    /**
     * @section CURA_TS2739: RE-SELAGEM DE ADN PARA FILHOS
     * Injetamos a marca nominal e o rastro forense nos átomos de UI.
     */
    const brandingProperties = useMemo(() => {
      return SovereignHeaderBrandingSchema.parse({
        regionName,
        actionSuffix: translateLabel('actionSuffix'),
        isInteractive: true,
        correlationIdentifier
      });
    }, [regionName, translateLabel, correlationIdentifier]);

    const pulseProperties = useMemo(() => {
      return SovereignIdentityPulseInputSchema.parse({
        regionName,
        regionSlug,
        stateAbbreviation: stateCode,
        countryCode,
        pulseIntensity,
        dictionary,
        correlationIdentifier
      });
    }, [regionName, regionSlug, stateCode, countryCode, pulseIntensity, dictionary, correlationIdentifier]);

    // 3. TELEMETRIA SINCRO
    useEffect(() => {
      const endTimestamp = performance.now();
      const executionLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'REGIONAL_HEADER_STABILIZED',
        message: `Soberania regional ativa: ${regionName}.`,
        correlationIdentifier,
        metadata: { latencyMs: executionLatency }
      });
    }, [regionName, correlationIdentifier, startTimestamp]);

    return (
      <header
        className="w-full sticky top-0 z-100 border-b border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl transition-all duration-1000"
        role="banner"
        aria-label={translateLabel('headerAriaLabel', { region: regionName })}
      >
        <div className="container mx-auto px-6 md:px-10 h-24 flex items-center justify-between gap-10">

          <div className="flex-1 overflow-hidden">
            <SovereignHeaderBranding {...brandingProperties} />
          </div>

          <div className="shrink-0">
            <SovereignIdentityPulse {...pulseProperties} />
          </div>

        </div>
      </header>
    );

  } catch (caughtError) {
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-6001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'HIGH'
    });
  }
};

export const SovereignRegionalHeader = memo(SovereignRegionalHeaderComponent);
