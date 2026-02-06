/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticBackdrop
 * @description Efeito visual de profundidade e brilho para ações de alta prioridade.
 */

import React from 'react';
import { motion } from 'framer-motion';

export const KineticBackdrop: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.1, 0.3, 0.1] }}
    transition={{ repeat: Infinity, duration: 3 }}
    className="absolute inset-0 bg-gradient-to-r from-brand-action/20 to-transparent pointer-events-none"
  />
);