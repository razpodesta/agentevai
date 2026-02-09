/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PulseIndicator
 * @version 1.1.0
 * @protocol OEDP-V5.5 - High Precision & Kinetic UI
 * @description Átomo visual de feedback cinético para sinalização de estado ativo.
 * Implementa pulsação neural baseada no nível de urgência regional.
 * @policy ZERO-ANY: Estritamente tipado.
 * @policy PERFORMANCE-FIRST: Componente memorizado para otimização de ciclos de renderização.
 */

'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';

/**
 * @section Aduana de ADN (Fronteira Local)
 */
const PulseIndicatorSchema = z.object({
  isCritical: z.boolean()
    .describe('Define se o pulso deve emitir alerta de criticidade (Vermelho) ou estabilidade (Ciano).')
}).readonly();

export type IPulseIndicator = z.infer<typeof PulseIndicatorSchema>;

/**
 * @name PulseIndicator
 * @component
 * @description Partícula cinética que ancora a atenção visual para o status de soberania.
 */
export const PulseIndicator: React.FC<IPulseIndicator> = memo(({ isCritical }) => {
  // 1. Validação de Integridade (Aduana de Micro-Lego)
  const data = PulseIndicatorSchema.parse({ isCritical });

  // 2. Orquestração de Estilos Dinâmicos
  const pulseColorClass = data.isCritical ? 'bg-red-500' : 'bg-brand-action';
  const coreColorClass = data.isCritical ? 'bg-red-600' : 'bg-brand-action';

  return (
    <div
      className="relative flex h-2.5 w-2.5 items-center justify-center"
      aria-hidden="true"
    >
      {/* Halo de Expansão (Pulso Neural) */}
      <motion.span
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{
          scale: [1, 2.4, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className={`absolute inline-flex h-full w-full rounded-full ${pulseColorClass}`}
      />

      {/* Núcleo Estático (Ancoragem Visual) */}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full shadow-sm ring-1 ring-black/5 ${coreColorClass}`} />
    </div>
  );
});

// Identidade Forense para DevTools
PulseIndicator.displayName = 'PulseIndicator';
