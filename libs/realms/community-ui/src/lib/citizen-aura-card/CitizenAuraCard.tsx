/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCard
 * @version 5.0.0
 * @protocol OEDP-V6.0 - Master Orchestration
 * @description Saneado contra TS2322, TS2741 e conflitos de marca nominal.
 */

'use client';

import React, { useMemo, useCallback } from 'react';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { 
  TranslateIdentityRole, 
  TranslateIdentityRoleInputSchema 
} from '@agentevai/identity-domain';

/** @section Sincronia de ADN e Sub-Legos */
import { CitizenAuraCardSchema, type ICitizenAuraCard } from './schemas/CitizenAuraCard.schema.js';
import { CitizenAuraAvatar } from './components/CitizenAuraAvatar.js';
import { CitizenStandingDisplay } from './components/CitizenStandingDisplay.js';
import { CitizenSovereignBadge } from './components/CitizenSovereignBadge.js';

/** @section Aduanas de Sub-Aparatos (Cura TS2741) */
import { CitizenStandingDisplaySchema } from './components/schemas/CitizenStandingDisplay.schema.js';

export const CitizenAuraCard: React.FC<ICitizenAuraCard> = (properties) => {
  const apparatusName = 'CitizenAuraCard';

  // 1. ADUANA MESTRE
  const data = useMemo(() => CitizenAuraCardSchema.parse(properties), [properties]);

  const translate = useCallback((key: string) => 
    SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary, 
      apparatusName, key, {}, data.correlationIdentifier
    ), [data]);

  // 2. RESOLUÇÃO DE IDENTIDADE
  const humanizedRole = useMemo(() => {
    const dynamicLocale = (data.dictionary as any)?.metadata?.locale || 'pt-BR';
    const input = TranslateIdentityRoleInputSchema.parse({
      targetIdentityRole: data.identityRole,
      activeSovereignLocale: dynamicLocale,
      correlationIdentifier: data.correlationIdentifier
    });
    return TranslateIdentityRole(input);
  }, [data]);

  /**
   * @section RE-SELAGEM DE ADN (Cura TS2741)
   * Criamos o objeto e aplicamos o Schema do filho para injetar o [$brand] necessário.
   */
  const standingDisplayProperties = useMemo(() => {
    return CitizenStandingDisplaySchema.parse({
      citizenName: data.citizenName,
      humanizedRole: humanizedRole,
      reputationScore: data.reputationStandingScore,
      isSuspended: data.isProfileSuspended,
      dictionary: data.dictionary,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data, humanizedRole]);

  return (
    <div 
      className="flex items-center gap-6 p-6 bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/5 rounded-xs shadow-2xl group transition-all duration-700"
      role="region" 
      aria-label={`${translate('ariaLabel')}: ${data.citizenName}`}
    >
      <div className="relative">
        <CitizenAuraAvatar 
          citizenName={data.citizenName} 
          profilePictureUrl={data.profilePictureUrl} 
          standingPoints={data.reputationStandingScore} 
          isSuspended={data.isProfileSuspended}
          dictionary={data.dictionary}
          correlationIdentifier={data.correlationIdentifier}
        />
        <CitizenSovereignBadge isVisible={data.assuranceLevel === 'IAL3_SOVEREIGN'} />
      </div>

      {/* Injeção do rastro Branded já validado pela aduana específica */}
      <CitizenStandingDisplay {...standingDisplayProperties} />
    </div>
  );
};