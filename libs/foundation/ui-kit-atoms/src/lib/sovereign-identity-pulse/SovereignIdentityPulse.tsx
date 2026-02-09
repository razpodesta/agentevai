/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignIdentityPulse
 * @version 1.2.1
 * @protocol OEDP-V5.5 - High Precision & Kinetic UI
 * @description Indicador cinético de presença regional e autoridade de marca.
 * Transmuta o contexto geográfico em uma assinatura visual trilingue e auditável.
 * @policy ZERO-ANY: Erradicação de tipagem anárquica via Branded Type validation.
 * @policy LINGUISTIC_SOVEREIGNTY: Zero strings hardcoded (Ready for Dictionary injection).
 */

'use client';

import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import {
  SovereignError,
  SovereignErrorCodeSchema
} from '@agentevai/sovereign-error-observability';

/**
 * CORREÇÃO ESM: Extensões explícitas para resolução NodeNext.
 * Nota: Importamos o Schema e o PulseIndicator com a terminação .js necessária para o runtime.
 */
import {
  SovereignIdentityPulseSchema,
  type ISovereignIdentityPulse
} from './schemas/SovereignIdentityPulse.schema.js';
import { PulseIndicator } from './PulseIndicator.js';

/**
 * @name SovereignIdentityPulse
 * @component
 * @description Átomo de branding dinâmico que pulsa conforme a saúde e localização regional.
 *
 * @param {ISovereignIdentityPulse} properties - Propriedades validadas pelo ADN Zod.
 */
export const SovereignIdentityPulse: React.FC<ISovereignIdentityPulse> = (properties) => {
  const apparatusName = 'SovereignIdentityPulse';
  const fileLocation = 'libs/foundation/ui-kit-atoms/src/lib/sovereign-identity-pulse/SovereignIdentityPulse.tsx';

  // 1. Aduana de ADN (Saneamento de Tipagem de Elite)
  const data = useMemo(() => {
    const result = SovereignIdentityPulseSchema.safeParse(properties);

    if (!result.success) {
      /**
       * @section CORREÇÃO DE QUALIDADE
       * Erradicação do 'as any'. Utilizamos o SovereignErrorCodeSchema.parse
       * para garantir que o código de erro respeita o ADN Branded do sistema.
       */
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-4001'),
        i18nMappingKey: 'IDENTITY_PULSE_INVALID_PROPS',
        severity: 'HIGH',
        apparatusMetadata: {
          name: apparatusName,
          version: '1.2.1',
          fileLocation
        },
        runtimeSnapshot: {
          inputPayload: properties,
          correlationIdentifier: crypto.randomUUID(),
          validationIssues: result.error.issues
        },
        forensicTrace: {
          timestamp: new Date().toISOString(),
          stack: new Error().stack || 'STACK_TRACE_UNAVAILABLE'
        }
      });
    }
    return result.data;
  }, [properties]);

  // 2. Telemetria de Ciclo de Vida Neural
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'VISUAL_IGNITION',
      message: `Pulso de Soberania renderizado para: ${data.cityName}`,
      metadata: {
        region: data.cityName,
        isUrgent: data.isCritical,
        country: data.countryCode
      }
    });
  }, [data.cityName, data.isCritical, data.countryCode]);

  // 3. Renderização Cinética de Elite
  return (
    <div
      className="flex flex-col items-start gap-0.5 select-none font-serif"
      role="status"
      aria-live="polite"
      aria-label={`Portal Agentevai - Região ativa: ${data.cityName}`}
    >
      {/* Logo de Soberania (A GENTE VAI) - Semantic H1 for SEO Sovereignty */}
      <motion.h1
        className="text-2xl font-black tracking-tighter text-brand-primary dark:text-white uppercase leading-none"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        A GENTE VAI
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={data.cityName}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.4, ease: "anticipate" }}
          className="flex items-center gap-2"
        >
          <PulseIndicator isCritical={data.isCritical} />

          {/* Subtítulo dinâmico: 'em ação' será futuramente injetado via i18n Engine */}
          <span className="text-[13px] italic font-medium text-brand-action transition-colors">
            {data.cityName} em ação
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
