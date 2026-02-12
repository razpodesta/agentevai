/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignRegionalHeader
 * @version 6.0.0
 * @protocol OEDP-V6.0 - High Performance & Nominal Integrity
 */

'use client';

import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { SovereignIdentityPulse } from '@agentevai/ui-kit-atoms';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignError, SovereignErrorCodeSchema } from '@agentevai/sovereign-error-observability';

/** @section Sincronia de ADN e Zonas */
import { SovereignRegionalHeaderInputSchema, type ISovereignRegionalHeaderInput } from './schemas/SovereignRegionalHeader.schema.js';
import { RegionalBrandingZone } from './components/RegionalBrandingZone.js';

const SovereignRegionalHeaderComponent: React.FC<ISovereignRegionalHeaderInput> = (inputParameters) => {
  const apparatusName = 'SovereignRegionalHeader';
  const fileLocation = 'libs/foundation/ui-kit-organisms/src/lib/sovereign-regional-header/SovereignRegionalHeader.tsx';

  // 1. ADUANA DE ADN (Fixação de Rastro e Cura TS4111)
  const validatedData = useMemo(() => {
    const result = SovereignRegionalHeaderInputSchema.safeParse(inputParameters);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-6001'),
        i18nMappingKey: 'INVALID_HEADER_PROPERTIES',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '6.0.0', fileLocation },
        runtimeSnapshot: { inputPayload: inputParameters, correlationIdentifier: inputParameters.correlationIdentifier, validationIssues: result.error.issues },
        forensicTrace: { timestamp: new Date().toISOString(), stack: 'UI_ORGANISM_IGNITION' }
      });
    }
    return result.data;
  }, [inputParameters]);

  /** 
   * @section CURA_TS4111 
   * Desestruturação nominal imediata: transforma o tipo Branded em constantes puras.
   */
  const {
    regionName,
    regionSlug,
    stateCode,
    countryCode,
    pulseIntensity,
    dictionary,
    correlationIdentifier
  } = validatedData;

  // 2. TELEMETRIA SINCRO (Cura TS2353)
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'REGIONAL_AUTHORITY_MOUNTED',
      message: `Soberania regional ativa para: ${regionName}`,
      correlationIdentifier // Unificação Zenith
    });
  }, [regionName, correlationIdentifier]);

  // 3. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      correlationIdentifier
    );
  }, [dictionary, correlationIdentifier]);

  return (
    <header
      className="w-full sticky top-0 z-[100] border-b border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl transition-all duration-1000"
      role="banner"
      aria-label={translate('headerAriaLabel', { region: regionName })}
    >
      <div className="container mx-auto px-6 md:px-10 h-24 flex items-center justify-between gap-10">
        
        <RegionalBrandingZone 
          regionName={regionName} 
          actionSuffix={translate('actionSuffix')} 
        />

        <div className="shrink-0">
          <SovereignIdentityPulse
            regionName={regionName}
            regionSlug={regionSlug}
            stateAbbreviation={stateCode}
            countryCode={countryCode}
            pulseIntensity={pulseIntensity}
            dictionary={dictionary}
            correlationIdentifier={correlationIdentifier}
          />
        </div>

      </div>
    </header>
  );
};

export const SovereignRegionalHeader = memo(SovereignRegionalHeaderComponent);