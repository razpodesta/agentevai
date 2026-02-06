/**
 * Raz Podestá - MetaShark Tech
 * Aparato: SovereignIdentityPulse
 * Descrição: Indicador cinético de presença regional e status de urgência.
 * Rota Relativa: libs/foundation/ui-kit-atoms/src/lib/sovereign-identity-pulse/SovereignIdentityPulse.tsx
 */

'use client';

import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { SovereignIdentityPulseSchema, ISovereignIdentityPulse } from './schemas/SovereignIdentityPulse.schema';
import { PulseIndicator } from './PulseIndicator';

export const SovereignIdentityPulse: React.FC<ISovereignIdentityPulse> = (properties) => {
  const apparatusName = 'SovereignIdentityPulse';

  // 1. Aduana de ADN (Zero-Any Policy)
  const data = useMemo(() => {
    const result = SovereignIdentityPulseSchema.safeParse(properties);
    if (!result.success) {
      SovereignLogger({
        severity: 'CRITICAL',
        apparatus: apparatusName,
        operation: 'ADUANA_VALIDATION',
        message: 'Falha na integridade das propriedades de identidade regional.',
        metadata: { validationErrors: result.error.format() }
      });
      throw new Error(`[${apparatusName}]: ADN_INVALIDO`);
    }
    return result.data;
  }, [properties]);

  // 2. Telemetria de Montagem
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'LIFECYCLE_MOUNT',
      message: `Soberania regional estabelecida: ${data.cityName}`,
      metadata: { city: data.cityName, status: data.isCritical ? 'CRITICAL' : 'STABLE' }
    });
  }, [data.cityName, data.isCritical]);

  return (
    <div className="flex flex-col items-start gap-0.5 select-none font-serif">
      <motion.span 
        className="text-2xl font-black tracking-tighter text-brand-primary dark:text-white uppercase leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        A GENTE VAI
      </motion.span>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={data.cityName}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -5, opacity: 0 }}
          className="flex items-center gap-2"
        >
          <PulseIndicator isCritical={data.isCritical} />
          <span className="text-[13px] italic font-medium text-brand-action transition-colors">
            {data.cityName} em ação
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};