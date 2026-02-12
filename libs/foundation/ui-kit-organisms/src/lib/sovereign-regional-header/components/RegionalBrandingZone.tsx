/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus RegionalBrandingZone
 * @version 1.0.0
 * @protocol OEDP-V6.0 - Atomic UI
 * @description Unidade de responsabilidade única para renderização da marca regionalizada.
 */

import React, { memo } from 'react';
import { SovereignHeaderBranding } from '@agentevai/ui-kit-atoms';

interface IRegionalBrandingZone {
  readonly regionName: string;
  readonly actionSuffix: string;
}

const RegionalBrandingZoneComponent: React.FC<IRegionalBrandingZone> = ({ 
  regionName, 
  actionSuffix 
}) => (
  <div className="flex-1 overflow-hidden">
    <SovereignHeaderBranding 
      regionName={regionName} 
      actionSuffix={actionSuffix} 
      isInteractive={true} 
    />
  </div>
);

/**
 * @section Selagem de Performance
 * Memoização para evitar repaints em transições cinéticas do Organismo pai.
 */
export const RegionalBrandingZone = memo(RegionalBrandingZoneComponent);