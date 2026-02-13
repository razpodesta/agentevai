/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraCard
 * @version 6.5.1
 * @protocol OEDP-V6.5 - Master Orchestration & Nominal Sealing
 * @description Orquestrador de identidade de prestígio. 
 * CURADO: Erradicada falha TS2724 e unificado o rastro de ADN Nominal.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { 
  TranslateIdentityRole, 
  TranslateIdentityRoleInputSchema 
} from '@agentevai/identity-domain';

/** @section Sincronia de ADN (Cura TS2724) */
import { 
  CitizenAuraCardSchema, 
  type ICitizenAuraCard 
} from './schemas/CitizenAuraCard.schema.js';

/** @section Sub-Legos e Aduanas Locais */
import { CitizenAuraAvatar } from './components/CitizenAuraAvatar.js';
import { CitizenAuraAvatarInputSchema } from './components/schemas/CitizenAuraAvatar.schema.js';
import { CitizenStandingDisplay } from './components/CitizenStandingDisplay.js';
import { CitizenStandingDisplayInputSchema } from './components/schemas/CitizenStandingDisplay.schema.js';
import { CitizenSovereignBadge } from './components/CitizenSovereignBadge.js';

/**
 * @name CitizenAuraCard
 * @component
 * @description Representação visual selada da autoridade e mérito do cidadão.
 */
const CitizenAuraCardComponent: React.FC<ICitizenAuraCard> = (properties) => {
  const apparatusName = 'CitizenAuraCard';
  const fileLocation = 'libs/realms/community-ui/src/lib/citizen-aura-card/CitizenAuraCard.tsx';
  const startTimestamp = performance.now();

  try {
    // 1. ADUANA MESTRE (Cura TS2724: Sincronia com o membro CitizenAuraCardSchema)
    const data = CitizenAuraCardSchema.parse(properties);
    const { correlationIdentifier, dictionary, citizenName, assuranceLevel } = data;

    // 2. RESOLUÇÃO SEMÂNTICA (Pilar 5)
    const translateLabel = useCallback((semanticKey: string) => {
      return SovereignTranslationEngine.translate(
        dictionary as unknown as ISovereignDictionary, 
        apparatusName, 
        semanticKey, 
        {}, 
        correlationIdentifier
      );
    }, [dictionary, correlationIdentifier]);

    // 3. TELEMETRIA SINCRO E PERFORMANCE (Pilar 6)
    useEffect(() => {
      const endTimestamp = performance.now();
      const mountingLatency = parseFloat((endTimestamp - startTimestamp).toFixed(4));

      SovereignLogger({
        severity: 'INFO',
        apparatus: apparatusName,
        operation: 'AURA_CARD_MOUNTED',
        message: `Identidade de ${citizenName} selada com sucesso.`,
        correlationIdentifier,
        metadata: { 
          latencyMs: mountingLatency,
          assuranceLevel: assuranceLevel
        }
      });
    }, [citizenName, correlationIdentifier, assuranceLevel, startTimestamp]);

    // 4. RESOLUÇÃO DE IDENTIDADE HUMANIZADA (DDD Integration)
    const humanizedRole = useMemo(() => {
      const sovereignDictionary = dictionary as unknown as ISovereignDictionary;
      const activeLocale = sovereignDictionary.metadata.locale;

      const roleInput = TranslateIdentityRoleInputSchema.parse({
        targetIdentityRole: data.identityRole,
        activeSovereignLocale: activeLocale,
        correlationIdentifier
      });
      
      return TranslateIdentityRole(roleInput);
    }, [data.identityRole, dictionary, correlationIdentifier]);

    /**
     * @section RE-SELAGEM DE ADN (Cura TS2741)
     * Geramos os contratos para os filhos garantindo a permanência da marca nominal.
     */
    const standingDisplayProperties = useMemo(() => {
      return CitizenStandingDisplayInputSchema.parse({
        citizenName,
        humanizedRole,
        reputationScore: data.reputationStandingScore,
        isSuspended: data.isProfileSuspended,
        dictionary,
        correlationIdentifier
      });
    }, [data, citizenName, humanizedRole, dictionary, correlationIdentifier]);

    const avatarProperties = useMemo(() => {
      return CitizenAuraAvatarInputSchema.parse({
        citizenName,
        profilePictureUrl: data.profilePictureUrl,
        standingPoints: data.reputationStandingScore,
        isSuspended: data.isProfileSuspended,
        dictionary,
        correlationIdentifier
      });
    }, [data, citizenName, dictionary, correlationIdentifier]);

    return (
      <div 
        className="flex items-center gap-6 p-6 bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/5 rounded-xs shadow-2xl group transition-all duration-700 hover:border-brand-action/30"
        role="region" 
        aria-label={`${translateLabel('ariaLabel')}: ${citizenName}`}
      >
        <div className="relative">
          <CitizenAuraAvatar {...avatarProperties} />
          {/* O Badge de Soberania exige o nível IAL3 para ser renderizado */}
          <CitizenSovereignBadge isVisible={assuranceLevel === 'IAL3_SOVEREIGN'} />
        </div>

        <CitizenStandingDisplay {...standingDisplayProperties} />
      </div>
    );

  } catch (caughtError) {
    // 5. RESILIÊNCIA FORENSE (Cura do rastro de erro)
    throw SovereignError.transmute(caughtError, {
      code: SovereignErrorCodeSchema.parse('OS-APP-4005'),
      apparatus: apparatusName,
      location: fileLocation,
      correlationIdentifier: properties.correlationIdentifier,
      severity: 'CRITICAL',
      recoverySuggestion: 'Validar se o rastro de dicionário regional possui a estrutura ISovereignDictionary.'
    });
  }
};

export const CitizenAuraCard = memo(CitizenAuraCardComponent);