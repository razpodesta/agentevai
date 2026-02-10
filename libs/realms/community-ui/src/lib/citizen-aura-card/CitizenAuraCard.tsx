/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCard
 * @version 3.0.0
 * @protocol OEDP-V5.5.2 - Master Orchestration
 */
'use client';
import React, { useMemo, useCallback } from 'react';
import { SovereignTranslationEngine, type ISovereignDictionary } from '@agentevai/internationalization-engine';
import { TranslateIdentityRole, TranslateIdentityRoleInputSchema, SovereignLocaleSchema } from '@agentevai/identity-domain';

/** @section ADN e Legos Saneados */
import { CitizenAuraCardSchema, type ICitizenAuraCard } from './schemas/CitizenAuraCard.schema.js';
import { CitizenAuraAvatar } from './components/CitizenAuraAvatar.js';
import { CitizenStandingDisplay } from './components/CitizenStandingDisplay.js';
import { CitizenSovereignBadge } from './components/CitizenSovereignBadge.js';

export const CitizenAuraCard: React.FC<ICitizenAuraCard> = (properties) => {
  const data = useMemo(() => CitizenAuraCardSchema.parse(properties), [properties]);

  const translate = useCallback((key: string) => 
    SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary, 
      'CitizenAuraCard', key, {}, data.correlationIdentifier
    ), [data]);

  const humanizedRole = useMemo(() => {
    const input = TranslateIdentityRoleInputSchema.parse({
      targetIdentityRole: data.identityRole,
      activeSovereignLocale: SovereignLocaleSchema.parse('pt-BR'),
      correlationIdentifier: data.correlationIdentifier
    });
    return TranslateIdentityRole(input);
  }, [data]);

  return (
    <div className="flex items-center gap-5 p-5 bg-white dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-sm shadow-sm group transition-all duration-500 hover:shadow-md"
      role="region" aria-label={`${translate('ariaLabel')}: ${data.citizenName}`}>
      
      <div className="relative">
        <CitizenAuraAvatar 
          citizenName={data.citizenName} 
          profilePictureUrl={data.profilePictureUrl} 
          reputationScore={data.reputationStandingScore} 
          isSuspended={data.isProfileSuspended} 
        />
        {data.assuranceLevel === 'IAL3_SOVEREIGN' && <CitizenSovereignBadge isVisible={true} />}
      </div>

      <CitizenStandingDisplay 
        citizenName={data.citizenName}
        humanizedRole={humanizedRole}
        reputationScore={data.reputationStandingScore}
        isSuspended={data.isProfileSuspended}
        dictionary={data.dictionary}
        correlationIdentifier={data.correlationIdentifier}
      />
    </div>
  );
};