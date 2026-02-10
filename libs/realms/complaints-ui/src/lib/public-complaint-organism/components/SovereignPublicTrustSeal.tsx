/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignPublicTrustSeal
 */

'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { PublicTrustSealInputSchema, type IPublicTrustSealInput } from '../schemas/ComplaintSubComponents.schema.js';

export const SovereignPublicTrustSeal: React.FC<IPublicTrustSealInput> = (properties) => {
  const apparatusName = 'PublicComplaintOrganism';
  const validated = PublicTrustSealInputSchema.parse(properties);

  const translate = useCallback((key: string) => 
    SovereignTranslationEngine.translate(
      validated.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      {},
      validated.correlationIdentifier
    ), [validated]);

  return (
    <div className="flex flex-col items-center lg:items-end group cursor-help transition-opacity hover:opacity-100 opacity-80">
      <div className="flex items-center gap-2.5 text-green-600 dark:text-brand-action">
        <div className="relative">
          <ShieldCheck size={20} />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-current rounded-full -z-10"
          />
        </div>
        <span className="text-xs font-mono font-black uppercase tracking-widest">
            {translate('blockchainVerifiedLabel')}
        </span>
      </div>
      <p className="text-[10px] font-mono text-neutral-500 mt-2 truncate max-w-[200px] lg:max-w-none transition-all duration-700">
        {validated.merkleRootAnchor}
      </p>
    </div>
  );
};