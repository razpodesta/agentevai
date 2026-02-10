/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus KineticSheenBackdrop
 */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { KineticSheenBackdropSchema, type IKineticSheenBackdrop } from '../schemas/KineticSheenBackdrop.schema.js';

export const KineticSheenBackdrop: React.FC<IKineticSheenBackdrop> = (properties) => {
  const { isActive } = KineticSheenBackdropSchema.parse(properties);
  if (!isActive) return null;

  return (
    <motion.div 
      animate={{ x: ['-100%', '200%'] }} 
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
    />
  );
};