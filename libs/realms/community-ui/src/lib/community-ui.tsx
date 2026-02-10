/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignCommunityShell
 * @version 1.2.0
 * @protocol OEDP-V5.5.2 - Visual Prestige & Forensic Precision
 * @description Smart Shell que organiza a zona de interação social do cidadão. 
 * Saneado contra erro de marca nominal (TS2741) via validação de propriedades de sub-aparato.
 */

'use client';

import React, { useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, ShieldCheck } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

// ADN e Aparatos de Elite (Sincronia ESM)
import { 
  SovereignCommunityShellInputSchema, 
  type ISovereignCommunityShellInput 
} from './schemas/SovereignCommunityShell.schema.js';
import { CitizenAuraCard } from './citizen-aura-card/CitizenAuraCard.js';
import { CitizenAuraCardSchema } from './citizen-aura-card/schemas/CitizenAuraCard.schema.js';

/**
 * @name SovereignCommunityShell
 * @component
 */
export const SovereignCommunityShell: React.FC<ISovereignCommunityShellInput> = (properties) => {
  const apparatusName = 'SovereignCommunityShell';
  const fileLocation = 'libs/realms/community-ui/src/lib/community-ui.tsx';

  // 1. ADUANA DE ADN (Garante integridade e fixa o rastro forense do Shell)
  const validatedProperties = useMemo(() => {
    const result = SovereignCommunityShellInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-4001'),
        i18nMappingKey: 'COMMUNITY_SHELL_ADN_CORRUPTED',
        severity: 'HIGH',
        apparatusMetadata: { 
          name: apparatusName, 
          version: '1.2.0', 
          fileLocation 
        },
        runtimeSnapshot: { 
          inputPayload: properties,
          correlationIdentifier: properties.correlationIdentifier,
          validationIssues: result.error.issues 
        },
        forensicTrace: { 
          timestamp: new Date().toISOString(), 
          stack: new Error().stack || 'SHELL_IGNITION_FAILURE' 
        }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA (Tradução via Engine)
  const translateLabel = useCallback((semanticKey: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      validatedProperties.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      semanticKey,
      variables,
      validatedProperties.correlationIdentifier
    );
  }, [validatedProperties.dictionary, validatedProperties.correlationIdentifier]);

  /** 
   * @section Cura do Erro TS2741 (Marca Nominal)
   * Criamos e validamos o objeto de propriedades do CitizenAuraCard através de seu próprio Schema.
   * Isso garante que o objeto passado via spread (...) carregue o selo nominal [$brand].
   */
  const citizenAuraProperties = useMemo(() => {
    return CitizenAuraCardSchema.parse({
      ...validatedProperties.activeCitizen,
      dictionary: validatedProperties.dictionary,
      correlationIdentifier: validatedProperties.correlationIdentifier,
    });
  }, [validatedProperties.activeCitizen, validatedProperties.dictionary, validatedProperties.correlationIdentifier]);

  // 3. TELEMETRIA DE IGNIÇÃO NEURAL
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'SHELL_IGNITION_SUCCESS',
      message: `Cidadão [${validatedProperties.activeCitizen.citizenName}] iniciou presença na zona comunitária.`,
      traceIdentifier: validatedProperties.correlationIdentifier
    });
  }, [validatedProperties.activeCitizen.citizenName, validatedProperties.correlationIdentifier]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-1000">
      
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* SIDEBAR: Identidade e Autoridade */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <section className="sticky top-28 flex flex-col gap-6">
            
            <header className="flex items-center gap-3 mb-2">
                <Users size={20} className="text-brand-action" />
                <h2 className="font-serif font-black text-xs uppercase tracking-[0.3em] text-neutral-400">
                    {translateLabel('citizenAuthorityTitle')}
                </h2>
            </header>

            {/* Aparato de Identidade Selado com Marca Nominal validada */}
            <CitizenAuraCard {...citizenAuraProperties} />

            {/* Métricas de Impacto Social */}
            <div className="p-8 border border-neutral-200 dark:border-white/5 rounded-sm bg-neutral-50/50 dark:bg-white/2 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-neutral-400">
                        {translateLabel('impactMetricLabel')}
                    </span>
                    <Activity size={14} className="text-brand-action animate-pulse" />
                </div>
                <p className="text-4xl font-serif font-black text-brand-primary dark:text-white leading-none">
                    {validatedProperties.activeCitizen.reputationStandingScore}
                    <span className="text-xs ml-3 text-brand-action italic font-medium uppercase tracking-tighter">
                        Standing
                    </span>
                </p>
                <div className="mt-8 flex items-center gap-2.5 text-[9px] font-mono text-neutral-500 uppercase tracking-tighter border-t border-neutral-200 dark:border-white/5 pt-4">
                    <ShieldCheck size={12} className="text-green-500" />
                    {translateLabel('sovereignStatusMessage')}
                </div>
            </div>
          </section>
        </aside>

        {/* CONTENT: Feed e Engajamento */}
        <main className="lg:col-span-8 flex flex-col gap-10">
          <header className="border-b border-neutral-100 dark:border-white/5 pb-8 mb-4">
             <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-brand-primary dark:text-white leading-none">
                {translateLabel('communityFeedTitle')}
             </h1>
          </header>

          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-12"
          >
            {validatedProperties.children}
          </motion.section>
        </main>

      </div>
    </div>
  );
};