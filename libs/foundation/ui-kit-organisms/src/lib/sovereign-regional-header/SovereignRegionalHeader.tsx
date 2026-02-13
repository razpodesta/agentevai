/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeader
 * @version 6.5.1
 * @protocol OEDP-V6.5 - High Performance & Nominal Integrity
 * @description Orquestrador de autoridade regional. 
 * CURADO: Erradicado erro de radiação técnica (any) e falhas de rastro.
 */

'use client';

import React, { memo, useCallback, useEffect } from 'react';
import { SovereignIdentityPulse } from '@agentevai/ui-kit-atoms';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN e Sub-Legos */
import { 
  SovereignRegionalHeaderInputSchema, 
  type ISovereignRegionalHeaderInput 
} from './schemas/SovereignRegionalHeader.schema.js';
import { RegionalBrandingZone } from './components/RegionalBrandingZone.js';

const SovereignRegionalHeaderComponent: React.FC<ISovereignRegionalHeaderInput> = (properties) => {
  const apparatusName = 'SovereignRegionalHeader';
  const fileLocation = 'libs/foundation/ui-kit-organisms/src/lib/sovereign-regional-header/SovereignRegionalHeader.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA DE ADN (Ingresso Seguro e Fixação de Rastro)
    const data = SovereignRegionalHeaderInputSchema.parse(properties);

    const {
      regionName,
      regionSlug,
      stateCode,
      countryCode,
      pulseIntensity,
      dictionary,
      correlationIdentifier
    } = data;

    // 2. RESOLUÇÃO SEMÂNTICA (Pilar 5)
    const translateLabel = useCallback((semanticKey: string, variables = {}) => {
      /** 
       * Transmuta o Record de UI no objeto de dicionário exigido pela Engine.
       * O rastro de metadados é omitido para performance de renderização.
       */
      const sovereignDictionary = {
        metadata: { locale: 'pt-BR', version: '1.0.0' }, // Fallback para estrutura
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

    // 3. TELEMETRIA SINCRO E PERFORMANCE (Pilar 6)
    useEffect(() => {
      const endTimestamp = performance.now();
      const mountingLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'REGIONAL_AUTHORITY_MOUNTED',
        message: translateLabel('logIgnitionSuccess', { region: regionName }),
        correlationIdentifier,
        metadata: { 
          latencyMs: mountingLatency,
          region: regionSlug 
        }
      });
    }, [regionName, correlationIdentifier, regionSlug, translateLabel, startTimestamp]);

    return (
      <header
        className="w-full sticky top-0 z-[100] border-b border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl transition-all duration-1000"
        role="banner"
        aria-label={translateLabel('headerAriaLabel', { region: regionName })}
      >
        <div className="container mx-auto px-6 md:px-10 h-24 flex items-center justify-between gap-10">
          
          {/* 🏛️ ZONA DE BRANDING DINÂMICO */}
          <RegionalBrandingZone 
            regionName={regionName} 
            actionSuffix={translateLabel('actionSuffix')} 
          />

          {/* 📡 PULSO DE SOBERANIA (CURA ANY: Injeção Tipada) */}
          <div className="shrink-0">
            <SovereignIdentityPulse
              regionName={regionName}
              regionSlug={regionSlug}
              stateAbbreviation={stateCode}
              countryCode={countryCode}
              pulseIntensity={pulseIntensity}
              dictionary={dictionary} // Sincronizado via Schema
              correlationIdentifier={correlationIdentifier}
            />
          </div>

        </div>
      </header>
    );

  } catch (caughtError) {
    // 4. RESILIÊNCIA FORENSE
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-6001'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'HIGH',
      recoverySuggestion: 'Validar integridade do dicionário regional injetado no rastro de orquestração.'
    });
  }
};

export const SovereignRegionalHeader = memo(SovereignRegionalHeaderComponent);