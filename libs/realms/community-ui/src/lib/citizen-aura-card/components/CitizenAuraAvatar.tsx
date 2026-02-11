/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraAvatar
 * @protocol OEDP-V6.0
 */

'use client';

import React from 'react';
import { KineticAuraPulse } from '../KineticAuraPulse.js';

/** 
 * @section Sincronia de ADN 
 * CURA TS2322: Alinhamento de propriedade para standingPoints.
 */
export interface ICitizenAuraAvatar {
  readonly citizenName: string;
  readonly profilePictureUrl?: string;
  readonly standingPoints: number; // Nivelado com o novo padrão
  readonly isSuspended: boolean;
  readonly dictionary: Record<string, unknown>;
  readonly correlationIdentifier: string;
}

export const CitizenAuraAvatar: React.FC<ICitizenAuraAvatar> = (properties) => {
  return (
    <div className="relative shrink-0">
      <KineticAuraPulse
        standingPoints={properties.standingPoints}
        isSuspended={properties.isSuspended}
        dictionary={properties.dictionary}
        correlationIdentifier={properties.correlationIdentifier}
      />
      
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900 shadow-inner bg-brand-primary flex items-center justify-center">
        {properties.profilePictureUrl ? (
          <img src={properties.profilePictureUrl} alt={properties.citizenName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-serif font-black text-2xl">{properties.citizenName.substring(0, 1)}</span>
        )}
      </div>
    </div>
  );
};