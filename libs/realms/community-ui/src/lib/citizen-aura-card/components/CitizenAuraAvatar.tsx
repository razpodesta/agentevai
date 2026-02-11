/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus CitizenAuraAvatar
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Master Orchestration
 * @description Unidade visual que orquestra o rastro biométrico e a aura cinética.
 * CURA TS2741: Implementada re-selagem de ADN para o componente KineticAuraPulse.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';
import { SovereignLogger } from '@agentevai/sovereign-logger';

/** @section Sincronia de ADN e Sub-Legos */
import { KineticAuraPulse } from '../KineticAuraPulse.js';
import { KineticAuraPulseInputSchema } from '../schemas/KineticAuraPulse.schema.js';
import { 
  CitizenAuraAvatarInputSchema, 
  type ICitizenAuraAvatarInput 
} from './schemas/CitizenAuraAvatar.schema.js';

const CitizenAuraAvatarComponent: React.FC<ICitizenAuraAvatarInput> = (properties) => {
  const apparatusName = 'CitizenAuraAvatar';

  // 1. ADUANA DE ADN (Fixação do Rastro e Validação)
  const data = useMemo(() => 
    CitizenAuraAvatarInputSchema.parse(properties), 
  [properties]);

  // 2. TELEMETRIA DE IGNIÇÃO VISUAL
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'AVATAR_UNIT_MOUNTED',
      message: `Rastro visual iniciado para ${data.citizenName}.`,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data.citizenName, data.correlationIdentifier]);

  // 3. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  /**
   * @section RE-SELAGEM DE ADN (Cura TS2741)
   * Criamos o rastro de propriedades para o filho e aplicamos o Schema dele.
   * Isso injeta o símbolo [$brand] exigido, impedindo o colapso de tipo no JSX.
   */
  const pulseProperties = useMemo(() => {
    return KineticAuraPulseInputSchema.parse({
      standingPoints: data.standingPoints,
      isSuspended: data.isSuspended,
      dictionary: data.dictionary,
      correlationIdentifier: data.correlationIdentifier
    });
  }, [data]);

  return (
    <div className="relative shrink-0 group">
      {/* 🎇 Pulso Neural de Reputação (Injetado com rastro Branded) */}
      <KineticAuraPulse {...pulseProperties} />
      
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900 shadow-2xl bg-brand-primary flex items-center justify-center transition-all duration-700 group-hover:scale-105 group-hover:border-brand-action/50">
        {data.profilePictureUrl ? (
          <img 
            src={data.profilePictureUrl} 
            alt={translate('avatarAlternateText', { name: data.citizenName })} 
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
          />
        ) : (
          <span 
            className="text-white font-serif font-black text-3xl uppercase select-none"
            aria-label={translate('initialsPlaceholder', { initial: data.citizenName.substring(0, 1) })}
          >
            {data.citizenName.substring(0, 1)}
          </span>
        )}
      </div>
    </div>
  );
};

export const CitizenAuraAvatar = memo(CitizenAuraAvatarComponent);