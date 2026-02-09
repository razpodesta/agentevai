/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticAuraPulse (RCC)
 * @description Atuador visual que pulsa cores e brilho baseados na reputação do cidadão.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface IKineticAuraPulse {
  reputationScore: number;
  isSuspended: boolean;
}

export const KineticAuraPulse: React.FC<IKineticAuraPulse> = ({ reputationScore, isSuspended }) => {
  // Determinação de cor baseada no standing
  let auraColor = "rgba(0, 229, 255, 0.4)"; // Default: Action Cyan
  if (isSuspended) auraColor = "rgba(220, 38, 38, 0.6)"; // Red Critical
  else if (reputationScore > 5000) auraColor = "rgba(255, 215, 0, 0.5)"; // Gold Prestige

  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 1 }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.15, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: isSuspended ? 1 : 4, // Pulsar mais rápido se for hostil
        ease: "easeInOut"
      }}
      style={{ backgroundColor: auraColor }}
      className="absolute inset-0 rounded-full blur-md -z-10"
    />
  );
};
