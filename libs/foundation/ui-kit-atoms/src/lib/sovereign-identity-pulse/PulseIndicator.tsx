/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PulseIndicator
 * @version 2.0.0
 * @protocol OEDP-V6.0 - High Performance Kinetic UI
 * @description Partícula visual de feedback sistêmico.
 * Implementa física de mola para representar a vitalidade do rastro regional.
 */

'use client';

import React, { useMemo, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN Local */
import {
  PulseIndicatorInputSchema,
  type IPulseIndicator
} from './schemas/PulseIndicator.schema.js';

const PulseIndicatorComponent: React.FC<IPulseIndicator> = (properties) => {
  const apparatusName = 'PulseIndicator';

  // 1. ADUANA DE MICRO-ADN (Validação de integridade atômica)
  const validatedData = useMemo(() =>
    PulseIndicatorInputSchema.parse(properties),
  [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Acessibilidade Soberana)
  const translateLabel = useCallback((semanticKey: string) => {
    return SovereignTranslationEngine.translate(
      validatedData.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      {},
      validatedData.correlationIdentifier
    );
  }, [validatedData.dictionary, validatedData.correlationIdentifier]);

  // 3. ORQUESTRAÇÃO CROMÁTICA
  const pulseColorClass = validatedData.isCritical ? 'bg-red-500' : 'bg-brand-action';
  const coreColorClass = validatedData.isCritical ? 'bg-red-600' : 'bg-brand-action';

  return (
    <div
      className="relative flex h-3 w-3 items-center justify-center"
      role="img"
      aria-label={translateLabel(validatedData.isCritical ? 'statusCritical' : 'statusStable')}
    >
      {/* Halo de Expansão Neural (Física de Mola) */}
      <motion.span
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          repeat: Infinity,
          duration: validatedData.isCritical ? 1.5 : 3, // Cadência acelerada em alerta
          ease: "easeInOut"
        }}
        className={`absolute inline-flex h-full w-full rounded-full shadow-lg ${pulseColorClass}`}
      />

      {/* Núcleo de Ancoragem Estática */}
      <span
        className={`relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-white/10 dark:ring-black/20 ${coreColorClass}`}
      />
    </div>
  );
};

/**
 * @section Selagem de Performance
 * Memoização atômica para evitar repaints desnecessários no enxame de UI.
 */
export const PulseIndicator = memo(PulseIndicatorComponent);
