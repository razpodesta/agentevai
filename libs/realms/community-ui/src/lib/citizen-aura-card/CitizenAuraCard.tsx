/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCard (RSC)
 * @description Organismo de elite que apresenta a autoridade do cidadão.
 */

import React from 'react';
import { TranslateIdentityRole } from '@agentevai/identity-domain';
import { CitizenAuraCardSchema, type ICitizenAuraCard } from './schemas/CitizenAuraCard.schema.js';
import { KineticAuraPulse } from './KineticAuraPulse.js'; // Nosso braço Client

export const CitizenAuraCard: React.FC<ICitizenAuraCard> = (properties) => {
  // 1. Aduana de ADN
  const data = CitizenAuraCardSchema.parse(properties);

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-sm shadow-sm group">
      {/* Zona Cinética (Client-Side Interactivity) */}
      <div className="relative">
        <KineticAuraPulse
          reputationScore={data.reputationStandingScore}
          isSuspended={data.isProfileSuspended}
        />
        <div className="w-14 h-14 rounded-full overflow-hidden bg-brand-primary border-2 border-white dark:border-neutral-900 shadow-inner">
          {data.profilePictureUrl ? (
             <img src={data.profilePictureUrl} alt={data.citizenName} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-white font-serif font-black text-xl">
              {data.citizenName.substring(0, 1)}
            </div>
          )}
        </div>
      </div>

      {/* Zona Editorial (RSC) */}
      <div className="flex flex-col">
        <h3 className="font-serif font-black text-brand-primary dark:text-white uppercase tracking-tighter text-lg leading-none">
          {data.citizenName}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 dark:bg-white/5 text-neutral-500 rounded-sm uppercase tracking-widest border border-neutral-200 dark:border-white/10">
            {data.identityRole}
          </span>

          <span className="text-[11px] font-serif italic font-medium text-brand-action">
            {data.reputationStandingScore} pts
          </span>
        </div>
      </div>
    </div>
  );
};
