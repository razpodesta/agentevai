/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignIdentityPulse
 * @version 2.1.0
 * @protocol OEDP-V6.0 - High Performance & Forensic Pulse
 * @description Indicador cinético de presença regional. Saneado contra erro
 * de propriedades ausentes (TS2739) e vácuo de rastro forense.
 * @policy ZERO-ABBREVIATIONS: Nomenclatura integral em prosa técnica.
 * @policy ESM-STRICT: Uso de extensões explícitas (.js).
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';
import {
  SovereignTranslationEngine,
  type ISovereignDictionary
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Legos */
import {
  SovereignIdentityPulseInputSchema,
  type ISovereignIdentityPulse
} from './schemas/SovereignIdentityPulse.schema.js';
import { PulseIndicator } from './PulseIndicator.js';

/**
 * @name SovereignIdentityPulse
 * @component
 * @description Atuador visual que ancora a soberania regional no rastro de interface.
 */
const SovereignIdentityPulseComponent: React.FC<ISovereignIdentityPulse> = (properties) => {
  const apparatusName = 'SovereignIdentityPulse';
  const fileLocation = 'libs/foundation/ui-kit-atoms/src/lib/sovereign-identity-pulse/SovereignIdentityPulse.tsx';

  // 1. ADUANA DE ADN (Filtro de Integridade e Selagem de Rastro)
  const validatedData = useMemo(() => {
    const result = SovereignIdentityPulseInputSchema.safeParse(properties);

    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-4001'),
        i18nMappingKey: 'IDENTITY_PULSE_ADN_CORRUPTED',
        severity: 'MEDIUM',
        apparatusMetadata: { name: apparatusName, version: '2.1.0', fileLocation },
        runtimeSnapshot: {
          inputPayload: properties,
          correlationIdentifier: properties.correlationIdentifier || 'ORPHAN_TRACE',
          validationIssues: result.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: 'UI_ATOM_IGNITION_FAILURE'
        }
      });
    }
    return result.data;
  }, [properties]);

  // 2. TELEMETRIA DE IMPACTO VISUAL
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'IDENTITY_PULSE_RENDERED',
      message: `Pulso de soberania regional selado: ${validatedData.regionSlug}`,
      correlationIdentifier: validatedData.correlationIdentifier
    });
  }, [validatedData.regionSlug, validatedData.correlationIdentifier]);

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

  /** @section Mapeamento de Estados Cinéticos */
  const isCriticalPulseActive = validatedData.pulseIntensity === 'CRITICAL';

  return (
    <div
      className="flex flex-col items-start gap-1 select-none font-serif group cursor-default"
      role="status"
      aria-live="polite"
      aria-label={translateLabel('statusAriaLabel', { region: validatedData.regionName })}
    >
      {/* 🏛️ Logo de Soberania Editorial */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl font-black tracking-tighter text-brand-primary dark:text-white uppercase leading-none"
      >
        A GENTE VAI
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.div
          key={validatedData.regionName}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="flex items-center gap-2.5"
        >
          {/*
            📸 CURA DO ERRO TS2739: Injeção de Rastro e Dicionário no Filho.
            Agora o PulseIndicator recebe o rastro técnico obrigatório.
          */}
          <PulseIndicator
            isCritical={isCriticalPulseActive}
            correlationIdentifier={validatedData.correlationIdentifier}
            dictionary={validatedData.dictionary}
          />

          <span className="text-[13px] italic font-medium text-brand-action transition-colors duration-500 group-hover:text-neutral-900 dark:group-hover:text-white">
            {validatedData.regionName} {translateLabel('actionSuffix')}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const SovereignIdentityPulse = memo(SovereignIdentityPulseComponent);
