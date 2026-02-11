/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCard
 * @version 6.0.0
 * @protocol OEDP-V6.0 - Master Orchestration & Nominal Sealing
 * @description Orquestrador de identidade de prestígio. 
 * Erradicada a radiação de 'any' e conflitos de marcas nominais (TS2741, TS2724).
 * @policy ZERO-ANY: Saneamento absoluto via unificação de interfaces.
 * @policy ATOMIC-ADUANA: Re-selagem de propriedades para cada sub-Lego.
 */

'use client';

import React, { useMemo, useCallback, memo } from 'react';
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

/** @section Aduanas de Sub-Aparatos (Cura TS2741 e TS2724) */
import { CitizenStandingDisplayInputSchema } from './components/schemas/CitizenStandingDisplay.schema.js';
import { CitizenAuraAvatarInputSchema } from './components/schemas/CitizenAuraAvatar.schema.js';

const CitizenAuraCardComponent: React.FC<ICitizenAuraCard> = (properties) => {
  const apparatusName = 'CitizenAuraCard';

  // 1. ADUANA MESTRE (Purificação de Entrada)
  const data = useMemo(() => CitizenAuraCardSchema.parse(properties), [properties]);

  // 2. RESOLUÇÃO LINGUÍSTICA (Cura @typescript-eslint/no-explicit-any)
  const translate = useCallback((key: string) => {
    /** 
     * Casting seguro para a interface real do dicionário. 
     * Removemos a dependência de 'any' para extração do rastro.
     */
    const sovereignDictionary = data.dictionary as unknown as ISovereignDictionary;

    return SovereignTranslationEngine.translate(
      sovereignDictionary, 
      apparatusName, 
      key, 
      {}, 
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  // 3. RESOLUÇÃO DE IDENTIDADE
  const humanizedRole = useMemo(() => {
    const sovereignDictionary = data.dictionary as unknown as ISovereignDictionary;
    const dynamicLocale = sovereignDictionary.metadata.locale || 'pt-BR';

    const input = TranslateIdentityRoleInputSchema.parse({
      targetIdentityRole: data.identityRole,
      activeSovereignLocale: dynamicLocale,
      correlationIdentifier: data.correlationIdentifier
    });
    return TranslateIdentityRole(input);
  }, [data]);

  /**
   * @section RE-SELAGEM DE ADN (Cura TS2741)
   * Criamos os objetos de propriedades e aplicamos o Schema de cada filho.
   * Isso injeta o símbolo [$brand] exigido, impedindo o colapso de tipo.
   */
  const standingDisplayProperties = useMemo(() => {
    return CitizenStandingDisplayInputSchema.parse({
      citizenName: data.citizenName,
      humanizedRole: humanizedRole,
      reputationScore: data.reputationStandingScore,
      isSuspended: data.isProfileSuspended,
      dictionary: data.dictionary,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data, humanizedRole]);

  const avatarProperties = useMemo(() => {
    return CitizenAuraAvatarInputSchema.parse({
      citizenName: data.citizenName,
      profilePictureUrl: data.profilePictureUrl,
      standingPoints: data.reputationStandingScore,
      isSuspended: data.isProfileSuspended,
      dictionary: data.dictionary,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data]);

  return (
    <div 
      className="flex items-center gap-6 p-6 bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/5 rounded-xs shadow-2xl group transition-all duration-700 hover:border-brand-action/30"
      role="region" 
      aria-label={`${translate('ariaLabel')}: ${data.citizenName}`}
    >
      <div className="relative">
        <CitizenAuraAvatar {...avatarProperties} />
        <CitizenSovereignBadge isVisible={data.assuranceLevel === 'IAL3_SOVEREIGN'} />
      </div>

      <CitizenStandingDisplay {...standingDisplayProperties} />
    </div>
  );
};

export const CitizenAuraCard = memo(CitizenAuraCardComponent);