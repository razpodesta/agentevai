/**
 * @author Raz Podestá - MetaShark Tech
 * @apparatus SovereignCommunityShell
 * @version 3.0.0
 * @protocol OEDP-V6.0 - Prestige Editorial Architecture
 * @description Orquestrador de layout saneado contra TS2724 e TS2353.
 * @policy ATOMIC-RESOLUTION: Separação estrita entre ADN e Componentes.
 * @policy ZERO-ANY: Saneamento total via ISovereignDictionary casting.
 */

'use client';

import React, { useMemo, useCallback, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { SovereignLogger } from '@agentevai/sovereign-logger';
import { 
  SovereignError, 
  SovereignErrorCodeSchema 
} from '@agentevai/sovereign-error-observability';
import { 
  SovereignTranslationEngine, 
  type ISovereignDictionary 
} from '@agentevai/internationalization-engine';

/** @section Sincronia de ADN e Sub-Legos */
import { 
  SovereignCommunityShellInputSchema, 
  type ISovereignCommunityShellInput 
} from './schemas/SovereignCommunityShell.schema.js';

/** 
 * @section CURA TS2724 
 * Importação segregada: UI do .tsx e ADN do .schema.ts. 
 */
import { CitizenAuraCard } from '../citizen-aura-card/CitizenAuraCard.js';
import { CitizenAuraCardSchema } from '../citizen-aura-card/schemas/CitizenAuraCard.schema.js';
import { ImpactMetricCard } from './components/ImpactMetricCard.js';

const SovereignCommunityShellComponent: React.FC<ISovereignCommunityShellInput> = (properties) => {
  const apparatusName = 'SovereignCommunityShell';
  const fileLocation = 'libs/realms/community-ui/src/lib/sovereign-community-shell/SovereignCommunityShell.tsx';

  // 1. ADUANA DE ADN (Validando integridade e rastro)
  const data = useMemo(() => {
    const result = SovereignCommunityShellInputSchema.safeParse(properties);
    if (!result.success) {
      throw new SovereignError({
        uniqueErrorCode: SovereignErrorCodeSchema.parse('OS-APP-4001'),
        i18nMappingKey: 'COMMUNITY_SHELL_ADN_CORRUPTED',
        severity: 'HIGH',
        apparatusMetadata: { name: apparatusName, version: '3.0.0', fileLocation },
        runtimeSnapshot: { 
          inputPayload: properties, 
          correlationIdentifier: properties.correlationIdentifier, 
          validationIssues: result.error.issues 
        },
        forensicTrace: { 
          timestamp: new Date().toISOString(), 
          stack: 'SHELL_IGNITION_FAILURE' 
        }
      });
    }
    return result.data;
  }, [properties]);

  // 2. RESOLUÇÃO SEMÂNTICA
  const translate = useCallback((key: string, variables = {}) => {
    return SovereignTranslationEngine.translate(
      data.dictionary as unknown as ISovereignDictionary,
      apparatusName,
      key,
      variables,
      data.correlationIdentifier
    );
  }, [data.dictionary, data.correlationIdentifier]);

  // 3. TELEMETRIA DE IGNIÇÃO (CURA TS2353: correlationIdentifier unificado)
  useEffect(() => {
    SovereignLogger({
      severity: 'INFO',
      apparatus: apparatusName,
      operation: 'SHELL_IGNITION_SUCCESS',
      message: `Cidadão [${data.activeCitizen.citizenName}] ancorado na zona comunitária.`,
      correlationIdentifier: data.correlationIdentifier // Sincronia Protocolo V6.0
    });
  }, [data.activeCitizen.citizenName, data.correlationIdentifier]);

  // 4. SELAGEM DE ADN PARA O FILHO (Cura TS2741)
  const citizenAuraProperties = useMemo(() => {
    return CitizenAuraCardSchema.parse({
      ...data.activeCitizen,
      dictionary: data.dictionary,
      correlationIdentifier: data.correlationIdentifier,
    });
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-1000 font-sans">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* 🧱 BARRA LATERAL DE AUTORIDADE */}
        <aside className="lg:col-span-4">
          <section className="sticky top-32 flex flex-col gap-10">
            <header className="flex items-center gap-4 border-b border-neutral-100 dark:border-white/5 pb-4">
                <Users size={24} className="text-brand-action" />
                <h2 className="font-serif font-black text-sm uppercase tracking-[0.3em] text-neutral-400">
                    {translate('citizenAuthorityTitle')}
                </h2>
            </header>

            <CitizenAuraCard {...citizenAuraProperties} />

            <ImpactMetricCard 
              reputationScore={data.activeCitizen.reputationStandingScore}
              metricLabel={translate('impactMetricLabel')}
              statusMessage={translate('sovereignStatusMessage')}
            />
          </section>
        </aside>

        {/* 🏛️ ÁREA DE CONTEÚDO SOBERANO */}
        <main className="lg:col-span-8 flex flex-col gap-12">
          <header className="border-l-4 border-brand-action pl-8">
             <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-brand-primary dark:text-white leading-tight">
                {translate('communityFeedTitle')}
             </h1>
          </header>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {data.children}
          </motion.section>
        </main>

      </div>
    </div>
  );
};

export const SovereignCommunityShell = memo(SovereignCommunityShellComponent);