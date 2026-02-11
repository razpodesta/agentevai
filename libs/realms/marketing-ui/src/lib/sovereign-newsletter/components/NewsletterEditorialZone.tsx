/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus NewsletterEditorialZone
 * @description Unidade visual de impacto narrativo.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface INewsletterEditorialZone {
  readonly title: string;
  readonly actionSuffix: string;
  readonly bodyText: string;
}

export const NewsletterEditorialZone: React.FC<INewsletterEditorialZone> = ({
  title,
  actionSuffix,
  bodyText
}) => (
  <div className="flex-1">
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl font-serif font-black text-brand-primary dark:text-white leading-[0.95] tracking-tighter"
    >
      {title} <br />
      <span className="text-brand-action italic font-medium">
        {actionSuffix}
      </span>
    </motion.h2>
    <p className="mt-8 text-xl text-neutral-500 dark:text-neutral-400 font-sans max-w-lg leading-relaxed">
      {bodyText}
    </p>
  </div>
);
