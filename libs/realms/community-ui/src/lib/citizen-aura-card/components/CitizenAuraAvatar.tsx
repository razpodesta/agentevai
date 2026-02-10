/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraAvatar
 * @protocol OEDP-V5.5.2
 * @description Unidade visual que orquestra o rastro biométrico (foto/inicial) e a aura cinética.
 */

'use client';

import React from 'react';
import { KineticAuraPulse } from '../KineticAuraPulse.js';

interface ICitizenAuraAvatar {
  readonly citizenName: string;
  readonly profilePictureUrl?: string;
  readonly reputationScore: number;
  readonly isSuspended: boolean;
}

export const CitizenAuraAvatar: React.FC<ICitizenAuraAvatar> = ({
  citizenName,
  profilePictureUrl,
  reputationScore,
  isSuspended
}) => {
  return (
    <div className="relative shrink-0">
      {/* 🎇 Pulso Neural de Reputação */}
      <KineticAuraPulse
        reputationScore={reputationScore}
        isSuspended={isSuspended}
      />
      
      <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-primary border-2 border-white dark:border-neutral-900 shadow-inner flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        {profilePictureUrl ? (
          <img 
            src={profilePictureUrl} 
            alt={citizenName} 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" 
          />
        ) : (
          <span className="text-white font-serif font-black text-2xl uppercase select-none">
            {citizenName.substring(0, 1)}
          </span>
        )}
      </div>
    </div>
  );
};