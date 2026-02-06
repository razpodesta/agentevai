/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus PulseIndicator
 * @function Átomo visual de feedback cinético para sinalização de estado ativo.
 * @context Foundation / Atomic Design
 */

import React from 'react';
import { motion } from 'framer-motion';

interface PulseIndicatorProperties {
  readonly isCritical: boolean;
}

export const PulseIndicator: React.FC<PulseIndicatorProperties> = ({ isCritical }) => {
  return (
    <div className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
      <motion.span
        animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className={`absolute inline-flex h-full w-full rounded-full ${
          isCritical ? 'bg-red-500' : 'bg-brand-action'
        }`}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full shadow-sm ${
        isCritical ? 'bg-red-600' : 'bg-brand-action'
      }`} />
    </div>
  );
};