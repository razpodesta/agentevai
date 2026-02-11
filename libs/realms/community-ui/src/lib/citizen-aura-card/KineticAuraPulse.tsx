/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticAuraPulse
 * @version 2.0.0
 * @protocol OEDP-V6.0 - Visual Skin & Neural Resonance
 * @description Atuador visual que pulsa cores baseadas na reputação. 
 * Saneado com ADN Zod e suporte a Acessibilidade Soberana.
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { KineticAuraPulseInputSchema, type IKineticAuraPulseInput } from './schemas/KineticAuraPulse.schema.js';

/**
 * @name KineticAuraPulse
 * @component
 */
export const KineticAuraPulse: React.FC<IKineticAuraPulseInput> = (properties) => {
  const apparatusName = 'KineticAuraPulse';

  // 1. ADUANA DE ADN
  const data = useMemo(() => KineticAuraPulseInputSchema.parse(properties), [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Acessibilidade Visual)
  const translate = useCallback((key: string) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      {},
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  // 3. MATRIZ CROMÁTICA DE PRESTÍGIO
  const auraTheme = useMemo(() => {
    if (data.isSuspended) return { color: "rgba(220, 38, 38, 0.6)", label: 'auraDescription_RED' };
    if (data.standingPoints > 5000) return { color: "rgba(255, 215, 0, 0.5)", label: 'auraDescription_GOLD' };
    return { color: "rgba(0, 229, 253, 0.4)", label: 'auraDescription_CYAN' };
  }, [data.standingPoints, data.isSuspended]);

  return (
    <motion.div
      role="status"
      aria-label={translate(auraTheme.label)}
      initial={{ opacity: 0.2, scale: 1 }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.25, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: data.isSuspended ? 1.5 : 4,
        ease: "easeInOut"
      }}
      style={{ backgroundColor: auraTheme.color }}
      className="absolute inset-0 rounded-full blur-xl -z-10 shadow-[0_0_30px_rgba(0,0,0,0.1)]"
    />
  );
};